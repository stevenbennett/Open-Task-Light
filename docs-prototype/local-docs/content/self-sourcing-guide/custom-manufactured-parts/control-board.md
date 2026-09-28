# Control Board

{% hint style="warning" icon="hammer" %}
Page in progress
{% endhint %}

The Control Board is the main electronics PCB for the Open Task Light.

<a href="https://github.com/stevenbennett/Open-Task-Light/tree/main/Open%20Task%20Light/Electronics/Control%20Board" class="button primary" data-icon="github">View PCB files on GitHub</a>

<figure>
<img src="/images/01c789cd0fbc.png" alt="CAD render of the control board, a long arm with a round head carrying the QT Py, DC-DC converter and connectors">
<ol class="callouts">
<li dot="68,30" label="42,12" qty="1" match="Adafruit QT Py ESP32-S2" link="Prepare the QT Py: self-sourcing-guide/manual-part-preparation/adafruit-qt-py-esp32-s2; Bill of materials: self-sourcing-guide/bill-of-materials">QT Py ESP32-S2 <note>Shown fitted. Not part of the PCB assembly order; slot the prepared QT Py into the headers afterwards.</note></li>
</ol>
</figure>
{% hint style="info" %}
**Required quantity:** 1

The Control Board manufacturing files and BOM do not include the Adafruit QT Py ESP32-S2. [Prepare the QT Py separately](/open-task-light/self-sourcing-guide/manual-part-preparation/adafruit-qt-py-esp32-s2.md); it slots into the two headers after the Control Board is assembled.
{% endhint %}

## Parts and files

The GitHub folder includes the Gerber ZIP for ordering the bare PCB, Fusion Electronics source files, a component BOM, and separate front- and back-side placement exports.

If using a PCB assembly service, convert the BOM and placement exports to the manufacturer's required formats. Confirm the board outline, holes, component positions, board sides, rotations, and component polarity in the manufacturer's preview before ordering.

## Assembly

This PCB can be assembled by hand or the manufacturer. I recommend having it professionally assembled and the files to do that are available on GitHub. If you decide to do it manually you'll need a soldering hot plate and some patience.

The Adafruit QT Py ESP32-S2 is installed later and should not be included in the PCB assembly order. Once the assembled Control Board is ready, slot the prepared QT Py into the headers.

## Post-processing

When you receive the board from the manufacturer you'll need to trim the through-hole posts on the bottom of the board. Use [flush cut trimmers intended for use with metal](https://amzn.to/4rcOUcn) to do this. They don't need to be totally flush with the board surface, the goal is to remove the legs so there's just a small mound of solder.
