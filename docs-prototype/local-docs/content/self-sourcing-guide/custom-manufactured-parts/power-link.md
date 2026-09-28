# Power Link

The Power Link is the two-conductor PCB that transfers power between the vertical and horizontal Power Tracks through the carriage.

<a href="https://github.com/stevenbennett/Open-Task-Light/tree/main/Open%20Task%20Light/Electronics/Power%20Link" class="button primary" data-icon="github">View PCB files on GitHub</a>

<figure>
<img src="/images/b67e51e0a406.png" alt="CAD render of the L-shaped power link PCB with a four-pin OmniBall array on each end">
<ol class="callouts">
<li dot="58,34" label="82,40" qty="8" match="OmniBall spring-loaded contacts" link="Power Link files and BOM on GitHub: https://github.com/stevenbennett/Open-Task-Light/tree/main/Open%20Task%20Light/Electronics/Power%20Link">OmniBall pin <note>Mill-Max 0945-0-15-20-09-14-11-0. Four spring-loaded contacts per array, one array at each end. Do not press on the tips.</note></li>
<li dot="50,31" label="45,10" qty="2" match="Power Link Insulators" link="Part page: self-sourcing-guide/additional-printed-parts/power-link-insulator">Power Link Insulator <note>Printed plate that slides over each OmniBall array.</note></li>
</ol>
</figure>
{% hint style="info" %}
**Required quantity:** 1

The completed Power Link uses eight Mill-Max OmniBall spring-loaded contacts and two printed [Power Link Insulators](/open-task-light/self-sourcing-guide/additional-printed-parts/power-link-insulator.md).
{% endhint %}

## Parts and files

* 1 × Power Link PCB
* 8 × Mill-Max 0945-0-15-20-09-14-11-0 surface-mount spring-loaded contacts (Omniball Pins)
* 2 × [Power Link Insulator](/open-task-light/self-sourcing-guide/additional-printed-parts/power-link-insulator.md)

The GitHub folder also includes the Fusion Electronics source, a BOM, and separate front- and back-side placement exports. If using a PCB assembly service, convert the placement exports to that manufacturer's required format and review component positions, board sides, and rotations in its preview.

## Assemble the contacts

The OmniBall pins are best installed using a soldering hot plate or reflow oven. Better yet, have the board professionally assembled. The Power Link is tricky to assemble by hand, but it can be done.

1. Apply solder paste to the eight contact pads.
2. Place one spring-loaded contact on each pad. These are individual contacts, not four-pin connector assemblies.
3. Reflow the board using the solder-paste manufacturer's recommended profile. Keep the board level so the contacts remain upright and the spring tips stay clear of the reflow surface.
4. After the board cools, inspect every joint and verify that the two conductors are not shorted together.
5. Slide a printed Power Link Insulator over each OmniBall array.

{% hint style="warning" %}
The OmniBall spring tips are fragile. Do not press on them during assembly, installation, or handling.
{% endhint %}

## Install

Insert the completed Power Link into the carriage as described in the [carriage and counterweight assembly guide](/open-task-light/assembly-guide/carriage-and-counterweight/joining-the-carriage-and-the-counterweight.md). It is symmetrical and can be installed in either direction. It should drop into the carriage slot without force.
