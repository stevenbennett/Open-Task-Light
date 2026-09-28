# Adafruit QT Py ESP32 S2

Before installation, the QT Py needs to be programmed and its headers prepared.

{% hint style="warning" icon="hammer" %}
Page in progress
{% endhint %}

1. [Update the bootloader and install CircuitPython](https://learn.adafruit.com/adafruit-qt-py-esp32-s2/circuitpython).
2. Copy [code.py](https://github.com/stevenbennett/Open-Task-Light/blob/main/Open%20Task%20Light/QT%20Py%20Setup/QT%20Py/code.py) to the `CIRCUITPY` directory.
3. Copy the [lib folder](https://github.com/stevenbennett/Open-Task-Light/tree/main/Open%20Task%20Light/QT%20Py%20Setup/QT%20Py/lib) to the `CIRCUITPY` directory.
4. Solder the headers.
5. Remove the plastic header insulator. I use a 0.330-inch shim and slide it between the insulator and the board, then carefully pry the insulator off. Try to use a thin, dull piece of metal because a sharp tool could damage the board or your body.
6. The headers need to be trimmed so the board sits lower in the control board headers. You can use this 3D printable guide to get the perfect header height.

{% hint style="info" icon="cube" %}
**3D-printed tool:** QT Py Header Trimmer

<a href="https://github.com/stevenbennett/Open-Task-Light/blob/main/Open%20Task%20Light/Printed%20Parts/STL/_Self-sourcing%20Tools/QT%20Py%20Header%20Trimmer.stl" class="button primary" data-icon="github">View STL on GitHub</a>
{% endhint %}

6. Put on safety glasses, then use the QT Py Header Trimmer as a guide to trim the pins to approximately 4.6 mm. The clipped metal ends can fly unexpectedly.
