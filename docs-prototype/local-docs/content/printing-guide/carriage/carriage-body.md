# Carriage Body

{% hint style="info" icon="cube" %}
**Latest version:** `carriage-body_v1.1`

<a href="https://github.com/stevenbennett/Open-Task-Light/blob/main/Open%20Task%20Light/Printed%20Parts/STL/Carriage/carriage-body_v1.1.stl" class="button primary" data-icon="github">View on GitHub</a>
{% endhint %}

<figure><img src="/images/2d45da816f65.png" alt=""></figure>

{% hint style="info" icon="gear" %}
**Settings Overrides:**

Start with the [default print settings](/open-task-light/printing-guide.md#default-print-settings), then apply the changes below.

**Material:** [PET-CF recommended. PC-CF, PLA, or PETG can also be used.](/open-task-light/printing-guide.md#recommended-materials)

**Infill:** [100%, Rectilinear](#user-content-fn-1)[^1]

**Shells:** 6 perimeters, 6 top layers, 6 bottom layers (I think mostly aesthetic if you're using 100% infill)
{% endhint %}

{% hint style="danger" %}
**PET-CF must be dry to print accurately.** It picks up moisture surprisingly quickly, and on this part that usually shows up as over-extrusion and a carriage that doesn't fit properly. **If your spool has been out of its sealed packaging for more than 48 hours, don't assume it's ready to print—even if it printed well before.**

You have three good options:

* Print with a new, freshly opened spool of PET-CF.
* Dry the filament according to the manufacturer's instructions, check it with the [Hardware Fit Tester](/open-task-light/printing-guide/before-you-start/hardware-fit-tester.md), and print directly from a dry box. If the fit is incorrect, [correct the filament flow](/open-task-light/printing-guide/before-you-start/filament-flow-calibration.md) and test it again. Make sure the spool turns freely so the extruder isn't fighting extra drag.
* [Get a PET-CF carriage from the Open Task Light shop](https://opentasklight.com/products/petcf-carriage) if you don't want to manage and calibrate the material yourself.

Once it's printed, measure the carriage before assembly. It should be between **7.75 mm and 7.95 mm thick**, and the M5 screws should fit easily through both the holes and the counterbores for the screw heads. If it doesn't pass those checks, don't force it—dry or replace the filament, recalibrate, and try again.
{% endhint %}

{% hint style="warning" %}
Requires pause for [hardware insertion](#hardware-insertion)
{% endhint %}

### Orientation

Position so the power link slot is facing up

<figure>
<img src="/images/bf1e053ff510.png" alt="Slicer view of the carriage body lying flat with the power link slot and the counterbored holes facing up">
<ol class="callouts">
<li dot="40,28" label="70,10" link="Power Link: self-sourcing-guide/custom-manufactured-parts/power-link">Power link slot <note>The recessed channel down the centre of this face. Keep it facing up so it prints without supports and stays dimensionally accurate.</note></li>
</ol>
</figure>
### Supports

Set automatic support generation to `On build plate only` .

<figure><img src="/images/506a1c6ad40f.png" alt=""></figure>

### Hardware Insertion

Add a pause around layer 17 (assuming .15 mm layer height) to insert three M2 square nuts.

<figure>
<img src="/images/fc3ddfa70ebb.png" alt="Slicer layer preview of the carriage body around layer 17 with the three M2 square nut pockets circled">
<ol class="callouts">
<li dot="34,25" label="20,10" qty="3" match="M2 square nuts" link="Hardware (BOM): self-sourcing-guide/bill-of-materials">M2 square nut <note>Drop a nut into each of the three circled pockets during the pause. The following layers cap them off.</note></li>
</ol>
</figure>
[^1]: This used to be 85% 3D honeycomb, but 100% is stiffer and prints about 50% faster.
