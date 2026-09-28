# Clamping Base Power Cable Assembly

This guide will walk you through assembly of the custom power cable used to connect the Open Task Light with a clamping base to the AC adapter.

{% hint style="danger" %}
**Never plug this cable directly into the control board.** Its connector polarity is reversed relative to the control board, and connecting it directly may damage the electronics.
{% endhint %}

### Gather the following

**Parts:**

* 1.5 mm diameter heat-shrink tubing (50 mm long)
* 3 mm diameter heat-shrink tubing (70 mm long)
* 4.8 mm (3/16") adhesive-lined heat-shrink tubing (44 mm (1.75") long)
* 1.75 mm TPU filament strand (40 mm long)
* Straight DC Power Jack
* 450 mm Micro-Lock cable

<figure>
<img src="/images/76ad43284844.jpg" alt="The six parts for the clamping base power cable laid out on a table: three pieces of heat-shrink tubing, a TPU strand, the DC power jack and the Micro-Lock cable">
<ol class="callouts">
<li dot="29,50" label="16,30" qty="50 mm" match="1.5 mm diameter heat-shrink tubing" link="BOM: self-sourcing-guide/bill-of-materials/bom-clamping">1.5 mm heat-shrink tubing <note>Thinnest piece. Goes over the two wires first, after the barrel-jack housing.</note></li>
<li dot="32,53" label="26,76" qty="70 mm" match="3 mm diameter heat-shrink tubing" link="BOM: self-sourcing-guide/bill-of-materials/bom-clamping">3 mm heat-shrink tubing <note>Longer piece. Slides over the wires second and later covers the strain relief tabs.</note></li>
<li dot="38,49" label="34,22" qty="44 mm" match="4.8 mm (3/16&quot;) adhesive-lined heat-shrink tubing" link="BOM: self-sourcing-guide/bill-of-materials/bom-clamping">4.8 mm adhesive-lined heat-shrink tubing <note>Thickest, shortest piece. Used last, over the end of the barrel-jack housing.</note></li>
<li dot="46,49" label="50,76" qty="40 mm" match="1.75 mm TPU filament strand">TPU strand <note>Ordinary 1.75 mm TPU printer filament. Crimped alongside the wires as a strain relief.</note></li>
<li dot="53,49" label="52,12" qty="1" link="BOM: self-sourcing-guide/bill-of-materials/bom-clamping">Straight DC Power Jack <note>Barrel plug with an unscrewable housing. The threaded housing comes off before soldering.</note></li>
<li dot="70,78" label="82,64" qty="1" match="450 mm Micro-Lock cable" link="BOM: self-sourcing-guide/bill-of-materials/bom-clamping">Microlock cable <note>The 450 mm cable. Gets cut in half. Each half becomes one 225 mm pigtail.</note></li>
</ol>
</figure>
**Tools:**

* Soldering iron
* Solder
* Flush cutters or wire cutters
* Crimping pliers (or just regular pliers)
* Scissors
* Wire strippers
* Heat gun
* Multimeter

<figure>
<img src="/images/09259903b247.jpg" alt="Tools laid out on a table: soldering iron and station, solder, flush cutters, crimping pliers, scissors, wire strippers and a heat gun">
<ol class="callouts">
<li dot="12,58" label="20,14" link="Tools list: start-here/tools-youll-need">Soldering iron <note>Any temperature-controlled iron. Shown here in its station with a brass tip cleaner.</note></li>
<li dot="35,33" label="44,10" link="Tools list: start-here/tools-youll-need">Solder <note>Any general-purpose electronics solder.</note></li>
<li dot="36,62" label="34,88" match="Flush cutters or wire cutters" link="Tools list: start-here/tools-youll-need">Flush cutters <note>Used to trim the excess wire poking through the barrel jack terminal.</note></li>
<li dot="47,45" label="50,76" match="Crimping pliers (or just regular pliers)" link="Tools list: start-here/tools-youll-need">Crimping pliers <note>Used to fold the strain relief tabs around the wires and TPU strand. Regular pliers also work.</note></li>
<li dot="58,45" label="60,16" link="Tools list: start-here/tools-youll-need">Scissors <note>For cutting the heat-shrink tubing and TPU strand to length.</note></li>
<li dot="71,42" label="70,86" link="Tools list: start-here/tools-youll-need">Wire strippers <note>Set to strip 4 mm from each wire end.</note></li>
<li dot="84,40" label="84,6" link="Tools list: start-here/tools-youll-need">Heat gun <note>Shrinks the three pieces of heat-shrink tubing.</note></li>
</ol>
</figure>
I also use a Sharpie like this to mark the wire:

