# Electronics Housing

{% hint style="info" icon="cube" %}
**Latest version:** `electronics-housing_v1.2`

<a href="https://github.com/stevenbennett/Open-Task-Light/blob/main/Open%20Task%20Light/Printed%20Parts/STL/Electronics%20Housing/electronics-housing_v1.2.stl" class="button primary" data-icon="github">View on GitHub</a>
{% endhint %}

<figure><img src="/images/d963b69779ad.png" alt=""></figure>

<details>

<summary>Use default print settings</summary>

<table><thead><tr><th width="244.703125">Preset</th><th width="99.99609375">Infill</th><th>Shells</th></tr></thead><tbody><tr><td><code class="expression">space.vars.layer_height_prusa</code><br><code class="expression">space.vars.layer_height_bambu</code></td><td><code class="expression">space.vars.infill</code></td><td><code class="expression">space.vars.shells</code></td></tr></tbody></table>

</details>

{% hint style="warning" %}
Requires pause for [hardware insertion](#hardware-insertion)
{% endhint %}

{% hint style="info" %}
**Use a smooth PEI sheet when printing this part in PLA**. Take some time to get a perfect first layer. Warping may cause fitment issues.
{% endhint %}

### Orientation

Top (button side) on build plate.

Orient the model so that the round end is facing the rear of your printer for easier hardware insertion (you'll be [inserting a nut](#hardware-insertion) on the opposite end).

<figure>
<img src="/images/78bafbe9c816.png" alt="Slicer view of the electronics housing upside down on the build plate with its round end toward the rear of the printer">
<ol class="callouts">
<li dot="35,18" label="62,10" match="round end">Round end (toward the rear of the printer) <note>The LED opening end. Point it at the back of the printer so the nut pocket is easy to reach at the front.</note></li>
<li dot="68,77" label="82,90" match="opposite end" link="Hardware insertion: printing-guide/electronics-housing/electronics-housing">Nut end (faces printer front) <note>This flat end faces the front of the printer. The pause for the M2 square nut happens here around layer 22.</note></li>
</ol>
</figure>
### Supports

{% tabs %}
{% tab title="PrusaSlicer" %}


Set supports to `For support enforcers only`

<figure><img src="/images/c7b74e095438.png" alt=""></figure>

**Print Settings > Support Material > Options for support material and raft:**

Style: `Snug`

[XY separation between an object and its support: `.8 mm`](#user-content-fn-1)[^1]

<figure>
<img src="/images/893cf81cd12e.png" alt="PrusaSlicer support options panel with Style set to Snug and XY separation set to 0.8 mm">
<ol class="callouts">
<li dot="75,9" label="88,30" match="Snug">Style: Snug <note>Snug supports follow the part closely and are easier to remove from the cable channel.</note></li>
<li dot="63,82" label="88,66" match=".8 mm">XY separation: 0.8 mm <note>Wider than the default so the supports peel out of the channel cleanly.</note></li>
</ol>
</figure>
{% endtab %}

{% tab title="BambuStudio" %}


**Support Type:** `Normal(Auto)`

**Style:** `Snug`

**On build plate only:** `Enabled`

<figure><img src="/images/2d47b566a419.png" alt=""></figure>

**Advanced:**

Interface pattern: `Rectilinear`

[Support/object XY distance: `.8 mm`](#user-content-fn-1)[^1]

<figure>
<img src="/images/7be88a8780bb.png" alt="BambuStudio advanced support panel with Interface pattern set to Rectilinear and Support/object xy distance set to 0.8 mm">
<ol class="callouts">
<li dot="59,58" label="80,48" match="Rectilinear">Interface pattern: Rectilinear <note>A rectilinear interface releases from the channel more cleanly than the default.</note></li>
<li dot="50,73" label="80,82" match=".8 mm">Support/object xy distance: 0.8 mm <note>Wider than the default so the supports peel out of the channel cleanly.</note></li>
</ol>
</figure>
{% endtab %}
{% endtabs %}

### Support Placement

Paint support enforces on the overhanging faces in the power track cable channel at the rear of the enclosure. You don't need supports in the enclosed cavity, just the overhanging portion shown below.

<figure>
<img src="/images/cfb60d48d034.png" alt="CAD view of the rear of the electronics housing showing the overhanging face inside the power track cable channel highlighted in blue">
<ol class="callouts">
<li dot="72,42" label="72,10" match="overhanging faces">Overhanging face (paint enforcer here) <note>Blue face. This is the only surface in the channel that needs support.</note></li>
<li dot="56,49" label="84,70">Power track cable channel <note>The slot the power track cable runs through at the rear of the enclosure.</note></li>
<li dot="55,76" label="76,90" match="enclosed cavity">Enclosed cavity (no supports needed) <note>The dark interior. Leave it unsupported; the slicer's automatic supports would be hard to remove from here.</note></li>
</ol>
</figure>
<figure><img src="/images/0defe08fae51.png" alt=""></figure>

There are two small lips at the front of the enclosure for retaining the control board. Add a support enforcer to the bottom face of each of these (two faces total).

<figure>
<img src="/images/0ba67b22044c.png" alt="CAD view looking into the front of the electronics housing with the two small control board retaining lips highlighted in blue">
<ol class="callouts">
<li dot="28,58" label="25,80" qty="2" match="two small lips">Control board lip <note>Blue faces. Add a support enforcer to the bottom face of this lip and of the matching one on the opposite side of the opening.</note></li>
</ol>
</figure>
<figure><img src="/images/d38267442e4e.png" alt=""></figure>

### Hardware Insertion

Add a pause around layer 22 to insert one M2 square nut.

<figure>
<img src="/images/f985d896f838.png" alt="Slicer layer preview of the electronics housing around layer 22 with the M2 square nut pocket circled">
<ol class="callouts">
<li dot="58,58" label="40,82" qty="1" link="Hardware (BOM): self-sourcing-guide/bill-of-materials">M2 square nut <note>Drop the nut into this pocket during the pause. The next layers cap it off.</note></li>
</ol>
</figure>
[^1]: This setting makes the supports easier to remove.
