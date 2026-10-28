"""Desktop tests for the OTL CircuitPython firmware (QT Py/code.py).

The CircuitPython hardware modules are replaced with small fakes and the real
code.py is executed without its final run() call, so each test can drive the
lamp's functions directly and inspect what was written to the DAC.

Run from the repository root with:  python -m pytest "Open Task Light/QT Py Setup/tests"
"""
import pathlib
import sys
import types

CODE = pathlib.Path(__file__).resolve().parent.parent / 'QT Py' / 'code.py'

FAIL = {}


class Clock:
    def __init__(self):
        self.t = 1000.0

    def monotonic(self):
        return self.t

    def sleep(self, seconds):
        self.t += seconds

    def advance(self, seconds):
        self.t += seconds


class DigitalInOut:
    def __init__(self, pin):
        self.direction = None
        self.value = False


class AnalogOut:
    def __init__(self, pin):
        self.writes = []

    @property
    def value(self):
        return self.writes[-1] if self.writes else None

    @value.setter
    def value(self, v):
        self.writes.append(v)


class TouchIn:
    def __init__(self, pin):
        self.value = False
        self.threshold = None


class Debouncer:
    def __init__(self, fn):
        self.fn = fn
        self._prev = False
        self.rose = False

    def update(self):
        now = bool(self.fn())
        self.rose = now and not self._prev
        self._prev = now


class VEML7700:
    ALS_25MS = 0xC
    ALS_100MS = 0x0

    def __init__(self, i2c):
        if FAIL.get('veml_init'):
            raise ValueError('No I2C device at address: 0x10')
        # A non-default starting value, so the test can see whether code.py sets it
        self.light_integration_time = self.ALS_25MS
        self.lux_value = 100.0
        self.reads = 0

    @property
    def lux(self):
        self.reads += 1
        if FAIL.get('veml_read'):
            raise OSError(5, 'Input/output error')
        return self.lux_value


class TMP75:
    def __init__(self, i2c):
        self.value = 25.0
        self.fail_reads = 0

    @property
    def temperature_in_C(self):
        if self.fail_reads:
            self.fail_reads -= 1
            raise OSError(19, 'No such device')
        return self.value


def ns(**kw):
    return types.SimpleNamespace(**kw)


def load(**fail):
    """Execute code.py against fake hardware and return its globals."""
    FAIL.clear()
    FAIL.update(fail)
    clock = Clock()
    fake_time = types.ModuleType('time')
    fake_time.monotonic = clock.monotonic
    fake_time.sleep = clock.sleep
    fakes = {
        'time': fake_time,
        'board': ns(NEOPIXEL=0, RX=1, A1=2, SCL=3, SDA=4, A2=5, TX=6, A3=7),
        'busio': ns(I2C=lambda scl, sda: object()),
        'digitalio': ns(DigitalInOut=DigitalInOut, Direction=ns(OUTPUT='output')),
        'analogio': ns(AnalogIn=object, AnalogOut=AnalogOut),
        'touchio': ns(TouchIn=TouchIn),
        'adafruit_debouncer': ns(Debouncer=Debouncer),
        'adafruit_veml7700': ns(VEML7700=VEML7700),
        'barbudor_tmp75': ns(TMP75=TMP75),
        'neopixel': ns(NeoPixel=lambda pin, n, brightness: [None] * n),
        'microcontroller': ns(),
    }
    source = CODE.read_text()
    body, sep, _ = source.rpartition('\nrun()')
    assert sep, 'code.py no longer ends with run()'
    saved = {name: sys.modules.get(name) for name in fakes}
    sys.modules.update(fakes)
    try:
        g = {'__name__': 'otl_code'}
        exec(compile(body, str(CODE), 'exec'), g)  # noqa: S102 -- runs the real firmware against the fakes
    finally:
        for name, module in saved.items():
            if module is None:
                sys.modules.pop(name, None)
            else:
                sys.modules[name] = module
    g['_clock'] = clock
    return g


def touch(g, button):
    """Press and release a touch button, running its handler on each edge."""
    handler = {'power_button_raw': 'handle_power_button',
               'increase_button_raw': 'handle_increase_button',
               'decrease_button_raw': 'handle_decrease_button'}[button]
    g[button].value = True
    g[handler]()
    g[button].value = False
    g[handler]()


