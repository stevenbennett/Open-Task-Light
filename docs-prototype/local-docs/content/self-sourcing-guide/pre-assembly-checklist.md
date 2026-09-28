# Pre-assembly checklist

Use this checklist to finish up the self-sourcing work. You should have the same set of prepared, ready-to-use parts that would normally come with a kit.

## Build selection and BOM

* [ ] **Build selected:** You've chosen either the freestanding or clamping version and used the corresponding [bill of materials](/open-task-light/self-sourcing-guide/bill-of-materials.md).
* [ ] **Parts accounted for:** You have the required quantities and have checked the BOM's sourcing notes, approved alternatives, and preparation requirements.

## Additional printed parts

* [ ] **Additional parts printed:** The [parts normally included with a kit](/open-task-light/self-sourcing-guide/additional-printed-parts.md) are printed for your chosen build.
* [ ] **Prints cleaned:** Support material has been removed, and the parts are ready to use.

## Custom manufactured parts

* [ ] **Metal parts ready:** You have the [aluminum heat pipe top plate](/open-task-light/self-sourcing-guide/custom-manufactured-parts/aluminum-heat-pipe-top-plate.md) and [copper LED bracket](/open-task-light/self-sourcing-guide/custom-manufactured-parts/copper-led-bracket.md).
* [ ] **Control Board assembled:** The components are installed, and the through-hole posts on the underside have been [trimmed](/open-task-light/self-sourcing-guide/custom-manufactured-parts/control-board.md#post-processing).
* [ ] **Power Link assembled:** All eight contacts and both printed insulators are installed, and the two conductors have been checked for shorts as described in the [Power Link guide](/open-task-light/self-sourcing-guide/custom-manufactured-parts/power-link.md#assemble-the-contacts).
* [ ] **Both Power Tracks assembled:** Each track has its standoff and Micro-Lock connector soldered in place. If you used epoxy to secure the connectors, it has cured. See [Power Track preparation](/open-task-light/self-sourcing-guide/custom-manufactured-parts/power-track.md).
* [ ] **Parts inspected:** Each manufactured part matches its drawings or production files and has no obvious damage or defects.

## Controller and cables

* [ ] **QT Py programmed:** The bootloader and CircuitPython are installed, and the project's `code.py` and `lib` folder are on `CIRCUITPY`, following the [QT Py preparation guide](/open-task-light/self-sourcing-guide/manual-part-preparation/adafruit-qt-py-esp32-s2.md).
* [ ] **QT Py fitted:** Its headers are soldered, the plastic header insulators have been removed, the pins are trimmed, and the prepared QT Py is seated in the Control Board headers.
* [ ] **LED cable prepared:** The [LED cable](/open-task-light/self-sourcing-guide/manual-part-preparation/led-cable-assembly.md) is cut to length, each wire end is stripped and tinned, and the positive wire is marked.
* [ ] **Base power cable assembled:** The cable for your [clamping](/open-task-light/self-sourcing-guide/manual-part-preparation/clamping-base-power-cable-assembly.md) or [freestanding](/open-task-light/self-sourcing-guide/manual-part-preparation/freestanding-base-power-cable-assembly.md) base is complete.
* [ ] **Cables checked:** Each cable's polarity matches its own preparation guide. With the cables disconnected from the power supply and electronics, a multimeter check confirmed continuity along each wire and no continuity between the positive and negative wires.

## Mechanical preparation

* [ ] **Belt cut:** The [GT2 timing belt](/open-task-light/self-sourcing-guide/manual-part-preparation/gt2-timing-belt.md) is cut to its finished length.
* [ ] **Rails tapped:** All rail ends are threaded to the depths in the [rail preparation guide](/open-task-light/self-sourcing-guide/manual-part-preparation/v-slot-rail.md#tap-the-rail-ends), and the bottom of the vertical rail is marked.
* [ ] **Heat pipe ready:** The heat pipe is bonded into the horizontal rail, the adhesive has cured for the time specified in the [installation instructions](/open-task-light/self-sourcing-guide/manual-part-preparation/v-slot-rail.md#install-the-heat-pipe), and the clamps have been removed.
* [ ] **Turntable bearing prepared (freestanding only):** The mounting holes have been bored as shown in the [bearing preparation guide](/open-task-light/self-sourcing-guide/manual-part-preparation/turntable-bearing.md). Skip this for the clamping base.

## Ready for the next step

* [ ] **Tools ready:** You have the [tools and supplies](/open-task-light/start-here/tools-youll-need.md) for the rest of the build.

Once every applicable item is checked, continue to the [Printing Guide](/open-task-light/printing-guide.md) to print the main lamp parts. If those parts are already printed and cleaned up, you're ready for the [Assembly Guide](/open-task-light/assembly-guide.md).
