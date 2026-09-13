# Power Link PCB

The Power Link is the two-conductor PCB that transfers power between the vertical and horizontal Power Tracks through the carriage.

For fabrication details, required parts, and assembly instructions, see the [Power Link section of the Open Task Light assembly guide](https://open-task-light.gitbook.io/open-task-light/self-sourcing-guide/custom-manufactured-parts/power-link).

## Files

- `power-link-gerbers.zip` contains the Gerber, solder-mask, solder-paste, board-profile, and drill files required to order the bare PCB.
- `Source/Power Link.brd` and `Source/Power Link.sch` are the editable Autodesk Fusion Electronics source files.
- `Assembly/power-link-bom.csv` is the Fusion Electronics BOM for the eight Mill-Max OmniBall spring-loaded contacts.
- `Assembly/PnP_Power Link_front.csv` and `Assembly/PnP_Power Link_back.csv` are the front- and back-side pick-and-place exports from Fusion Electronics.

## Manufacturing notes

Upload the Gerber ZIP when ordering the bare PCB. If using an assembly service, you may need to reformat the BOM and placement files to meet the manufacturer's requirements.

The OmniBall contacts are individual surface-mount parts and are best installed using a reflow process or professional assembly service. Confirm the board outline, holes, component positions, board sides, and rotations in the manufacturer's preview before ordering.
