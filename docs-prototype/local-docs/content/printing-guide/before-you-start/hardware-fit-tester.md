# Hardware Fit Tester

{% hint style="info" icon="cube" %}
**Latest version:** `hardware-fit-tester_v1.0`

<a href="https://github.com/stevenbennett/Open-Task-Light/blob/main/Open%20Task%20Light/Printed%20Parts/STL/Tools/hardware-fit-tester_v1.0.stl" class="button primary" data-icon="github">View on GitHub</a>
{% endhint %}

<figure>
<img src="/images/ade7c5dfe9f3.png" alt="CAD render of the hardware fit tester showing its two square nut pockets and the round M5 counterbore">
<ol class="callouts">
<li dot="39,36" label="22,18" qty="1" match="M2 square nuts" link="Hardware (BOM): self-sourcing-guide/bill-of-materials">M2 square nut <note>Goes in the smaller square pocket. Checks the M2 nut fit used in the housing, carriage and counterweight.</note></li>
<li dot="45,44" label="60,15" qty="1" match="M3 square nuts" link="Hardware (BOM): self-sourcing-guide/bill-of-materials">M3 square nut <note>Goes in the larger square pocket. Checks the M3 nut fit used in the counterweight enclosure.</note></li>
<li dot="53,51" label="78,60" qty="1" match="M5 screws" link="Hardware (BOM): self-sourcing-guide/bill-of-materials">M5 screw <note>Drops through the round hole, with its head seating in the counterbore. It should pass through without resistance.</note></li>
</ol>
</figure>
Print this part before starting the full set of Open Task Light parts. It checks the printed fits for:

* M2 square nuts
* M3 square nuts
* M5 screws and their counterbores

## Print and check the tester

1. Print one tester using the filament and settings planned for the majority of the parts.
2. Insert the corresponding hardware into each feature and confirm that it fits as expected without forcing it.
3. If the fit is too tight, verify that the hardware is the correct size, follow [Correcting Filament Flow](/open-task-light/printing-guide/before-you-start/filament-flow-calibration.md), and print the tester again.
4. Continue with the main parts only after the tester passes.

Print a second tester using your selected carriage material and [Carriage Body](/open-task-light/printing-guide/carriage/carriage-body.md) print settings. The carriage uses dimensionally critical hardware fits and may use a different filament and print profile.

## Print settings

Use the standard settings from the [Printing Guide](/open-task-light/printing-guide.md), or the Carriage Body settings when testing the carriage material.

### Orientation

Place the flat face on the build plate with the hardware holes facing up.

<figure><img src="/images/5c7f054d47f0.png" alt=""></figure>

### Supports

None

### Hardware testing

Inserted hardware should sit flush with or below the top print surface as shown. All hardware should drop into place without resistance. If parts have to be forced into place, the printer or filament is probably over-extruding.

<figure>
<img src="/images/0a1b58fdde03.jpg" alt="The printed fit tester held in a hand with an M2 nut, an M3 nut and an M5 screw inserted, all sitting flush with the top surface">
<ol class="callouts">
<li dot="46,51" label="74,68">Top print surface <note>The nuts and the screw head sit flush with or below this face. If anything stands proud the printer is probably over-extruding.</note></li>
</ol>
</figure>
### Confirm thickness

This part is the same thickness as the carriage. Measure the version printed in the carriage material using calipers and ensure the thickness is between 7.75 mm and 7.95 mm. If it's thicker than 7.95 mm, perform an extrusion calibration and try again. You can also try reducing the filament flow manually until the dimensions are within range.

<figure><img src="/images/0a3b08aa82fa.jpg" alt=""></figure>
