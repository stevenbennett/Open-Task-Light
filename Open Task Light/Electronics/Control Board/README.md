# Control Board PCB

The Control Board is the primary electronics PCB for the Open Task Light.

For fabrication details, required parts, and assembly instructions, see the [Control Board section of the Open Task Light assembly guide](https://open-task-light.gitbook.io/open-task-light/self-sourcing-guide/custom-manufactured-parts/control-board).

## Files

- `control-board-gerbers.zip` contains the Gerber, solder-mask, solder-paste, silkscreen, board-profile, and drill files required to order the bare PCB.
- `Source/Control Board.brd` and `Source/Control Board.sch` are the editable Autodesk Fusion Electronics source files.
- `Assembly/control-board-bom.csv` is the Fusion Electronics BOM for the components installed on the PCB.
- `Assembly/PnP_Control Board_front.csv` and `Assembly/PnP_Control Board_back.csv` are the front- and back-side pick-and-place exports from Fusion Electronics.

## Manufacturing notes

Upload the Gerber ZIP when ordering the bare PCB. If using an assembly service, you may need to reformat the BOM and placement files to meet the manufacturer's requirements.

The Adafruit QT Py ESP32-S2 is sourced separately and plugs into the headers after the Control Board is assembled. Confirm the board outline, holes, component positions, board sides, rotations, and component polarity in the manufacturer's preview before ordering.
