# Printing Guide

Here's what you'll need to print. Start by choosing your filament and checking the fit, then work through the parts in assembly order. Each card links to the files and print instructions.

If you're sourcing everything yourself, you'll also need the [Additional Printed Parts](/open-task-light/self-sourcing-guide/additional-printed-parts.md). These come printed in the kit.

{% hint style="danger" %}
**Follow the print guides closely.** The Open Task Light relies on specific materials, orientations, supports, and print settings for proper fit and strength. A part can look acceptable but still cause fit, alignment, or assembly problems if its guide is not followed.

Review the guide for each part before slicing it. For best results, I recommend printing parts one at a time.
{% endhint %}

## Start here: materials and fit checks

First, pick your filament for the main parts and the carriage. We'll print a small tester in each to make sure the hardware fits before starting the full set of parts.

### Recommended materials

*Affiliate disclosure: As an Amazon Associate I earn from qualifying purchases. The Amazon product links below are paid links.*

* **Main parts (PLA):** [DURAMIC 3D Matte PLA](https://amzn.to/4qcp2wE)
* [**Carriage body (PET-CF)**](/open-task-light/printing-guide/carriage/carriage-body.md)**:** [Polymaker Fiberon PET-CF17](https://amzn.to/4x0hOhY)

{% hint style="danger" %}
**PET-CF must be dry to print accurately.** I only recommend it for the carriage. Follow the [Carriage Body guide](/open-task-light/printing-guide/carriage/carriage-body.md) for filament preparation and fit checks before printing.
{% endhint %}

### Printer setup

* **Nozzle diameter:** 0.4 mm
* **Print bed:** Smooth PEI recommended

### Default print settings

Use these print settings unless specified otherwise on the part page.

<table><thead><tr><th width="244.703125">Preset</th><th width="99.99609375">Infill</th><th>Shells</th></tr></thead><tbody><tr><td><code class="expression">space.vars.layer_height_prusa</code><br><code class="expression">space.vars.layer_height_bambu</code></td><td><code class="expression">space.vars.infill</code></td><td><code class="expression">space.vars.shells</code></td></tr></tbody></table>

<details open>

<summary><strong>Print this first: Hardware Fit Tester</strong></summary>

Print one tester in each filament:

1. **Main parts:** use your PLA filament and the [default print settings](#default-print-settings) above.
2. **Carriage:** use your carriage filament and the [Carriage Body print settings](/open-task-light/printing-guide/carriage/carriage-body.md).

Follow the [Hardware Fit Tester guide](/open-task-light/printing-guide/before-you-start/hardware-fit-tester.md) to check each print. If something doesn't fit properly, [correct the filament flow](/open-task-light/printing-guide/before-you-start/filament-flow-calibration.md) and try again. Once the fit is right, you can start printing parts with that filament and those settings.

If you bought a PETCF carriage from the store, you can skip the carriage test.

<table data-column-title-hidden data-view="cards"><thead><tr><th data-type="content-ref"></th><th></th><th data-hidden data-card-cover data-type="image">Cover image</th><th data-hidden data-card-target data-type="content-ref"></th></tr></thead><tbody><tr><td><a href="/open-task-light/printing-guide/before-you-start/hardware-fit-tester.md">Hardware Fit Tester</a></td><td>Qty: 1 per filament</td><td><a href="/images/ade7c5dfe9f3.png">Screenshot 2026-09-07 at 4.25.32 PM.png</a></td><td><a href="/open-task-light/printing-guide/before-you-start/hardware-fit-tester.md">Hardware Fit Tester</a></td></tr></tbody></table>

</details>

## Plan your prints

{% hint style="warning" %}
**A few prints need hardware added along the way.** You'll need to pause the [Electronics Housing](/open-task-light/printing-guide/electronics-housing/electronics-housing.md#hardware-insertion), [Carriage Body](/open-task-light/printing-guide/carriage/carriage-body.md#hardware-insertion), and [Counterweight Enclosure](/open-task-light/printing-guide/counterweight/counterweight-enclosure.md#hardware-insertion) prints to insert hardware.

Once you've checked the fit, feel free to print these first while you're around to add the hardware. Read their guides and have the hardware ready before starting. Look for **Pause to insert hardware** on the cards below.
{% endhint %}

### 3D Models

Download a ZIP containing the current version of every STL file:

<a href="https://github.com/stevenbennett/Open-Task-Light/releases/latest/download/Open-Task-Light-STLs.zip" class="button primary" data-icon="download">Download all STL files</a>

STEP files are also available for builders who want to modify a part, adjust clearances, or adapt the design. Check out the editable model files in the [STEP directory on GitHub](https://github.com/stevenbennett/Open-Task-Light/tree/main/Open%20Task%20Light/Printed%20Parts/STEP).

***

## Print checklist

These parts are grouped in the order you'll need them in the [assembly guide](/open-task-light/assembly-guide.md). **Choose one base:** freestanding or clamping. Quantities are for one light, so skip anything you already have.

You can collapse each group as you finish printing it, or if you don't need it. The printed tools are listed alongside the parts they're used with. Optional prints are marked on their cards.

<details open>

<summary><strong>1. Horizontal rail</strong></summary>

You'll need these for the [horizontal rail assembly](/open-task-light/assembly-guide/horizontal-rail-assembly.md). Print all four power track supports now and set two aside for vertical rail assembly later.

<table data-column-title-hidden data-view="cards"><thead><tr><th data-type="content-ref"></th><th></th><th>Print note<select><option value="pause-for-hardware" label="Pause to insert hardware" color="blue"></option></select></th><th data-hidden data-card-cover data-type="image">Cover image</th><th data-hidden data-card-target data-type="content-ref"></th></tr></thead><tbody><tr><td><a href="/open-task-light/printing-guide/electronics-housing/electronics-housing.md">Electronics Housing</a></td><td>Qty: 1</td><td><span data-option="pause-for-hardware">Pause to insert hardware</span></td><td><a href="/images/d963b69779ad.png">electronics housing.png</a></td><td><a href="/open-task-light/printing-guide/electronics-housing/electronics-housing.md">Electronics Housing</a></td></tr><tr><td><a href="/open-task-light/printing-guide/electronics-housing/button-sockets.md">Button Sockets</a></td><td>Qty: 1</td><td></td><td><a href="/images/c13b644550a6.png">button sockets.png</a></td><td><a href="/open-task-light/printing-guide/electronics-housing/button-sockets.md">Button Sockets</a></td></tr><tr><td><a href="/open-task-light/printing-guide/electronics-housing/shade.md">Shade</a></td><td>Qty: 1</td><td></td><td><a href="/images/8e29a24adf8b.png">shade.png</a></td><td><a href="/open-task-light/printing-guide/electronics-housing/shade.md">Shade</a></td></tr><tr><td><a href="/open-task-light/printing-guide/rail-attachments/power-track-support.md">Power Track Support</a></td><td>Qty: 4</td><td></td><td><a href="/images/7edc9e514a7a.png">power track support.png</a></td><td><a href="/open-task-light/printing-guide/rail-attachments/power-track-support.md">Power Track Support</a></td></tr><tr><td><a href="/open-task-light/printing-guide/rail-attachments/end-cap.md">End Cap</a></td><td>Qty: 1</td><td></td><td><a href="/images/64885f7168c1.png">rail end cap.png</a></td><td><a href="/open-task-light/printing-guide/rail-attachments/end-cap.md">End Cap</a></td></tr></tbody></table>

</details>

<details open>

<summary><strong>2. Your base: Freestanding</strong></summary>

Print these if you're building the [freestanding base](/open-task-light/assembly-guide/base-assembly/freestanding-base.md).

<table data-column-title-hidden data-view="cards"><thead><tr><th data-type="content-ref"></th><th></th><th data-hidden data-card-cover data-type="image">Cover image</th><th data-hidden data-card-target data-type="content-ref"></th></tr></thead><tbody><tr><td><a href="/open-task-light/printing-guide/freestanding-base/bottom-shell.md">Bottom Shell</a></td><td>Qty: 1</td><td><a href="/images/4ddd0209cd84.png">bottom shell.png</a></td><td><a href="/open-task-light/printing-guide/freestanding-base/bottom-shell.md">Bottom Shell</a></td></tr><tr><td><a href="/open-task-light/printing-guide/tools/weight-material-scoop.md">Weight Material Scoop</a></td><td>Qty: 1 · Optional</td><td><a href="/images/b68d17fa59bc.png">scoop.png</a></td><td><a href="/open-task-light/printing-guide/tools/weight-material-scoop.md">Weight Material Scoop</a></td></tr><tr><td><a href="/open-task-light/printing-guide/freestanding-base/bottom-shell-lid.md">Bottom Shell Lid</a></td><td>Qty: 1</td><td><a href="/images/f7b53db25d05.png">bottom shell lid.png</a></td><td><a href="/open-task-light/printing-guide/freestanding-base/bottom-shell-lid.md">Bottom Shell Lid</a></td></tr><tr><td><a href="/open-task-light/printing-guide/freestanding-base/outer-shell.md">Outer Shell</a></td><td>Qty: 1</td><td><a href="/images/327eb2a8f9bb.png">outer shell.png</a></td><td><a href="/open-task-light/printing-guide/freestanding-base/outer-shell.md">Outer Shell</a></td></tr><tr><td><a href="/open-task-light/printing-guide/freestanding-base/outer-shell-lid.md">Outer Shell Lid</a></td><td><strong>Qty: 2</strong></td><td><a href="/images/0c0f32bb33b1.png">base lid.png</a></td><td><a href="/open-task-light/printing-guide/freestanding-base/outer-shell-lid.md">Outer Shell Lid</a></td></tr><tr><td><a href="/open-task-light/printing-guide/freestanding-base/bracket-plate.md">Bracket Plate</a></td><td>Qty: 1</td><td><a href="/images/1c9ef7ca8938.png">bracket plate.png</a></td><td><a href="/open-task-light/printing-guide/freestanding-base/bracket-plate.md">Bracket Plate</a></td></tr><tr><td><a href="/open-task-light/printing-guide/freestanding-base/power-jack-plate.md">Power Jack Plate</a></td><td>Qty: 1</td><td><a href="/images/c954f81cf91c.png">dc barrel jack plate.png</a></td><td><a href="/open-task-light/printing-guide/freestanding-base/power-jack-plate.md">Power Jack Plate</a></td></tr><tr><td><a href="/open-task-light/printing-guide/freestanding-base/bracket-cover.md">Bracket Cover</a></td><td>Qty: 1</td><td><a href="/images/8685951558e8.png">bracket cover.png</a></td><td><a href="/open-task-light/printing-guide/freestanding-base/bracket-cover.md">Bracket Cover</a></td></tr><tr><td><a href="/open-task-light/printing-guide/tools/power-track-offset-tool.md">Power Track Offset Tool</a></td><td>Qty: 1 · <strong>Freestanding Base (30 mm)</strong></td><td><a href="/images/8b64633db088.png">power track offset tool.png</a></td><td><a href="/open-task-light/printing-guide/tools/power-track-offset-tool.md">Power Track Offset Tool</a></td></tr></tbody></table>

</details>

<details open>

<summary><strong>2. Your base: Clamping</strong></summary>

Print these if you're building the [clamping base](/open-task-light/assembly-guide/base-assembly/clamping-base.md).

<table data-column-title-hidden data-view="cards"><thead><tr><th data-type="content-ref"></th><th></th><th data-hidden data-card-cover data-type="image">Cover image</th><th data-hidden data-card-target data-type="content-ref"></th></tr></thead><tbody><tr><td><a href="/open-task-light/printing-guide/clamping-base/body.md">Body</a></td><td>Qty: 1</td><td><a href="/images/fcf22fb251d1.png">clamping base.png</a></td><td><a href="/open-task-light/printing-guide/clamping-base/body.md">Body</a></td></tr><tr><td><a href="/open-task-light/printing-guide/clamping-base/rail-bottom.md">Rail Bottom</a></td><td>Qty: 1</td><td><a href="/images/7ef097728309.png">clamping base rail end.png</a></td><td><a href="/open-task-light/printing-guide/clamping-base/rail-bottom.md">Rail Bottom</a></td></tr><tr><td><a href="/open-task-light/printing-guide/clamping-base/power-plug-clip.md">Power Plug Clip</a></td><td>Qty: 1</td><td><a href="/images/0c5053c4e032.png">c-clamp cable clip.png</a></td><td><a href="/open-task-light/printing-guide/clamping-base/power-plug-clip.md">Power Plug Clip</a></td></tr><tr><td><a href="/open-task-light/printing-guide/tools/power-track-offset-tool.md">Power Track Offset Tool</a></td><td>Qty: 1 · <strong>Clamping Base (42 mm)</strong></td><td><a href="/images/8b64633db088.png">power track offset tool.png</a></td><td><a href="/open-task-light/printing-guide/tools/power-track-offset-tool.md">Power Track Offset Tool</a></td></tr></tbody></table>

</details>

<details open>

<summary><strong>3. Carriage and counterweight</strong></summary>

Choose the steel or lead enclosure to match your weight material, and make sure you print the matching lid. Steel is the default.

<table data-column-title-hidden data-view="cards"><thead><tr><th data-type="content-ref"></th><th></th><th>Print note<select><option value="pause-for-hardware" label="Pause to insert hardware" color="blue"></option></select></th><th data-hidden data-card-cover data-type="image">Cover image</th><th data-hidden data-card-target data-type="content-ref"></th></tr></thead><tbody><tr><td><a href="/open-task-light/printing-guide/carriage/carriage-body.md">Carriage Body</a></td><td>Qty: 1</td><td><span data-option="pause-for-hardware">Pause to insert hardware</span></td><td><a href="/images/97be955cacbc.png">carriage.png</a></td><td><a href="/open-task-light/printing-guide/carriage/carriage-body.md">Carriage Body</a></td></tr><tr><td><a href="/open-task-light/printing-guide/counterweight/counterweight-enclosure.md">Counterweight Enclosure</a></td><td>Qty: 1 · Steel or Lead</td><td><span data-option="pause-for-hardware">Pause to insert hardware</span></td><td><a href="/images/1d69fb7f4cbe.png">counterweight.png</a></td><td><a href="/open-task-light/printing-guide/counterweight/counterweight-enclosure.md">Counterweight Enclosure</a></td></tr><tr><td><a href="/open-task-light/printing-guide/tools/counterweight-funnel.md">Counterweight Funnel</a></td><td>Qty: 1</td><td></td><td><a href="/images/6ab520c402a1.png">funnel.png</a></td><td><a href="/open-task-light/printing-guide/tools/counterweight-funnel.md">Counterweight Funnel</a></td></tr><tr><td><a href="/open-task-light/printing-guide/tools/weight-material-scoop.md">Weight Material Scoop</a></td><td>Qty: 1 · Optional<br>Reuse from base if already printed.</td><td></td><td><a href="/images/b68d17fa59bc.png">scoop.png</a></td><td><a href="/open-task-light/printing-guide/tools/weight-material-scoop.md">Weight Material Scoop</a></td></tr><tr><td><a href="/open-task-light/printing-guide/counterweight/counterweight-lid.md">Counterweight Lid</a></td><td>Qty: 1<br>Match enclosure variant.</td><td></td><td><a href="/images/49ee341834a9.png">counterweight lid.png</a></td><td><a href="/open-task-light/printing-guide/counterweight/counterweight-lid.md">Counterweight Lid</a></td></tr><tr><td><a href="/open-task-light/printing-guide/counterweight/counterweight-belt-clip.md">Counterweight Belt Clip</a></td><td>Qty: 1</td><td></td><td><a href="/images/26e7a34a58b0.png">counterweight belt clip.png</a></td><td><a href="/open-task-light/printing-guide/counterweight/counterweight-belt-clip.md">Counterweight Belt Clip</a></td></tr><tr><td><a href="/open-task-light/printing-guide/carriage/carriage-clip.md">Carriage Clip</a></td><td>Qty: 1</td><td></td><td><a href="/images/faa69289ff2b.png">carriage clip.png</a></td><td><a href="/open-task-light/printing-guide/carriage/carriage-clip.md">Carriage Clip</a></td></tr></tbody></table>

</details>

<details open>

<summary><strong>4. Final assembly</strong></summary>

You'll need these for [final assembly](/open-task-light/assembly-guide/final-assembly.md).

<table data-column-title-hidden data-view="cards"><thead><tr><th data-type="content-ref"></th><th></th><th data-hidden data-card-cover data-type="image">Cover image</th><th data-hidden data-card-target data-type="content-ref"></th></tr></thead><tbody><tr><td><a href="/open-task-light/printing-guide/rail-attachments/pulley-mount.md">Pulley Mount</a></td><td>Qty: 1</td><td><a href="/images/dd8285fe90b6.png">pulley mount.png</a></td><td><a href="/open-task-light/printing-guide/rail-attachments/pulley-mount.md">Pulley Mount</a></td></tr><tr><td><a href="/open-task-light/printing-guide/rail-attachments/pulley-mount-alignment-insert.md">Pulley Mount Alignment Insert</a></td><td>Qty: 1 · Optional</td><td><a href="/images/d07f89a8b46d.png">pulley mount insert.png</a></td><td><a href="/open-task-light/printing-guide/rail-attachments/pulley-mount-alignment-insert.md">Pulley Mount Alignment Insert</a></td></tr></tbody></table>

</details>
