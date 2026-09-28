# Freestanding Base Power Cable Assembly

This guide will walk your through assembly of the custom power cable used to connect the Open Task Light to the freestanding base, and the freestanding base to the DC extension cable.

{% hint style="danger" %}
**Never plug this cable directly into the control board.** Its connector polarity is reversed relative to the control board, and connecting it directly may damage the electronics.
{% endhint %}

### Gather the following

**Parts:**

* 150 mm Micro-Lock Cable (1)
* Threaded DC Barrel Jack (1)
* Threaded DC Barrel Jack hex nut (comes with barrel jack)
* Printed part
  * [Freestanding Base Barrel Jack Cover](/open-task-light/self-sourcing-guide/additional-printed-parts/freestanding-base-barrel-jack-cover.md)

<figure>
<img src="/images/a80ed00e549f.jpg" alt="Micro-Lock cable, printed barrel jack cover, threaded DC barrel jack and its hex nut laid out on a table">
<ol class="callouts">
<li dot="44,45" label="24,45" qty="1" match="150 mm Micro-Lock Cable" link="BOM: self-sourcing-guide/bill-of-materials">Microlock cable <note>The 150 mm two-wire cable with a Micro-Lock connector at each end. Gets cut to 60 mm.</note></li>
<li dot="54,33" label="76,26" qty="1" match="Freestanding Base Barrel Jack Cover" link="Part page: self-sourcing-guide/additional-printed-parts/freestanding-base-barrel-jack-cover">Barrel jack cover <note>Printed cap that snaps over the soldered terminals.</note></li>
<li dot="55,47" label="78,47" qty="1" link="BOM: self-sourcing-guide/bill-of-materials">Threaded DC barrel jack <note>Terminals get trimmed before soldering.</note></li>
<li dot="56,65" label="76,70" qty="1">Hex nut <note>Comes with the barrel jack. Thread it on at the end so it does not get lost.</note></li>
</ol>
</figure>
**Tools:**

* Soldering iron
* Solder
* Flush cutters or wire cutters
* Scissors
* Wire strippers

<figure>
<img src="/images/2c4416e30e91.jpg" alt="Soldering station, spool of solder, flush cutters, scissors and wire strippers laid out on a table">
<ol class="callouts">
<li dot="13,68" label="26,90" qty="Tool">Soldering iron <note>Any fine-tip iron works.</note></li>
<li dot="38,32" label="38,12" qty="Tool">Solder <note>Thin electronics solder.</note></li>
<li dot="41,60" label="40,90" qty="Tool" match="Flush cutters or wire cutters">Flush cutters <note>Used to trim the barrel jack terminals and the third tab.</note></li>
<li dot="55,50" label="60,90" qty="Tool">Scissors <note>For cutting the cable to length.</note></li>
<li dot="70,45" label="84,20" qty="Tool">Wire strippers <note>Strip 3 mm from each wire end.</note></li>
</ol>
</figure>
I use a Sharpie like this to mark the wire:

<figure><img src="/images/f477e33c8fa0.jpg" alt=""></figure>

***

### Prep the Micro-Lock cable

Grab your Micro-Lock cable.

<figure><img src="/images/b8e7df5e0117.jpg" alt=""></figure>

Cut the cable 60 mm from where the wires exit the Micro-Lock connector housing.

You can clean any sticker residue from the cable using isopropyl alcohol or Goo Gone.

<figure><img src="/images/dd0435d8f2a9.jpg" alt=""></figure>

Strip the wire ends so 3 mm of wire is exposed.

<figure><img src="/images/1635c7dfa4f7.jpg" alt=""></figure>

Tin the wires with some solder. This will help with the later soldering steps.

<figure><img src="/images/ea75300e524b.jpg" alt=""></figure>

**Mark the positive wire**

{% hint style="danger" %}
Don't skip this!
{% endhint %}

Locate the cable's positive wire. When looking down at the cable with the cable clip facing you, the positive wire will be on the right:

<figure>
<img src="/images/36f480d9242d.jpg" alt="Micro-Lock connector held with its cable clip facing the camera, the right-hand wire curving off to the right">
<ol class="callouts">
<li dot="47,50" label="20,32">Cable clip <note>The small latch on the connector housing. Hold the connector so this faces you.</note></li>
<li dot="58,30" label="57,10" match="positive wire">Positive wire <note>With the clip facing you, the wire on the right is positive. Mark this one.</note></li>
</ol>
</figure>
Mark the positive wire near the stripped end.

<figure><img src="/images/6faa249e103f.jpg" alt=""></figure>

<figure><img src="/images/148eb026b2af.jpg" alt=""></figure>

### Prep the barrel jack

