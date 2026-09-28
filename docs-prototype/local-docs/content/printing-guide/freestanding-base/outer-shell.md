# Outer Shell

{% hint style="info" icon="cube" %}
**Latest version:** `freestanding-base-outer-shell_v1.1`

<a href="https://github.com/stevenbennett/Open-Task-Light/blob/main/Open%20Task%20Light/Printed%20Parts/STL/Freestanding%20Base/freestanding-base-outer-shell_v1.1.stl" class="button primary" data-icon="github">View on GitHub</a>
{% endhint %}

<figure><img src="/images/327eb2a8f9bb.png" alt=""></figure>

{% hint style="info" icon="gear" %}
**Settings Overrides:**

Start with the [default print settings](/open-task-light/printing-guide.md#default-print-settings), then apply the changes below.

**Infill:** 75% (we want this to be heavy so crank this up as much as you want)

**Shells:** 6 perimeters, 6 top layers, 6 bottom layers

**Thick bridges:** Off (usually off by default)

**Print bed:** Smooth PEI
{% endhint %}

### Orientation

Bottom (open side) on build plate

<figure>
<img src="/images/befe8226a5aa.png" alt="Slicer view of the outer shell on the build plate with its domed top facing up">
<ol class="callouts">
<li dot="45,63" label="45,88">Bottom (open side) <note>The open underside sits flat on the build plate. All of the support material grows up inside it.</note></li>
</ol>
</figure>
### Supports

{% hint style="info" icon="sparkle" %}
This would be a great time to flex your printer's [multi-material capabilities](https://help.prusa3d.com/article/combining-materials-xl_498103) for easier support removal or even dissolvable supports.
{% endhint %}

Set automatic support generation to `On build plate only` .

#### Paint Support Enforcers <a href="#paint-support-blockers" id="paint-support-blockers"></a>

Use the support brush in "fill" mode to paint support enforcers on the faces outlined below (six faces total).

{% stepper %}
{% step %}
Paint enforcers on the two interior rings

<figure><img src="/images/4755759a2c03.png" alt=""></figure>

<figure><img src="/images/f21c705667fb.png" alt=""></figure>
{% endstep %}

{% step %}
Paint two more enforcers on the recessed lip in the outer channels.

<figure><img src="/images/89a223247474.png" alt=""></figure>
{% endstep %}

{% step %}
Add two final enforcers on the bottom faces of these two cylinders.

<figure><img src="/images/8c5ff5af6cfa.png" alt=""></figure>
{% endstep %}

{% step %}
With all six faces painted (the two interior rings, the two channel lips and the two cylinders) your support enforcers should look like this:

<figure>
<img src="/images/e6cfc7f7c3ab.png" alt="Slicer view from below of the outer shell with all six support enforcer faces painted blue">
<ol class="callouts">
<li dot="30,50" label="52,46" qty="2 faces" match="interior rings">Interior ring <note>The two stepped rings around the centre bore, painted in step 1.</note></li>
<li dot="19,41" label="11,12" qty="2 faces" match="channel lips">Channel lip <note>The thin recessed ledge in each outer channel, one on the left and one on the right. Painted in step 2.</note></li>
<li dot="58,18" label="80,6" qty="2 faces" match="cylinders">Cylinder <note>The bottom face of each screw boss, one at the top and one at the bottom of this view. Painted in step 3.</note></li>
</ol>
</figure>
{% endstep %}
{% endstepper %}

With the support enforcers in place, set the support style to `Snug`.

<figure><img src="/images/9663e50ef8c5.png" alt=""></figure>

{% hint style="info" %}
**Notes:** Sorry about the excessive support material on this one. I know it's a long print but it's by far the toughest one so it's smooth sailing after this!
{% endhint %}

### Support Material Removal

There's quite a bit here but you should be able to remove it all cleanly in under \~5 minutes with these tips. **Flush cut trimmers are perfect for this job.**

Start by removing what you can with your fingers. You should be able to remove all of the material from the outer channel and the first centimeter or so from the interior.

<figure>
<img src="/images/8e676cd2a425.jpg" alt="Pulling support material out of the outer channel of a printed outer shell with flush cut trimmers">
<ol class="callouts">
<li dot="62,27" label="55,10">Outer channel <note>All of the support in this ring should come out by hand.</note></li>
<li dot="50,42" label="22,20">Interior <note>Only the first centimetre or so comes out by hand. The dense material below needs trimmers.</note></li>
</ol>
</figure>
Use flush cut trimmers or small pliers to pull out the dense support material inside.

<figure><img src="/images/db5f06f00bc1.jpg" alt=""></figure>

Once you get down to the thick interface layer, slip your flush cut trimmers between the support material and the part.

<figure><img src="/images/ad36682e1d0e.jpg" alt=""></figure>

Slide the trimmers along the surface to cleanly remove the interface layer.

<figure><img src="/images/932b809acee7.jpg" alt=""></figure>

Remove the interface layer from both interior surfaces, leaving just the small bits and strands.

<figure><img src="/images/9c7eca84cb00.jpg" alt=""></figure>

Lay the sharp end of your trimmers against the surface with the jaws slightly open, then slide them along to shave off the remaining filament.

Don't be afraid to scuff these hidden surfaces—smooth and ugly is better than pristine and rough!

<figure><img src="/images/d5d8b38119f7.jpg" alt=""></figure>

Shave off any remaining bumps.

<figure><img src="/images/b1b83bc4d8f1.jpg" alt=""></figure>

Clean up the outer channels the same way.

<figure><img src="/images/c88065241466.jpg" alt=""></figure>

Run your finger over both inner surfaces and the outer channels. Remove any remaining bumps so everything feels flat.
