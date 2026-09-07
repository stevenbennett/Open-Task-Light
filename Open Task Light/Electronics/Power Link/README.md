# Power Link PCB

The Power Link is a two-conductor PCB used in the Open Task Light carriage power connection.

For fabrication details, required parts, and assembly instructions, see the [Power Link guide](https://open-task-light.gitbook.io/open-task-light/self-sourcing-guide/custom-manufactured-parts/power-link) in the Open Task Light GitBook.

## Files

- `power-link-gerbers.zip` contains the Gerber, solder-mask, solder-paste, board-profile, and drill files required to order the bare PCB.
- `Source/Power Link.brd` and `Source/Power Link.sch` are the editable Autodesk Fusion Electronics source files.
- `Assembly/power-link-bom.csv` is the Fusion Electronics BOM for the eight Mill-Max spring-loaded contacts.
- `Assembly/PnP_Power Link Omniball_front.csv` and `Assembly/PnP_Power Link Omniball_back.csv` are the original top- and bottom-side pick-and-place exports from Fusion Electronics.

Upload the Gerber ZIP when ordering the bare PCB. For assembly services, provide the BOM and convert the Fusion placement exports to the manufacturer's required placement-file format. Confirm the board outline, holes, component positions, board sides, and rotations in the manufacturer's preview before ordering.