<figure><img src="/images/f477e33c8fa0.jpg" alt=""></figure>

***

### Prep the Micro-Lock cable

Grab your Micro-Lock cable.

<figure><img src="/images/21be65521019.jpg" alt=""></figure>

Cut the cable in half to produce two 225 mm cable pigtails, measured from where the wires exit each Micro-Lock connector housing to the cut ends. You can use a different length, but 225 mm is the length I use.

You can clean any sticker residue from the cable using isopropyl alcohol or Goo Gone.

<figure><img src="/images/cb295c7e2c91.jpg" alt=""></figure>

**Mark the positive wire**

{% hint style="danger" %}
Don't skip this!
{% endhint %}

Locate the cable's positive wire. When looking down at the cable with the cable clip facing you, the positive wire will be on the right:

<figure>
<img src="/images/e5bf05390691.jpg" alt="The Micro-Lock connector held with its cable clip facing the camera, showing the two wires leaving the top">
<ol class="callouts">
<li dot="53,56" label="66,62" match="cable clip facing you">Cable clip (facing you) <note>Hold the connector so this latch faces you before reading which wire is which.</note></li>
<li dot="58,26" label="30,8" match="positive wire will be on the right">Positive wire (right) <note>With the clip toward you, the positive wire is the one on the right. Mark it in the next step.</note></li>
</ol>
</figure>
Make a mark on the positive wire. It will be harder to determine which wire is which later so it helps to do this now.

<figure><img src="/images/1e976218663f.jpg" alt=""></figure>

Strip both wires so 4 mm of bare wire is exposed.

<figure><img src="/images/9282a8675d08.jpg" alt=""></figure>

<figure><img src="/images/cec2763561bd.jpg" alt=""></figure>

Tin the wires.

<figure><img src="/images/ea75300e524b.jpg" alt=""></figure>

Unscrew the barrel-jack housing from the connector body.

<figure><img src="/images/93f8f34bd33f.jpg" alt=""></figure>

<figure>
<img src="/images/030ad181135f.jpg" alt="The straight DC power jack separated into its threaded barrel-jack housing (left) and the plug body with its two solder terminals (right)">
<ol class="callouts">
<li dot="35,44" label="34,12">Barrel-jack housing <note>Unscrewed from the plug body. The wires must be threaded through it before soldering.</note></li>
<li dot="28,47" label="14,30">Cable end <note>The ribbed strain-relief end. The wires enter the housing here.</note></li>
<li dot="41,46" label="48,26">Threaded end <note>The open threaded end that later screws back onto the plug body. The wires exit here.</note></li>
</ol>
</figure>
Thread the bare wire ends through the unscrewed barrel-jack housing, entering from the cable end and exiting through the threaded end as shown.

<div>
<figure><img src="/images/be8e10b019a3.jpg" alt=""></figure>
<figure><img src="/images/e764bf842ef6.jpg" alt=""></figure>
</div>

Slide your piece of 1.5 mm heat-shrink tubing over the two wires.

<figure><img src="/images/19e51e5cdee1.jpg" alt=""></figure>

Slide your piece of 3 mm heat-shrink tubing over the wires.

<figure><img src="/images/084850f53c02.jpg" alt=""></figure>

Your cable should look like this.

<figure><img src="/images/5aa1e7d126d2.jpg" alt="Cable pigtail with the barrel-jack housing, then the 1.5 mm tubing, then the 3 mm tubing threaded on, wires stripped at the end"></figure>
### Solder the barrel jack

Locate the positive wire on the Micro-Lock cable. The positive terminal on the barrel jack is the shorter terminal connected to the center contact. Feed the positive wire through the hole in this terminal from above as shown.

<figure>
<img src="/images/9a33e157ff33.jpg" alt="Positive wire fed down through the hole in the shorter barrel jack terminal from above">
<ol class="callouts">
<li dot="50,47" label="66,24" match="shorter terminal">Positive terminal (shorter) <note>Connected to the center contact of the plug. The marked positive wire goes here.</note></li>
<li dot="43,43" label="40,12" match="positive wire">Positive wire (marked) <note>The marked wire, entering the terminal hole from above.</note></li>
</ol>
</figure>
Solder the positive wire.

<figure><img src="/images/8627c59e5a72.jpg" alt=""></figure>

Trim any excess wire on the plug interior using your cutters.

<figure><img src="/images/60dc93654169.jpg" alt=""></figure>

<figure><img src="/images/c3d91c2e5246.jpg" alt=""></figure>

The long terminal is the negative terminal where we'll connect the negative wire. Apply some solder to the inner face of the negative terminal.

