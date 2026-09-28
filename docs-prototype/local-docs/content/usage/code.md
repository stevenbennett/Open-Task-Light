# Code

To edit the lamp's code, connect a USB-C cable from the control board's QT Py to your computer. You can do this with the lamp plugged in or even with the lamp disassembled.

The QT Py will appear on your computer as a mounted disk called `CIRCUITPY`. Within this disk you'll find:

* **boot\_out.txt** - basic board information printout
* **code.py** - the main lamp firmware. This is what you'll want to edit.
* **lib** - a library of utilities that allow the QT Py to communicate with sensors and perform special functions
* **sd** - safe to ignore
* **settings.toml** - configuration and secrets file

### Editing code.py

You'll likely want to update the lamp functionality by editing [code.py](https://github.com/stevenbennett/Open-Task-Light/blob/main/Open%20Task%20Light/QT%20Py%20Setup/QT%20Py/code.py). There are a few ways to do this:

#### Mu Editor

The easiest way to get started is to follow [Adafruit's guide for editing CircuitPython.](https://learn.adafruit.com/welcome-to-circuitpython/creating-and-editing-code)

#### Visual Studio Code

It's also possible to configure Visual Studio Code to live-edit `code.py` and view serial output from the board. To do this, I use the [CircuitPython extension](https://marketplace.visualstudio.com/items?itemName=joedevivo.vscode-circuitpython\&ssr=false#version-history) for Visual Studio Code. **This extension isn't actively maintained and only works for me if I use version 0.1.20.** Others have reported success using the extension [CircuitPython v2](https://marketplace.visualstudio.com/items?itemName=wmerkens.vscode-circuitpython-v2).

\[more detailed guide and tips coming soon]
