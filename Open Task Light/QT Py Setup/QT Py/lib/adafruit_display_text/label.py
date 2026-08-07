# SPDX-FileCopyrightText: 2019 Scott Shawcroft for Adafruit Industries
#
# SPDX-License-Identifier: MIT

"""
`adafruit_display_text.label`
====================================================

Displays text labels using CircuitPython's displayio.

* Author(s): Scott Shawcroft

Implementation Notes
--------------------

**Hardware:**

**Software and Dependencies:**

* Adafruit CircuitPython firmware for the supported boards:
  https://circuitpython.org/downloads

"""

__version__ = "0.0.0+auto.0"
__repo__ = "https://github.com/adafruit/Adafruit_CircuitPython_Display_Text.git"


from displayio import Bitmap, Palette, TileGrid

from adafruit_display_text import LabelBase

try:
    from typing import Optional, Tuple

    from fontio import FontProtocol
except ImportError:
    pass


class Label(LabelBase):
    """A label displaying a string of text. The origin point set by ``x`` and ``y``
    properties will be the left edge of the bounding box, and in the center of a M
    glyph (if its one line), or the (number of lines * linespacing + M)/2. That is,
    it will try to have it be center-left as close as possible.

    :param font: A font class that has ``get_bounding_box`` and ``get_glyph``.
      Must include a capital M for measuring character size.
    :type font: ~fontio.FontProtocol
    :param str text: Text to display
    :param int|Tuple(int, int, int) color: Color of all text in HEX or RGB
    :param int|Tuple(int, int, int)|None background_color: Color of the background, use `None`
     for transparent
    :param float line_spacing: Line spacing of text to display
    :param bool background_tight: Set `True` only if you want background box to tightly
     surround text. When set to 'True' Padding parameters will be ignored.
    :param int padding_top: Additional pixels added to background bounding box at top.
     This parameter could be negative indicating additional pixels subtracted from the
     background bounding box.
    :param int padding_bottom: Additional pixels added to background bounding box at bottom.
     This parameter could be negative indicating additional pixels subtracted from the
     background bounding box.
    :param int padding_left: Additional pixels added to background bounding box at left.
     This parameter could be negative indicating additional pixels subtracted from the
     background bounding box.
    :param int padding_right: Additional pixels added to background bounding box at right.
     This parameter could be negative indicating additional pixels subtracted from the
     background bounding box.
    :param Tuple(float, float) anchor_point: Point that anchored_position moves relative to.
     Tuple with decimal percentage of width and height.
     (E.g. (0,0) is top left, (1.0, 0.5): is middle right.)
    :param Tuple(int, int) anchored_position: Position relative to the anchor_point. Tuple
     containing x,y pixel coordinates.
    :param int scale: Integer value of the pixel scaling
    :param bool base_alignment: when True allows to align text label to the baseline.
     This is helpful when two or more labels need to be aligned to the same baseline
    :param Tuple(int, str) tab_replacement: tuple with tab character replace information. When
     (4, " ") will indicate a tab replacement of 4 spaces, defaults to 4 spaces by
     tab character
    :param str label_direction: string defining the label text orientation. There are 5
     configurations possibles ``LTR``-Left-To-Right ``RTL``-Right-To-Left
     ``TTB``-Top-To-Bottom ``UPR``-Upwards ``DWR``-Downwards. It defaults to ``LTR``"""

    def __init__(self, font: FontProtocol, **kwargs) -> None:
        self._background_palette = Palette(1)
        self._added_background_tilegrid = False

        super().__init__(font, **kwargs)

        text = self._replace_tabs(self._text)

        self._width = len(text)
        self._height = self._font.get_bounding_box()[1]

        # Create the two-color text palette
        self._palette[0] = 0
        self._palette.make_transparent(0)

        if text is not None:
            self._reset_text(str(text))

    def _create_background_box(self, lines: int, y_offset: int) -> TileGrid:
        """Private Class function to create a background_box
        :param lines: int number of lines
        :param y_offset: int y pixel bottom coordinate for the background_box"""

        left = self._bounding_box[0]
        if self._background_tight:  # draw a tight bounding box
            box_width = self._bounding_box[2]
            box_height = self._bounding_box[3]
            x_box_offset = 0
            y_box_offset = self._bounding_box[1]

        else:  # draw a "loose" bounding box to include any ascenders/descenders.
            ascent, descent = self._ascent, self._descent

            if self._label_direction in {"DWR", "UPR"}:
                box_height = self._bounding_box[3] + self._padding_right + self._padding_left
                x_box_offset = -self._padding_left
                box_width = (
                    (ascent + descent)
                    + int((lines - 1) * self._width * self._line_spacing)
                    + self._padding_top
                    + self._padding_bottom
                )
            elif self._label_direction == "TTB":
                box_height = self._bounding_box[3] + self._padding_top + self._padding_bottom
                x_box_offset = -self._padding_left
                box_width = (
                    (ascent + descent)
                    + int((lines - 1) * self._height * self._line_spacing)
                    + self._padding_right
                    + self._padding_left
                )
            else:
                box_width = self._bounding_box[2] + self._padding_left + self._padding_right
                x_box_offset = -self._padding_left
                box_height = (
                    (ascent + descent)
                    + int((lines - 1) * self._height * self._line_spacing)
                    + self._padding_top
                    + self._padding_bottom
                )

            if self._label_direction == "DWR":
                padding_to_use = self._padding_bottom
            elif self._label_direction == "TTB":
                padding_to_use = self._padding_top
                y_offset = 0
                ascent = 0
            else:
                padding_to_use = self._padding_top

            if self._base_alignment:
                y_box_offset = -ascent - padding_to_use
            else:
                y_box_offset = -ascent + y_offset - padding_to_use

        box_width = max(0, box_width)  # remove any negative values
        box_height = max(0, box_height)  # remove any negative values

        if self._label_direction == "UPR":
            movx = y_box_offset
            movy = -box_height - x_box_offset
        elif self._label_direction == "DWR":
            movx = y_box_offset
            movy = x_box_offset
        elif self._label_direction == "TTB":
            movx = x_box_offset
            movy = y_box_offset
        else:
            movx = left + x_box_offset
            movy = y_box_offset

        background_bitmap = Bitmap(box_width, box_height, 1)
        tile_grid = TileGrid(
            background_bitmap,
            pixel_shader=self._background_palette,
            x=movx,
            y=movy,
        )

        return tile_grid

    def _set_background_color(self, new_color: Optional[int]) -> None:
        """Private class function that allows updating the font box background color

        :param int new_color: Color as an RGB hex number, setting to None makes it transparent
        """

        if new_color is None:
            self._background_palette.make_transparent(0)
            if self._added_background_tilegrid:
                self._local_group.pop(0)
                self._added_background_tilegrid = False
        else:
            self._background_palette.make_opaque(0)
            self._background_palette[0] = new_color
        self._background_color = new_color

        lines = self._text.rstrip("\n").count("\n") + 1
        y_offset = self._ascent // 2

        if self._bounding_box is None:
            # Still in initialization
            return

        if not self._added_background_tilegrid:  # no bitmap is in the self Group
            # add bitmap if text is present and bitmap sizes > 0 pixels
            if (
                (len(self._text) > 0)
                and (self._bounding_box[2] + self._padding_left + self._padding_right > 0)
                and (self._bounding_box[3] + self._padding_top + self._padding_bottom > 0)
            ):
                self._local_group.insert(0, self._create_background_box(lines, y_offset))
                self._added_background_tilegrid = True

        elif (
            (len(self._text) > 0)
            and (self._bounding_box[2] + self._padding_left + self._padding_right > 0)
            and (self._bounding_box[3] + self._padding_top + self._padding_bottom > 0)
        ):
            self._local_group[0] = self._create_background_box(lines, self._y_offset)
        else:  # delete the existing bitmap
            self._local_group.pop(0)
            self._added_background_tilegrid = False

    def _update_text(self, new_text: str) -> None:
        x = 0
        y = 0
        if self._added_background_tilegrid:
            i = 1
        else:
            i = 0
        tilegrid_count = i
        if self._base_alignment:
            self._y_offset = 0
        else:
            self._y_offset = self._ascent // 2

        if self._label_direction == "RTL":
            left = top = bottom = 0
            right = None
        elif self._label_direction == "LTR":
            right = top = bottom = 0
            left = None
        else:
            top = right = left = 0
            bottom = 0

        for character in new_text:
            if character == "\n":
                y += int(self._height * self._line_spacing)
                x = 0
                continue
            glyph = self._font.get_glyph(ord(character))
            if not glyph:
                continue

            position_x, position_y = 0, 0

            if self._label_direction in {"LTR", "RTL"}:
                bottom = max(bottom, y - glyph.dy + self._y_offset)
                if y == 0:  # first line, find the Ascender height
                    top = min(top, -glyph.height - glyph.dy + self._y_offset)
                position_y = y - glyph.height - glyph.dy + self._y_offset

                if self._label_direction == "LTR":
                    right = max(right, x + glyph.shift_x, x + glyph.width + glyph.dx)
                    if x == 0:
                        if left is None:
                            left = 0
                        else:
                            left = min(left, glyph.dx)
                    position_x = x + glyph.dx
                else:
                    left = max(left, abs(x) + glyph.shift_x, abs(x) + glyph.width + glyph.dx)
                    if x == 0:
                        if right is None:
                            right = 0
                        else:
                            right = max(right, glyph.dx)
                    position_x = x - glyph.width

            elif self._label_direction == "TTB":
                if x == 0:
                    if left is None:
                        left = 0
                    else:
                        left = min(left, glyph.dx)
                if y == 0:
                    top = min(top, -glyph.dy)

                bottom = max(bottom, y + glyph.height, y + glyph.height + glyph.dy)
                right = max(right, x + glyph.width + glyph.dx, x + glyph.shift_x + glyph.dx)
                position_y = y + glyph.dy
                position_x = x - glyph.width // 2 + self._y_offset

            elif self._label_direction == "UPR":
                if x == 0:
                    if bottom is None:
                        bottom = -glyph.dx

                if y == 0:  # first line, find the Ascender height
                    bottom = min(bottom, -glyph.dy)
                left = min(left, x - glyph.height + self._y_offset)
                top = min(top, y - glyph.width - glyph.dx, y - glyph.shift_x)
                right = max(right, x + glyph.height, x + glyph.height - glyph.dy)
                position_y = y - glyph.width - glyph.dx
                position_x = x - glyph.height - glyph.dy + self._y_offset

            elif self._label_direction == "DWR":
                if y == 0:
                    if top is None:
                        top = -glyph.dx
                top = min(top, -glyph.dx)
                if x == 0:
                    left = min(left, -glyph.dy)
                left = min(left, x, x - glyph.dy - self._y_offset)
                bottom = max(bottom, y + glyph.width + glyph.dx, y + glyph.shift_x)
                right = max(right, x + glyph.height)
                position_y = y + glyph.dx
                position_x = x + glyph.dy - self._y_offset

            if glyph.width > 0 and glyph.height > 0:
                face = TileGrid(
                    glyph.bitmap,
                    pixel_shader=self._palette,
                    default_tile=glyph.tile_index,
                    tile_width=glyph.width,
                    tile_height=glyph.height,
                    x=position_x,
                    y=position_y,
                )

                if self._label_direction == "UPR":
                    face.transpose_xy = True
                    face.flip_x = True
                if self._label_direction == "DWR":
                    face.transpose_xy = True
                    face.flip_y = True

                if tilegrid_count < len(self._local_group):
                    self._local_group[tilegrid_count] = face
                else:
                    self._local_group.append(face)
                tilegrid_count += 1

            if self._label_direction == "RTL":
                x = x - glyph.shift_x
            if self._label_direction == "TTB":
                if glyph.height < 2:
                    y = y + glyph.shift_x
                else:
                    y = y + glyph.height + 1
            if self._label_direction == "UPR":
                y = y - glyph.shift_x
            if self._label_direction == "DWR":
                y = y + glyph.shift_x
            if self._label_direction == "LTR":
                x = x + glyph.shift_x

            i += 1

        if self._label_direction == "LTR" and left is None:
            left = 0
        if self._label_direction == "RTL" and right is None:
            right = 0
        if self._label_direction == "TTB" and top is None:
            top = 0

        while len(self._local_group) > tilegrid_count:  # i:
            self._local_group.pop()

        if self._label_direction == "RTL":
            # type-checkers think left can be None
            self._bounding_box = (-left, top, left - right, bottom - top)
        if self._label_direction == "TTB":
            self._bounding_box = (left, top, right - left, bottom - top)
        if self._label_direction == "UPR":
            self._bounding_box = (left, top, right, bottom - top)
        if self._label_direction == "DWR":
            self._bounding_box = (left, top, right, bottom - top)
        if self._label_direction == "LTR":
            self._bounding_box = (left, top, right - left, bottom - top)

        self._text = new_text

        if self._background_color is not None:
            self._set_background_color(self._background_color)

    def _reset_text(self, new_text: str) -> None:
        current_anchored_position = self.anchored_position
        self._update_text(str(self._replace_tabs(new_text)))
        self.anchored_position = current_anchored_position

    def _set_font(self, new_font: FontProtocol) -> None:
        old_text = self._text
        current_anchored_position = self.anchored_position
        self._text = ""
        self._font = new_font
        self._height = self._font.get_bounding_box()[1]
        self._update_text(str(old_text))
        self.anchored_position = current_anchored_position

    def _set_line_spacing(self, new_line_spacing: float) -> None:
        self._line_spacing = new_line_spacing
        self.text = self._text  # redraw the box

    def _set_text(self, new_text: str, scale: int) -> None:
        self._reset_text(new_text)

    def _set_label_direction(self, new_label_direction: str) -> None:
        self._label_direction = new_label_direction
        self._update_text(str(self._text))

    def _get_valid_label_directions(self) -> Tuple[str, ...]:
        return "LTR", "RTL", "UPR", "DWR", "TTB"
