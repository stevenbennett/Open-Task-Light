# Counterweight Enclosure

Enclosure for the counterweight material.

Choose one of the two options for your counterweight enclosure. The default option is the `Steel` variant. The lead variant is an optional upgrade for those who want source lead weight material and achieve a slimmer counterweight.

{% hint style="info" icon="cube" %}
**Latest versions**

**Steel:** `counterweight-enclosure-steel_v1.1`

<a href="https://github.com/stevenbennett/Open-Task-Light/blob/main/Open%20Task%20Light/Printed%20Parts/STL/Counterweight/counterweight-enclosure-steel_v1.1.stl" class="button primary" data-icon="github">View on GitHub</a>

***

**Lead:** `counterweight-enclosure-lead_v1.0`

<a href="https://github.com/stevenbennett/Open-Task-Light/blob/main/Open%20Task%20Light/Printed%20Parts/STL/Counterweight/counterweight-enclosure-lead_v1.0.stl" class="button primary" data-icon="github">View on GitHub</a>
{% endhint %}

<figure><img src="/images/1d69fb7f4cbe.png" alt=""></figure>

{% hint style="warning" %}
Requires pause for [hardware insertion](#hardware-insertion)
{% endhint %}

{% hint style="info" icon="gear" %}
**Settings Overrides:**

Start with the [default print settings](/open-task-light/printing-guide.md#default-print-settings), then apply the changes below.

**Infill:** 75% 3D Honeycomb

**Shells:** 6 perimeters, 6 top layers, 6 bottom layers

**Thick Bridges:** Enabled

**Support style:** Snug or tree/organic
{% endhint %}

{% hint style="info" %}
**Notes:** Parts like this sometimes want to warp and lift up at the corners. To prevent this when printing with PLA use a smooth PEI sheet. I get best results when I bump up the default PLA bed temperature from 60 to 70.
{% endhint %}

{% hint style="danger" %}
Before adding weight material, squeeze and lightly twist the enclosure. The wall layers shouldn't separate. If they do, reprint it before filling.
{% endhint %}

### Orientation

Lay the long flat face on the print surface. You'll likely need to rotate 45° on the Z plane to fit on medium-sized beds such as the Prusa MK3/MK4.

Orient the model so that the belt clip slot is near the front of the printer for easier hardware insertion.

<figure>
<img src="/images/8c53d4224885.png" alt="Slicer view of the counterweight enclosure lying on its long flat face, rotated 45 degrees on the bed with the belt clip slot at the front">
<ol class="callouts">
<li dot="76,64" label="86,40" link="Belt clip: printing-guide/counterweight/counterweight-belt-clip">Belt clip slot <note>The ribbed slot at this end. Keep it toward the front of the printer so the nut pockets are easy to reach during the pauses.</note></li>
</ol>
</figure>
### Supports

Set support generation to `On build plate only`

Support style: `Grid(snug) or tree/organic`

Add custom support enforcers in the top opening as shown. Don't add an enforcer within the top slot.

<figure>
<img src="/images/94ccbb849225.png" alt="CAD view into the top opening of the counterweight enclosure with the faces that need support enforcers highlighted in blue">
<ol class="callouts">
<li dot="52,31" label="78,20" match="support enforcers">Support enforcer <note>Blue faces. Paint enforcers on all of these inside the top opening, including the strip down the side.</note></li>
<li dot="48,39" label="78,42" match="top slot">Top slot (no enforcer) <note>The plain grey band between the blue faces. Leave it unsupported.</note></li>
</ol>
</figure>
<figure><img src="/images/9dbd23b4bad9.png" alt=""></figure>

### Hardware Insertion

Pause for hardware insertion in three places (actual layer number is slicer dependent). Insert the pause on the layer before the slots are capped off. If these layer numbers are way off, double check that `Thick bridges` is enabled.

{% stepper %}
{% step %}

#### One M2 square nut around layer 53 (approximate)

<figure>
<img src="/images/66b40502e3f2.png" alt="Slicer layer preview around layer 53 with the single M2 square nut pocket circled beside the green support in the end pocket">
<ol class="callouts">
<li dot="52,47" label="78,22" qty="1" link="Hardware (BOM): self-sourcing-guide/bill-of-materials">M2 square nut <note>Drop the nut into the circled pocket during the pause. Add the pause on the layer before the pocket is capped off.</note></li>
</ol>
</figure>
{% endstep %}

{% step %}

#### Two M3 square nuts around layer 218 (approximate)

<figure>
<img src="/images/436bcd31af95.png" alt="Slicer layer preview around layer 218 with the two M3 square nut pockets circled at either end of the enclosure">
<ol class="callouts">
<li dot="20,20" label="40,10" qty="2" match="M3 square nuts" link="Hardware (BOM): self-sourcing-guide/bill-of-materials">M3 square nut <note>One nut in each circled pocket, at either end of the enclosure. Drop both in during the pause.</note></li>
</ol>
</figure>
{% endstep %}

{% step %}

#### Two M2 square nuts around layer 236 (approximate)

<figure>
<img src="/images/15f97e886560.png" alt="Slicer layer preview around layer 236 with the two M2 square nut pockets circled beside the green support in the end pocket">
<ol class="callouts">
<li dot="44,32" label="28,8" qty="2" match="M2 square nuts" link="Hardware (BOM): self-sourcing-guide/bill-of-materials">M2 square nut <note>These two nuts take the belt clip screws. Drop one into each circled pocket during the pause.</note></li>
</ol>
</figure>
{% endstep %}
{% endstepper %}
