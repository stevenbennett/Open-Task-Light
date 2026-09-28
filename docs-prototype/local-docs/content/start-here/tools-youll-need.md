# Tools and Supplies

Gather the tools and supplies required for your build. If you are building from a kit, start with the tools required for every build. If you are self-sourcing, also review the printing, fabrication, and part-preparation sections before ordering.

## Required for every build

Unless noted otherwise, these tools and supplies are not included in the kit.

* 1.3 mm hex driver/Allen key
* 1.5 mm hex driver/Allen key
* 2 mm hex driver/Allen key
* 2.5 mm hex driver/Allen key
* 3 mm hex driver/Allen key
* 4 mm hex driver/Allen key
* 8 mm wrench, plus a 10 mm wrench for freestanding builds (included in the kit as the two ends of the custom OTL Wrench; self-sourcers need standard wrenches in the applicable sizes)
* Flush cut trimmers (for cleaning support materials from printed parts)
* FDM 3D printer with a 0.4 mm nozzle (for the standard printed parts)
* [PLA filament](https://amzn.to/4qcp2wE) (1 kg is more than enough for the standard printed parts)

Most assembly steps can be completed with a hex driver, but a few steps require fully tightening a screw. A hex key or wrench provides better leverage for those steps.

## Helpful or optional for every build

* [**PET-CF carriage filament**](https://amzn.to/4yzBsBE)**:** PET-CF is recommended for the carriage, but PC-CF, PLA, or PETG can also be used. PET-CF and PC-CF require a compatible hardened nozzle, careful moisture control, a filament dryer or dry box, and calipers for checking the finished print.
* Hobby knife (for cleaning up prints)
* Broad-nose tweezers (for fishing small objects such as cables out of tight spaces)
* Digital multimeter (for [troubleshooting power connections](/open-task-light/troubleshooting/no-light-after-assembly.md#set-up-the-multimeter))

## Additional tools and supplies for self-sourcing

Self-sourcing involves 3D printing, soldering, tapping the rails, and preparing several parts by hand. Review this list before ordering so you don't run into a missing material or tool halfway through the build.

{% hint style="info" %}
This is a planning checklist for tools and supplies. It intentionally repeats consumables from the BOM so everything used during fabrication is visible in one place. Use the BOM for exact quantities and purchasing links.
{% endhint %}

<details open>

<summary><strong>Additional printing materials</strong></summary>

* [**Electrically conductive PLA**](https://proto-pasta.com/products/conductive-pla?srsltid=AfmBOor3yscxSotbG5E99RWTZ5dNmIY849cXZLlqgHIWShCEW7XIANWV)**:** 50 g is more than enough for the power and brightness buttons.
* [**PETG + PTFE or regular PETG**](https://texasfilamentsupply.com/products/petg-ptfe?variant=44926995071151)**:** A small amount for the two counterweight flex tabs.
* **Transparent material:** Clear filament or clear resin for the ambient light window and, optionally, the control board clip.

</details>

<details open>

<summary><strong>Common tools and consumables</strong></summary>

* **0.25 mm nozzle:** For printing the small Power Link insulators.
* **Thermally conductive two-part epoxy (included in the BOM):** For bonding the heat pipe inside the horizontal rail. In the kits, black epoxy is used on black rails and off-white epoxy is used on silver rails to match the rail color. The off-white epoxy is a little more expensive, but both will work with either rail color. Choose one of the two options below. The lower-cost generic dispensing gun works with both epoxies, but their mixing nozzles are **not interchangeable**.
  * [**Black epoxy (Wakefield BT-301-50M)**](https://www.digikey.com/en/products/detail/wakefield-thermal-solutions/BT-301-50M/7317821)**:** Purchase mixing nozzles separately.
    * **Dispensing gun:** [Wakefield BT-01-50M](https://www.digikey.com/en/products/detail/wakefield-thermal-solutions/BT-01-50M/7317822), or the [lower-cost generic gun](https://link.amazon/B08NBaDOH).
    * **Mixing nozzles:** [Wakefield BT-02-50M](https://www.digikey.com/en/products/detail/wakefield-thermal-solutions/BT-02-50M/7317831), or [lower-cost nozzles for the black epoxy](https://link.amazon/A04T3sG3l).
  * [**Off-white epoxy (MG Chemicals 8329TFF-50ML)**](https://www.digikey.com/en/products/detail/mg-chemicals/8329TFF-50ML/9608261)**:** Includes a mixing nozzle; purchase extras for subsequent uses.
    * **Dispensing gun:** [MG Chemicals 8DG-50-1-1](https://www.digikey.com/en/products/detail/mg-chemicals/8DG-50-1-1/7496982), or the [lower-cost generic gun](https://link.amazon/B08NBaDOH).
    * **Mixing nozzles:** [MG Chemicals 8MT-50](https://www.digikey.com/en/products/detail/mg-chemicals/8MT-50/7496985), or [lower-cost nozzles for the off-white epoxy](https://link.amazon/B09UdgbQg).
* [**Thermal paste**](https://amzn.to/4ygiMa4) **(included in the BOM):** For transferring heat between the heat pipe, copper bracket, and LED.
* **Nitrile gloves:** Recommended for handling the heat pipe so the copper doesn't tarnish over time.
* **Soldering iron:** For preparing the controller and cable assemblies and assembling the Power Tracks.
* **Solder:** For the controller headers, cable assemblies, and Power Track connectors.
* **Solder paste:** For mounting the Power Track standoffs and assembling the Power Link contacts.
* **Liquid flux:** For soldering the Power Track connector pins.
* **Wire strippers:** For preparing the LED and power cables.
* [**Flush cutters capable of trimming metal leads**](https://amzn.to/4ysVH3Q)**, or wire cutters:** For cutting wire and trimming header pins and barrel-jack terminals.
* **Scissors:** For cutting the timing belt, tubing, and other flexible materials.
* **M5 tap and tap handle:** For tapping the ends of the V-Slot rails.
* **Multimeter:** For checking cable polarity and continuity.
* [**Alcohol wipes**](https://amzn.to/4xwmNXG) **(included in the BOM) or isopropyl alcohol:** For cleaning parts, cable residue, and excess thermal paste.
* **A way to mark one wire for polarity, such as a permanent marker:** For identifying the positive conductor after cutting a cable.
* **Thin, dull shim (\~.330"):** Optional but helpful for removing the plastic spacers from the QT Py headers without damaging the board.

</details>

<details>

<summary><strong>Build-specific tools and supplies</strong></summary>

**Freestanding build**

* **Drill press:** For boring the eight mounting holes in the turntable bearing (a hand drill can work too but a drill press is ideal).
* [**5.3 mm drill bit**](https://amzn.to/4ilpLcZ)**:** For enlarging the bearing holes to the required diameter.
* **Masking tape:** For protecting the exposed bearing ring from drilling debris.
* **Super glue:** Optional for retaining the barrel-jack cover.

**Clamping build**

* **1.5 mm heat-shrink tubing (included in the BOM):** For insulating the individual power-cable conductors.
* **3 mm heat-shrink tubing (included in the BOM):** For insulating and reinforcing the cable bundle at the barrel jack.
* **4.8 mm adhesive-lined heat-shrink tubing (included in the BOM):** For creating the cable's outer strain relief.
* **Short length of 1.75 mm TPU filament (included in the BOM):** For adding flexible support inside the barrel-jack strain relief.
* **Heat gun:** For shrinking all three sizes of heat-shrink tubing.
* **Crimping pliers or regular pliers:** For closing the barrel jack's strain-relief tabs around the cable bundle.

</details>

<details>

<summary><strong>Fabrication-dependent and optional items</strong></summary>

* **Power Link assembly:** Soldering hot plate or reflow oven and tweezers. You can avoid this work by having the board professionally assembled.
* **Power Track connectors:** Two-part epoxy suitable for fiberglass and a small paintbrush, optional for securing the connectors before soldering.
* **Aluminum heat pipe top plate:** M3 x 0.5 tap if the cutting service does not tap the two smaller holes.
* **Resin parts:** Resin printer plus the washing, curing, and protective equipment required by your resin system.
* **Heat pipe preparation:** 1/4-inch-wide, 180-grit sanding belt, optional for improving adhesion.
* **Cable cleanup:** Goo Gone, optional for removing sticker residue from Micro-Lock cables.

</details>
