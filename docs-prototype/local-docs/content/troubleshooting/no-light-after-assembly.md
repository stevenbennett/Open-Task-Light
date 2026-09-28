# No light after assembly

Start with a [clean power cycle](/open-task-light/troubleshooting.md#start-with-a-clean-power-cycle).

If the LED flashes normally but doesn't respond to the power button, [ask for help](/open-task-light/troubleshooting.md#still-need-help) and mention that it flashes. The LED is able to light up, so its polarity is unlikely to be the problem.

If the LED doesn't light up at all, [check carriage tightness](/open-task-light/usage/maintenance.md#check-carriage-tightness) next. If that doesn't help, grab a **digital multimeter** and follow the checks below to trace power from the base to the LED.

{% hint style="danger" %}
Disconnect power immediately if you notice excessive heat, a burning smell, smoke, sparks, or damaged wiring. Don't reconnect it until the cause has been identified and corrected.
{% endhint %}

{% stepper %}
{% step %}

## Set up the multimeter

Leave any USB cable disconnected from its power source throughout these checks so it can't power the QT Py separately. The cable can stay plugged into the QT Py.

* Put the black lead in **COM** and the red lead in the **voltage input**, usually labeled **V** or **VΩ**.
* Select **DC voltage** (V with a solid line over a dashed line). If your meter doesn't autorange, choose a range above 24 V.
* For each power-track measurement, place one probe on each of the two exposed conductive strips on the PCB. Measure across the strips, not between a strip and the aluminum rail.
* You're looking for **about 24 V DC**. A reading around **−24 V** also shows power is present; swapping the probes will make the reading positive. This check doesn't establish whether the LED is wired with the correct polarity.

{% hint style="warning" %}
The lamp needs to be powered for voltage measurements. Keep each probe tip on its own strip, and don't let a tip bridge both strips or slip onto the surrounding metal. **Do not use current, resistance, or continuity mode for these powered checks.**

Unplug the barrel connector before adjusting wheels, reseating cables, or opening the LED holder. Reconnect it only when you're ready to measure or test again.
{% endhint %}

If you're new to using a meter, [this guide to measuring DC voltage](https://www.fluke.com/en-us/learn/blog/digital-multimeters/how-to-measure-dc-voltage-with-a-digital-multimeter) explains the basic setup.
{% endstep %}

{% step %}

## Check the vertical power track

Start near the **bottom of the vertical power track**, above its cable connector. Place the probes on the two exposed strips and read the voltage.

**If you get about 24 V:** Check again farther up the same track, just below the carriage. Both locations should give about the same reading. If they do, move on to the horizontal track.

**If you don't get about 24 V at the bottom:** Check the meter setting and make sure both probes are touching the conductive strips. Then unplug the lamp and check that the power supply's barrel plug and the cable at the bottom of the vertical track are fully inserted. See the connection photos for your [freestanding base](/open-task-light/assembly-guide/base-assembly/freestanding-base/installing-the-power-track-freestanding-base.md#secure-the-power-track) or [clamping base](/open-task-light/assembly-guide/base-assembly/clamping-base/installing-the-power-track-clamping-base.md#secure-and-connect-the-power-track). Reconnect power and measure again.

If there's power at the bottom but not near the carriage, recheck your probe contact. If the difference persists, stop here and [ask for help](/open-task-light/troubleshooting.md#still-need-help) with both readings. Adjusting the carriage won't fix missing voltage on the vertical track itself.

If there's still no power at the bottom, [ask for help](/open-task-light/troubleshooting.md#still-need-help) before continuing. Don't open the power supply.
{% endstep %}

{% step %}

## Check the horizontal power track

Measure across the two exposed strips on the **horizontal power track**, in an accessible spot beside the carriage. Keep the probes clear of the carriage pins.

**Vertical track has about 24 V, but the horizontal track doesn't:** Power isn't getting through the carriage reliably. Usually the spring-loaded pins aren't making good contact with one of the tracks because the wheels are too loose.

Unplug the lamp and follow [Check carriage tightness](/open-task-light/usage/maintenance.md#check-carriage-tightness). Check the fit against **both rails**, then reconnect power and measure the horizontal track again. If both rails move smoothly without play but you still don't get about 24 V, [ask for help](/open-task-light/troubleshooting.md#still-need-help) rather than continuing to tighten the wheels.

**Horizontal track has about 24 V:** Power is getting across the carriage at this position. Next, check the QT Py.
{% endstep %}

{% step %}

## Check the QT Py light

The QT Py is the small controller plugged into the Control Board inside the electronics housing. With the supplied firmware, its light should be **solid green**.

Unplug the lamp and carefully remove the shade, keeping clear of the LED cable. See [Attach the shade](/open-task-light/assembly-guide/horizontal-rail-assembly/assembling-the-electronics-housing.md#attach-the-shade) for how it fits. Removing it should let you see the QT Py light.

Reconnect power and look inside without touching the board or wiring. You may need to dim the room to see it clearly. Make sure you have a clear view before deciding the light is off.

**Solid green, but the main LED doesn't light up:** The QT Py is receiving power and has started running its code. The LED holder and wiring are the next things to check. Green doesn't rule out every controller issue, but the checks below catch the common assembly problems.

**No green light, even though the horizontal track has about 24 V:** Unplug the lamp and check the power cable between the horizontal track and Control Board. Make sure both ends are fully seated; the connectors are fragile, so don't pull on the wires or force them. Compare with the [Control Board connection](/open-task-light/assembly-guide/horizontal-rail-assembly/assembling-the-electronics-housing.md#insert-the-control-board) and [horizontal track connection](/open-task-light/assembly-guide/horizontal-rail-assembly/installing-the-power-track.md#connect-the-power-track-to-the-electronics-housing) photos.

Reconnect power and check again. If the QT Py still doesn't show solid green, there may be a Control Board, controller, or firmware issue. [Ask for help](/open-task-light/troubleshooting.md#still-need-help) with the rail readings and what the QT Py light does. This guide doesn't cover board-level diagnosis yet.
{% endstep %}

{% step %}

## Check the LED holder and wiring

**Unplug the lamp before touching the LED connections.** Let the LED assembly cool if it's been on.

1. **Check the LED cable at the Control Board.** Make sure its plug is fully inserted. See [Connect the LED to the control board](/open-task-light/assembly-guide/horizontal-rail-assembly/assembling-the-electronics-housing.md#connect-the-led-to-the-control-board).
2. **Check the wires at the LED holder.** Both wires need to be fully captured by their terminals. Give each wire a gentle tug; it shouldn't pull out. If one is loose, follow [Preparing the LED holder](/open-task-light/assembly-guide/horizontal-rail-assembly/preparing-the-led-holder.md#insert-wires-into-the-led-holder) to insert it correctly.
3. **Check the wire polarity.** The wire marked red goes into **C+**. The unmarked wire goes into **C−**. Compare with the photos in the LED holder guide rather than guessing from the cable's position.
4. **Check the LED's orientation.** The holder's **C+** contact must line up with the LED's **positive pad**, and **C−** with its **negative pad**. Correct wire placement won't help if the LED itself is rotated the wrong way. Use the [LED installation photos](/open-task-light/assembly-guide/horizontal-rail-assembly/installing-the-led.md#prepare-the-led) and [holder alignment instructions](/open-task-light/assembly-guide/horizontal-rail-assembly/installing-the-led.md#attach-the-led-holder) to check it.

If you need to reposition the LED, follow the installation guide to reassemble the holder and cooling parts before powering it again. If you need to remove the horizontal arm, **disengage the belt from the pulley first**, as shown in [Final Assembly](/open-task-light/assembly-guide/final-assembly.md#assemble-the-counterweight-pulley), to protect the carriage pins.

Once everything is reassembled, reconnect power and repeat [Power-On & Test](/open-task-light/assembly-guide/power-on-and-test.md). If it still doesn't turn on, [ask for help](/open-task-light/troubleshooting.md#still-need-help) and include a clear photo of the LED wiring and orientation.
{% endstep %}
{% endstepper %}
