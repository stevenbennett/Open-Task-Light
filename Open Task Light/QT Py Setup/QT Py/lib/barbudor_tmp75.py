# The MIT License (MIT)
#
# Copyright (c) 2019 Barbudor (Jean-Michel Mercier)
#
# Permission is hereby granted, free of charge, to any person obtaining a copy
# of this software and associated documentation files (the "Software"), to deal
# in the Software without restriction, including without limitation the rights
# to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
# copies of the Software, and to permit persons to whom the Software is
# furnished to do so, subject to the following conditions:
#
# The above copyright notice and this permission notice shall be included in
# all copies or substantial portions of the Software.
#
# THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
# IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
# FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
# AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
# LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
# OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
# THE SOFTWARE.
"""
`barbudor_tmp75`
====================================================

CircuitPython driver for the Texas Instruments TMP75 I2C temperature sensor.

* Author : Barbudor (Jean-Michel Mercier)

Implementation Notes
--------------------

Memory usage (tested with CircuitPython 4.0.0beta7 on CircuitPlayground Express):

* from barbudor_tmp75 import TMP75            --> 3184 bytes
* tmp75 = TMP75(i2c_bus)                      -->   96 bytes

**Hardware:**

* Device: `TMP75 <http://www.ti.com/product/TMP75>`_ Temperature Sensor with I2C SMBus Interface
  in Industry Standard LM75 Form Factor & Pinout

* Available breakouts: none known

**Software and Dependencies:**

* Adafruit CircuitPython firmware (3.1+):  https://github.com/adafruit/circuitpython/releases
* Adafruit's Bus Device library: https://github.com/adafruit/Adafruit_CircuitPython_BusDevice
"""

# imports
from micropython import const
from adafruit_bus_device.i2c_device import I2CDevice

__version__ = "0.0.0-auto.0"
__repo__ = "https://github.com/barbudor/Barbudor_CircuitPython_TMP75.git"


# pylint: disable=bad-whitespace,invalid-name

_DEFAULT_ADDRESS                = const(0x48)

#
# Registers and bits definitions
#

# Temperature register
_REG_TEMP                      = const(0x00)

# Configuration register
_REG_CONFIG                    = const(0x01)

_CONFIG_SHUTDOWN               = const(0x01)       # set to '1' to enable low power mode
_CONFIG_INTERRUPT_MODE         = const(0x02)       # '0' comparator mode, '1' Interrupt mode
_CONFIG_ALARM_POLARITY         = const(0x04)       # '0' alarm pin active low, '1' active high

_CONFIG_FAULT_QUEUE_MASK       = const(0x18)
_CONFIG_FAULT_QUEUE_1          = const(0x00)
_CONFIG_FAULT_QUEUE_2          = const(0x08)
_CONFIG_FAULT_QUEUE_4          = const(0x10)
_CONFIG_FAULT_QUEUE_6          = const(0x18)

_CONFIG_CONVERTER_RES_MASK     = const(0x60)
_CONFIG_CONVERTER_9BITS        = const(0x00)       #  9 bits,  28 ms conversion time
_CONFIG_CONVERTER_10BITS       = const(0x20)       # 10 bits,  55 ms conversion time
_CONFIG_CONVERTER_11BITS       = const(0x40)       # 11 bits, 110 ms conversion time
_CONFIG_CONVERTER_12BITS       = const(0x60)       # 12 bits, 220 ms conversion time

_CONFIG_ONE_SHOT               = const(0x80)       # '1' to trigger a conversion (device in SD)

# Temperature min/max registers
_REG_LOW_TEMP_ALARM            = const(0x02)
_REG_HIGH_TEMP_ALARM           = const(0x03)


class TMP75:
    """Driver class for Texas Instruments TMP75 temperature sensor"""

    @staticmethod
    def _reg_to_temp(regval):
        if regval > 32767:
            regval -= 65536
        return regval / 256.0

    @staticmethod
    def _temp_to_reg(temp):
        temp = round(temp * 256.0)
        if temp < 0:
            temp += 65536
        return temp

    def _write16(self, reg, value):
        seq = bytearray([reg, (value >> 8) & 0xFF, value & 0xFF])
        with self.i2c_device as i2c:
            i2c.write(seq)

    def _read16(self, reg):
        buf = bytearray(3)
        buf[0] = reg
        with self.i2c_device as i2c:
            i2c.write(buf, end=1)
            i2c.readinto(buf, start=1)
        value = (buf[1] << 8) | (buf[2])
        return value

    def _write8(self, reg, value):
        seq = bytearray([reg, value & 0xFF])
        with self.i2c_device as i2c:
            i2c.write(seq)

    def _read8(self, reg):
        buf = bytearray(2)
        buf[0] = reg
        with self.i2c_device as i2c:
            i2c.write(buf, end=1)
            i2c.readinto(buf, start=1)
        value = buf[2]
        return value

    def __init__(self, i2c_bus, i2c_addr = _DEFAULT_ADDRESS):
        self.i2c_device = I2CDevice(i2c_bus, i2c_addr)
        self.i2c_addr = i2c_addr

        self.config = _CONFIG_CONVERTER_12BITS

    @property
    def config(self):
        """Read/Write the configuration register"""
        return self._read8(_REG_CONFIG)

    @config.setter
    def config(self,regval):
        self._write8(_REG_CONFIG,regval)

    @property
    def temperature_in_C(self):
        """Return's the temperature in C"""
        return self._reg_to_temp(self._read16(_REG_TEMP))


    @property
    def temperature_in_F(self):
        """Return's the temperature in F"""
        return self.temperature_in_C*1.8+32

    @property
    def alarm_low_threshold(self):
        """Read/write the alarm low temperature threshold (in C)"""
        return self._reg_to_temp(self._read16(_REG_LOW_TEMP_ALARM))

    @alarm_low_threshold.setter
    def alarm_low_threshold(self,temp):
        self._write16(_REG_LOW_TEMP_ALARM, self._temp_to_reg(temp))

    @property
    def alarm_high_threshold(self):
        """Read/write the alarm high temperature threshold (in C)"""
        return self._reg_to_temp(self._read16(_REG_HIGH_TEMP_ALARM))

    @alarm_low_threshold.setter
    def alarm_low_threshold(self,temp):
        self._write16(_REG_HIGH_TEMP_ALARM, self._temp_to_reg(temp))