def turn_on(g):
    touch(g, 'power_button_raw')
    assert g['_power'] is True


# --- existing behaviour that must keep working ---

def test_power_button_turns_lamp_on_and_off():
    g = load()
    turn_on(g)
    assert g['dac_out'].value == g['user_brightness'].as_driver_output()
    touch(g, 'power_button_raw')
    assert g['_power'] is False
    assert g['dac_out'].value == g['DAC_OFF_VALUE']


def test_high_temperature_scales_power_down():
    g = load()
    turn_on(g)
    g['temp_sensor'].value = (g['HIGH_TEMP'] + g['MAX_TEMP']) / 2
    g['_clock'].advance(10)
    g['check_temperature']()
    assert 0 < g['POWER_OUTPUT_LIMIT'] < g['DEFAULT_POWER_OUTPUT']
    assert g['_power'] is True


# --- bug 1: the lamp can be switched back on while over MAX_TEMP ---

def test_lamp_stays_off_when_turned_on_above_max_temp():
    g = load()
    g['temp_sensor'].value = g['MAX_TEMP'] + 1
    before = len(g['dac_out'].writes)
    touch(g, 'power_button_raw')
    assert g['_power'] is False
    assert set(g['dac_out'].writes[before:]) <= {g['DAC_OFF_VALUE']}, 'LED was driven on while over MAX_TEMP'


# --- bug 2: a sensor read error crashes the firmware ---

def test_unreadable_temperature_sensor_turns_lamp_off_instead_of_crashing():
    g = load()
    turn_on(g)
    g['temp_sensor'].fail_reads = 10**6
    g['_clock'].advance(10)
    g['check_temperature']()
    assert g['_power'] is False
    assert g['dac_out'].value == g['DAC_OFF_VALUE']


def test_single_temperature_read_glitch_is_retried():
    g = load()
    turn_on(g)
    g['temp_sensor'].fail_reads = 1
    g['_clock'].advance(10)
    g['check_temperature']()
    assert g['_power'] is True


def test_lamp_refuses_to_turn_on_when_temperature_is_unreadable():
    g = load()
    g['temp_sensor'].fail_reads = 10**6
    touch(g, 'power_button_raw')
    assert g['_power'] is False


def test_missing_light_sensor_does_not_stop_the_lamp_from_starting():
    g = load(veml_init=True)
    turn_on(g)
    g['_clock'].advance(10)
    g['handle_auto_brightness']()


def test_light_sensor_read_error_is_skipped():
    g = load(veml_read=True)
    turn_on(g)
    g['_clock'].advance(10)
    g['handle_auto_brightness']()


# --- bug 3: brightness jumps instead of fading when the power limit changes ---

def test_power_limit_change_fades_from_the_current_level():
    g = load()
    turn_on(g)
    g['user_brightness'] = g['Brightness'](100)
    g['set_output_brightness'](g['user_brightness'])
    previous = g['dac_out'].value
    n = len(g['dac_out'].writes)

    g['temp_sensor'].value = (g['HIGH_TEMP'] + g['MAX_TEMP']) / 2
    g['_clock'].advance(10)
    g['check_temperature']()

    ramp = g['dac_out'].writes[n:]
    assert ramp[0] == previous, f'fade started at {ramp[0]}, LED was at {previous}'
    assert ramp[-1] == g['user_brightness'].as_driver_output()


# --- bug 4: auto brightness ignores its own 2 s rate limit ---

def test_auto_brightness_waits_between_adjustments():
    g = load()
    turn_on(g)
    g['light_sensor'].lux_value = g['LIGHT_SENSOR_MAX']
    start = g['user_brightness'].flat_percentage

    for _ in range(100):  # one second of 10 ms main-loop iterations
        g['handle_auto_brightness']()
        g['_clock'].advance(0.01)
    assert g['user_brightness'].flat_percentage == start, 'brightness changed within the 2 s settle time'

    g['_clock'].advance(2)
    g['handle_auto_brightness']()
    assert g['user_brightness'].flat_percentage == start + g['STEP']


# --- bug 5: the light sensor's integration time is never set ---

def test_light_sensor_integration_time_is_set_to_100ms():
    g = load()
    assert g['light_sensor'].light_integration_time == VEML7700.ALS_100MS
