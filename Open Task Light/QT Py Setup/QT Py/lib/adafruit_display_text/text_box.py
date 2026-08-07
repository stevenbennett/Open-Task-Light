# SPDX-FileCopyrightText: 2024 Tim Cocks for Adafruit Industries
#
# SPDX-License-Identifier: MIT

"""
`adafruit_display_text.text_box`
================================================================================

Text graphics handling for CircuitPython, including text boxes


* Author(s): Tim Cocks

Implementation Notes
--------------------

**Hardware:**

**Software and Dependencies:**

* Adafruit CircuitPython firmware for the supported boards:
  https://circuitpython.org/downloads

"""

__version__ = "0.0.0+auto.0"
__repo__ = "https://github.com/adafruit/Adafruit_CircuitPython_Display_Text.git"

import displayio
from micropython import const

from adafruit_display_text import bitmap_label, wrap_text_to_pixels

try:
    from typing import Optional, Tuple

    from fontio import FontProtocol
except ImportError:
    pass


class TextBox(bitmap_label.Label):
    """
    TextBox has a constrained width and optionally height.
    You set the desired size when it's initialized it
    will automatically wrap text to fit it within the allotted
    size.

    Left, Right, and Center alignment of the text within the
    box are supported.

    :param font: The font to use for the TextBox.
    :param width: The width of the TextBox in pixels.
    :param height: The height of the TextBox in pixels.
    :param align: How to align the text within the box,
      valid values are ``ALIGN_LEFT``, ``ALIGN_CENTER``, ``ALIGN_RIGHT``.
    """

    ALIGN_LEFT = const(0)
    ALIGN_CENTER = const(1)
    ALIGN_RIGHT = const(2)

    DYNAMIC_HEIGHT = const(-1)

    def __init__(
        self, font: FontProtocol, width: int, height: int, align=ALIGN_LEFT, **kwargs
    ) -> None:
        self._bitmap = None
        self._tilegrid = None
        self._prev_label_direction = None
        self._width = width

        if height != TextBox.DYNAMIC_HEIGHT:
            self._height = height
            self.dynamic_height = False
        else:
            self.dynamic_height = True

        if align not in {TextBox.ALIGN_LEFT, TextBox.ALIGN_CENTER, TextBox.ALIGN_RIGHT}:
            raise ValueError("Align must be one of: ALIGN_LEFT, ALIGN_CENTER, ALIGN_RIGHT")
        self._align = align

        self._padding_left = kwargs.get("padding_left", 0)
        self._padding_right = kwargs.get("padding_right", 0)

        self.lines = wrap_text_to_pixels(
            kwargs.get("text", ""),
            self._width - self._padding_left - self._padding_right,
            font,
        )

        super(bitmap_label.Label, self).__init__(font, **kwargs)

        self._text = "\n".join(self.lines)
        self._text = self._replace_tabs(self._text)
        self._original_text = self._text

        # call the text updater with all the arguments.
        self._reset_text(
            font=font,
            text=self._text,
            line_spacing=self._line_spacing,
            scale=self.scale,
        )

    def _place_text(
        self,
        bitmap: displayio.Bitmap,
        text: str,
        font: FontProtocol,
        xposition: int,
        yposition: int,
        skip_index: int = 0,  # set to None to write all pixels, other wise skip this palette index
        # when copying glyph bitmaps (this is important for slanted text
        # where rectangular glyph boxes overlap)
    ) -> Tuple[int, int, int, int]:
        # placeText - Writes text into a bitmap at the specified location.
        #
        # Note: scale is pushed up to Group level
        original_xposition = xposition
        cur_line_index = 0
        cur_line_width = self._text_bounding_box(self.lines[0], self.font)[0]

        if self.align == self.ALIGN_LEFT:
            x_start = original_xposition  # starting x position (left margin)
        if self.align == self.ALIGN_CENTER:
            unused_space = self._width - cur_line_width
            x_start = original_xposition + unused_space // 2
        if self.align == self.ALIGN_RIGHT:
            unused_space = self._width - cur_line_width
            x_start = original_xposition + unused_space - self._padding_right

        xposition = x_start

        y_start = yposition

        left = None
        right = x_start
        top = bottom = y_start
        line_spacing = self._line_spacing

        for char in text:
            if char == "\n":  # newline
                cur_line_index += 1
                cur_line_width = self._text_bounding_box(self.lines[cur_line_index], self.font)[0]
                if self.align == self.ALIGN_LEFT:
                    x_start = original_xposition  # starting x position (left margin)
                if self.align == self.ALIGN_CENTER:
                    unused_space = self._width - cur_line_width
                    x_start = original_xposition + unused_space // 2
                if self.align == self.ALIGN_RIGHT:
                    unused_space = self._width - cur_line_width
                    x_start = original_xposition + unused_space - self._padding_right
                xposition = x_start

                yposition = yposition + self._line_spacing_ypixels(
                    font, line_spacing
                )  # Add a newline

            else:
                my_glyph = font.get_glyph(ord(char))

                if my_glyph is None:  # Error checking: no glyph found
                    print(f"Glyph not found: {repr(char)}")
                else:
                    if xposition == x_start:
                        if left is None:
                            left = 0
                        else:
                            left = min(left, my_glyph.dx)

                    right = max(
                        right,
                        xposition + my_glyph.shift_x,
                        xposition + my_glyph.width + my_glyph.dx,
                    )
                    if yposition == y_start:  # first line, find the Ascender height
                        top = min(top, -my_glyph.height - my_glyph.dy)
                    bottom = max(bottom, yposition - my_glyph.dy)

                    glyph_offset_x = (
                        my_glyph.tile_index * my_glyph.width
                    )  # for type BuiltinFont, this creates the x-offset in the glyph bitmap.
                    # for BDF loaded fonts, this should equal 0

                    y_blit_target = yposition - my_glyph.height - my_glyph.dy

                    # Clip glyph y-direction if outside the font ascent/descent metrics.
                    # Note: bitmap.blit will automatically clip the bottom of the glyph.
                    y_clip = 0
                    if y_blit_target < 0:
                        y_clip = -y_blit_target  # clip this amount from top of bitmap
                        y_blit_target = 0  # draw the clipped bitmap at y=0
                        if self._verbose:
                            print(f'Warning: Glyph clipped, exceeds Ascent property: "{char}"')

                    if (y_blit_target + my_glyph.height) > bitmap.height:
                        if self._verbose:
                            print(f'Warning: Glyph clipped, exceeds descent property: "{char}"')
                    try:
                        self._blit(
                            bitmap,
                            max(xposition + my_glyph.dx, 0),
                            y_blit_target,
                            my_glyph.bitmap,
                            x_1=glyph_offset_x,
                            y_1=y_clip,
                            x_2=glyph_offset_x + my_glyph.width,
                            y_2=my_glyph.height,
                            skip_index=skip_index,  # do not copy over any 0 background pixels
                        )
                    except ValueError:
                        # ignore index out of bounds error
                        break

                    xposition = xposition + my_glyph.shift_x

        # bounding_box
        return left, top, right - left, bottom - top

    def _reset_text(
        self,
        font: Optional[FontProtocol] = None,
        text: Optional[str] = None,
        line_spacing: Optional[float] = None,
        scale: Optional[int] = None,
    ) -> None:
        # Store all the instance variables
        if font is not None:
            self._font = font
        if line_spacing is not None:
            self._line_spacing = line_spacing

        # if text is not provided as a parameter (text is None), use the previous value.
        if text is None:
            text = self._text

        self._text = self._replace_tabs(text)

        # Check for empty string
        if (not text) or (
            text is None
        ):  # If empty string, just create a zero-sized bounding box and that's it.
            self._bounding_box = (
                0,
                0,
                0,  # zero width with text == ""
                0,  # zero height with text == ""
            )
            # Clear out any items in the self._local_group Group, in case this is an
            # update to the bitmap_label
            for _ in self._local_group:
                self._local_group.pop(0)

            # Free the bitmap and tilegrid since they are removed
            self._bitmap = None
            self._tilegrid = None

        else:  # The text string is not empty, so create the Bitmap and TileGrid and
            # append to the self Group

            # Calculate the text bounding box

            # Calculate both "tight" and "loose" bounding box dimensions to match label for
            # anchor_position calculations
            (
                box_x,  # noqa: F841, var assigned not used
                tight_box_y,
                x_offset,
                tight_y_offset,
                loose_box_y,
                loose_y_offset,
            ) = self._text_bounding_box(
                text,
                self._font,
            )  # calculate the box size for a tight and loose backgrounds

            if self._background_tight:
                box_y = tight_box_y
                y_offset = tight_y_offset
                self._padding_left = 0
                self._padding_right = 0
                self._padding_top = 0
                self._padding_bottom = 0

            else:  # calculate the box size for a loose background
                box_y = loose_box_y
                y_offset = loose_y_offset

            # Calculate the background size including padding
            box_y = box_y + self._padding_top + self._padding_bottom

            if self.dynamic_height:
                self._height = box_y

            # Create the Bitmap unless it can be reused
            new_bitmap = None
            if (
                self._bitmap is None
                or self._bitmap.width != self._width
                or self._bitmap.height != self._height
            ):
                new_bitmap = displayio.Bitmap(self._width, self._height, len(self._palette))
                self._bitmap = new_bitmap
            else:
                self._bitmap.fill(0)

            # Place the text into the Bitmap
            self._place_text(
                self._bitmap,
                text,
                self._font,
                self._padding_left - x_offset,
                self._padding_top + y_offset,
            )

            if self._base_alignment:
                label_position_yoffset = 0
            else:
                label_position_yoffset = self._ascent // 2

            # Create the TileGrid if not created bitmap unchanged
            if self._tilegrid is None or new_bitmap:
                self._tilegrid = displayio.TileGrid(
                    self._bitmap,
                    pixel_shader=self._palette,
                    width=1,
                    height=1,
                    tile_width=self._width,
                    tile_height=self._height,
                    default_tile=0,
                    x=-self._padding_left + x_offset,
                    y=label_position_yoffset - y_offset - self._padding_top,
                )
                # Clear out any items in the local_group Group, in case this is an update to
                # the bitmap_label
                for _ in self._local_group:
                    self._local_group.pop(0)
                self._local_group.append(self._tilegrid)  # add the bitmap's tilegrid to the group

            self._bounding_box = (
                self._tilegrid.x + self._padding_left,
                self._tilegrid.y + self._padding_top,
                self.width,
                self.height,
            )

        if (
            scale is not None
        ):  # Scale will be defined in local_group (Note: self should have scale=1)
            self.scale = scale  # call the setter

        # set the anchored_position with setter after bitmap is created, sets the
        # x,y positions of the label
        self.anchored_position = self._anchored_position

    @property
    def height(self) -> int:
        """The height of the label determined from the bounding box."""
        return self._height

    @property
    def width(self) -> int:
        """The width of the label determined from the bounding box."""
        return self._width

    @width.setter
    def width(self, width: int) -> None:
        self._width = width
        self.text = self._text

    @height.setter
    def height(self, height: int) -> None:
        if height != TextBox.DYNAMIC_HEIGHT:
            self._height = height
            self.dynamic_height = False
        else:
            self.dynamic_height = True
        self.text = self._text

    @bitmap_label.Label.text.setter
    def text(self, text: str) -> None:
        self.lines = wrap_text_to_pixels(
            text, self._width - self._padding_left - self._padding_right, self.font
        )
        self._text = self._replace_tabs(text)
        self._original_text = self._text
        self._text = "\n".join(self.lines)

        self._set_text(self._text, self.scale)

    @property
    def align(self):
        """Alignment of the text within the TextBox"""
        return self._align

    @align.setter
    def align(self, align: int) -> None:
        if align not in {TextBox.ALIGN_LEFT, TextBox.ALIGN_CENTER, TextBox.ALIGN_RIGHT}:
            raise ValueError("Align must be one of: ALIGN_LEFT, ALIGN_CENTER, ALIGN_RIGHT")
        self._align = align