<figure>
<img src="/images/54ad9d1bd5e1.jpg" alt="Barrel jack held upright showing the long negative terminal and the loose negative wire">
<ol class="callouts">
<li dot="50,48" label="68,32" match="negative terminal">Negative terminal (long) <note>Apply a little solder to the inner face before bringing the wire in.</note></li>
<li dot="70,89" label="78,76" match="negative wire">Negative wire (tinned end) <note>Not yet attached. Its tinned end goes against the inner face of the long terminal.</note></li>
</ol>
</figure>
Solder the negative wire to the negative terminal, making sure that the wire insulation is sitting within the strain relief tabs.

<figure>
<img src="/images/f428bcd74ef1.jpg" alt="Negative wire soldered to the long terminal, with its insulation sitting inside the strain relief tabs">
<ol class="callouts">
<li dot="50,58" label="66,66">Strain relief tabs <note>The negative wire's insulation should sit inside these tabs, not above them, before you solder.</note></li>
</ol>
</figure>
<figure><img src="/images/be326c747212.jpg" alt=""></figure>

### Test the cable

Before enclosing the connections, use a multimeter in continuity mode to verify the cable:

* The marked positive Micro-Lock contact should have continuity with the barrel jack's center contact.
* The negative Micro-Lock contact should have continuity with the barrel jack's outer contact.
* There should be no continuity between the positive and negative contacts.

### Assemble the strain relief

Locate your TPU strand.

<figure><img src="/images/e437e49193ed.jpg" alt=""></figure>

Insert the TPU strand into the strain relief tabs alongside the two wires.

<figure>
<img src="/images/ad5df12d87ff.jpg" alt="TPU strand pushed through the strain relief tabs alongside the two soldered wires">
<ol class="callouts">
<li dot="49,48" label="68,30">TPU strand <note>Feed it through the tabs so it lies alongside the two wires. Its end pokes out past the tabs.</note></li>
<li dot="46,53" label="66,64">Strain relief tabs <note>Still open here. The strand and both wires pass through before the tabs are crimped.</note></li>
</ol>
</figure>
Use your crimping tool or just a regular pair of pliers to wrap the strain relief tabs around the wire and TPU strand bundle.

<figure><img src="/images/7a8d1ab4a830.jpg" alt=""></figure>

When you're done it should look like this. Give the TPU strand a light tug to ensure a secure fit.

<figure>
<img src="/images/0870900bad74.jpg" alt="Strain relief tabs crimped around the two wires and the TPU strand, with the jack body above">
<ol class="callouts">
<li dot="45.5,51" label="26,36" match="strain relief tabs">Strain relief tabs (crimped) <note>Folded around the two wires and the TPU strand. Give the strand a light tug to check it holds.</note></li>
</ol>
</figure>
Slide the larger 3 mm heat-shrink tubing from the opposite side of the cable over the wires, TPU strand, and strain relief tabs.

<div>
<figure><img src="/images/18d5f30c4f1a.jpg" alt=""></figure>
<figure><img src="/images/bf01fb4dd3fd.jpg" alt=""></figure>
</div>

Slide the smaller 1.5 mm heat-shrink tubing into the 3 mm heat-shrink tubing as far as it will go.

<figure><img src="/images/49fca6e955d9.jpg" alt=""></figure>

Use your heat gun to shrink the two pieces of heat shrink tubing around the cable assembly.

<figure><img src="/images/699e0393a638.jpg" alt=""></figure>

<figure><img src="/images/f7cd7da9ed86.jpg" alt=""></figure>

Slide the barrel-jack housing down the cable over the heat-shrink tubing and screw it onto the connector body.

<div>
<figure><img src="/images/1fa15829fd17.jpg" alt=""></figure>
<figure><img src="/images/1f34b17efd75.jpg" alt=""></figure>
</div>

Locate your 4.8 mm (3/16") adhesive-lined heat-shrink tubing.

<figure><img src="/images/21a0f567eca5.jpg" alt=""></figure>

Slide the tubing over the Micro-Lock side of the cable assembly and over the end of the barrel-jack housing.

<div>
<figure><img src="/images/c3da1067bfe5.jpg" alt=""></figure>
<figure><img src="/images/59b5a9f8636d.jpg" alt=""></figure>
</div>

Use your heat gun to shrink the tubing, making sure the adhesive lining melts (you should see a little bit of it ooze out of the end).

<figure><img src="/images/fdcc311b12d8.jpg" alt=""></figure>

You're done!

<figure><img src="/images/d0444335f622.jpg" alt=""></figure>