Gather your barrel jack.

<figure><img src="/images/a6e4d56949c2.jpg" alt=""></figure>

We need the jack to be as low profile as possible to fit inside the base. Use your flush cut trimmers or wire cutters to trim the terminals so they're the same height as the nearby plastic tabs.

<figure><img src="/images/b4ec340c5bba.jpg" alt=""></figure>

<figure><img src="/images/b1dae8aa635b.jpg" alt=""></figure>

There's an unused third tab on the side of the barrel that will get in the way unless we remove it. Trim it so it's short enough to be tucked away inside the barrel:

<figure>
<img src="/images/cecbb41c3d8d.jpg" alt="Flush cutters trimming the unused third tab on the side of the barrel jack">
<ol class="callouts">
<li dot="55,46" label="35,28" match="unused third tab">Third tab <note>The extra tab on the side of the barrel. Trim it short enough to tuck inside the barrel.</note></li>
</ol>
</figure>
<figure><img src="/images/3353face11ef.jpg" alt=""></figure>

**Apply solder to the two barrel tabs**

The positive tab is the one connected to the center contact inside the barrel. We'll solder the wire to the inside of this tab (the side facing the center of the barrel). Apply some solder to this area.

<figure>
<img src="/images/71c53b0ea972.jpg" alt="Barrel jack viewed from the terminal end with a tool tip on the inside face of the positive tab">
<ol class="callouts">
<li dot="61,49" label="45,25">Positive tab <note>The tab connected to the center contact. Solder goes on its inside face, toward the center of the barrel.</note></li>
<li dot="57,53" label="35,42">Center contact <note>The pin in the middle of the barrel. The positive tab is the one joined to it.</note></li>
</ol>
</figure>
The negative tab is the one farther from the center. We'll solder the wire to the side facing away from the center of the barrel. Apply some solder here in preparation.

<figure>
<img src="/images/019d753d2604.jpg" alt="Barrel jack viewed from the terminal end with a tool tip on the outside face of the negative tab">
<ol class="callouts">
<li dot="50,47" label="32,28">Negative tab <note>The tab farther from the center. Solder goes on its outside face, away from the barrel center.</note></li>
</ol>
</figure>
### Solder the wires

Now we're going to solder the wires to their respective terminals. Pay close attention to which side of the terminal you solder the wire to; I do it in a specific way to greatly reduce the risk of the two leads accidentally touching in the final cable assembly.

Solder the positive wire to the positive terminal (the one closer to the center and connected to the center contact inside the barrel).

<figure><img src="/images/cc0a9b9cdd09.jpg" alt=""></figure>

Solder the negative wire to the **outside** face of the negative terminal.

<figure><img src="/images/98b7f99c12bb.jpg" alt=""></figure>

The final soldered wires should look like this:

{% embed url="<https://files.gitbook.com/v0/b/gitbook-x-prod.appspot.com/o/spaces%2FzVgcUmujJggE09G24EdB%2Fuploads%2FaqCTQqpg9WzCWK7lou0s%2FDSCF8192.mp4?alt=media&token=48df964b-9a16-4e97-a5cd-84ba308e143d>" %}

### Attach the jack cover

In this section we'll attach the protective cover over the barrel jack terminals/wires.

Start by bending the Micro-Lock side of the cable as shown:

<figure><img src="/images/57e156ae77a3.jpg" alt=""></figure>

Thread the Micro-Lock connector through the barrel jack cover:

<figure>
<img src="/images/aa893ef9d61a.jpg" alt="Micro-Lock connector being threaded through the printed barrel jack cover, with the soldered barrel jack held on the left">
<ol class="callouts">
<li dot="47,45" label="47,22" link="Part page: self-sourcing-guide/additional-printed-parts/freestanding-base-barrel-jack-cover">Barrel jack cover <note>Feed the connector in from the barrel side so the cover ends up over the terminals.</note></li>
<li dot="53,52" label="70,65">Micro-Lock connector <note>Goes through the cover first, then the rest of the cable follows.</note></li>
<li dot="31,49" label="18,28" match="barrel jack">Threaded DC barrel jack <note>Soldered terminals face the cover.</note></li>
</ol>
</figure>
Thread the rest of the cable through and snap the cover over the barrel jack.

You can secure the cover by applying some super glue where the plastic portions of both parts meet, but this is optional. The cover will typically stay in place on its own.

<figure><img src="/images/9b8e62ad3eaf.jpg" alt=""></figure>

Thread the included nut onto the barrel jack so you don't lose it.

<figure><img src="/images/6361bcc18b06.jpg" alt=""></figure>

That's it, you're done!

<figure><img src="/images/02efa0228760.jpg" alt=""></figure>
