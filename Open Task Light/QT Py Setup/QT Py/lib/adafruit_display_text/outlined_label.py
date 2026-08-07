# SPDX-FileCopyrightText: 2023 Tim C
#
# SPDX-License-Identifier: MIT

"""
`adafruit_display_text.outlined_label`
====================================================

Subclass of BitmapLabel that adds outline color and stroke size
functionalities.

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

import bitmaptools
from displayio import Bitmap, Palette

from adafruit_display_text import bitmap_label

try:
    from typing import Optional, Tuple, Union

    from fontio import FontProtocol
except ImportError:
    pass


class OutlinedLabel(bitmap_label.Label):
    """
    OutlinedLabel - A BitmapLabel subclass that includes arguments and properties for specifying
    outline_size and outline_color to get drawn as a stroke around the text.

    :param Union[Tuple, int] outline_color: The color of the outline stroke as RGB tuple, or hex.
    :param int outline_size: The size in pixels of the outline stroke.

    """

    def __init__(
        self,
        font,
        outline_color: Union[int, Tuple] = 0x999999,
        outline_size: int = 1,
        padding_top: Optional[int] = None,
        padding_bottom: Optional[int] = None,
        padding_left: Optional[int] = None,
        padding_right: Optional[int] = None,
        **kwargs,
    ):
        if padding_top is None:
            padding_top = outline_size + 0
        if padding_bottom is None:
            padding_bottom = outline_size + 2
        if padding_left is None:
            padding_left = outline_size + 0
        if padding_right is None:
            padding_right = outline_size + 0

        super().__init__(
            font,
            padding_top=padding_top,
            padding_bottom=padding_bottom,
            padding_left=padding_left,
            padding_right=padding_right,
            **kwargs,
        )

        _background_color = self._palette[0]
        _foreground_color = self._palette[1]
        _background_is_transparent = self._palette.is_transparent(0)
        self._palette = Palette(3)
        self._palette[0] = _background_color
        self._palette[1] = _foreground_color
        self._palette[2] = outline_color
        if _background_is_transparent:
            self._palette.make_transparent(0)

        self._outline_size = outline_size
        self._stamp_source = Bitmap((outline_size * 2) + 1, (outline_size * 2) + 1, 3)
        self._stamp_source.fill(2)

        self._bitmap = None

        self._reset_text(
            font=font,
            text=self._text,
            line_spacing=self._line_spacing,
            scale=self.scale,
        )

    def _add_outline(self):
        """
        Blit the outline into the labels Bitmap. We will stamp self._stamp_source for each
        pixel of the foreground color but skip the foreground color when we blit.
        :return: None
        """
        if hasattr(self, "_stamp_source"):
            for y in range(self.bitmap.height):
                for x in range(self.bitmap.width):
                    if self.bitmap[x, y] == 1:
                        try:
                            bitmaptools.blit(
                                self.bitmap,
                                self._stamp_source,
                                x - self._outline_size,
                                y - self._outline_size,
                                skip_dest_index=1,
                            )
                        except ValueError as value_error:
                            raise ValueError(
                                "Padding must be big enough to fit outline_size "
                                "all the way around the text. "
                                "Try using either larger padding sizes, or smaller outline_size."
                            ) from value_error

    def _place_text(
        self,
        bitmap: Bitmap,
        text: str,
        font: FontProtocol,
        xposition: int,
        yposition: int,
        skip_index: int = 0,  # set to None to write all pixels, other wise skip this palette index
        # when copying glyph bitmaps (this is important for slanted text
        # where rectangular glyph boxes overlap)
    ) -> Tuple[int, int, int, int]:
        """
        Copy the glpyphs that represent the value of the string into the labels Bitmap.
        :param bitmap: The bitmap to place text into
        :param text: The text to render
        :param font: The font to render the text in
        :param xposition: x location of the starting point within the bitmap
        :param yposition: y location of the starting point within the bitmap
        :param skip_index: Color index to skip during rendering instead of covering up
        :return Tuple bounding_box: tuple with x, y, width, height values of the bitmap
        """
        parent_result = super()._place_text(
            bitmap, text, font, xposition, yposition, skip_index=skip_index
        )

        self._add_outline()

        return parent_result

    @property
    def outline_color(self):
        """Color of the outline to draw around the text."""
        return self._palette[2]

    @outline_color.setter
    def outline_color(self, new_outline_color):
        self._palette[2] = new_outline_color

    @property
    def outline_size(self):
        """Stroke size of the outline to draw around the text."""
        return self._outline_size

    @outline_size.setter
    def outline_size(self, new_outline_size):
        self._outline_size = new_outline_size

        self._padding_top = new_outline_size + 0
        self._padding_bottom = new_outline_size + 2
        self._padding_left = new_outline_size + 0
        self._padding_right = new_outline_size + 0

        self._stamp_source = Bitmap((new_outline_size * 2) + 1, (new_outline_size * 2) + 1, 3)
        self._stamp_source.fill(2)
        self._reset_text(
            font=self._font,
            text=self._text,
            line_spacing=self._line_spacing,
            scale=self.scale,
        )
