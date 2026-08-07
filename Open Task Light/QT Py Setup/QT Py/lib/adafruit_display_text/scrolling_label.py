# SPDX-FileCopyrightText: 2019 Scott Shawcroft for Adafruit Industries
#
# SPDX-License-Identifier: MIT

"""
`adafruit_display_text.scrolling_label`
====================================================

Displays text into a fixed-width label that scrolls leftward
if the full_text is large enough to need it.

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

import adafruit_ticks

from adafruit_display_text import bitmap_label

try:
    from typing import Optional

    from fontio import FontProtocol
except ImportError:
    pass


class ScrollingLabel(bitmap_label.Label):
    """ScrollingLabel - A fixed-width label that will scroll to the left
    in order to show the full text if it's larger than the fixed-width.

    :param font: The font to use for the label.
    :type: ~fontio.FontProtocol
    :param int max_characters: The number of characters that sets the fixed-width. Default is 10.
    :param str text: The full text to show in the label. If this is longer than
     ``max_characters`` then the label will scroll to show everything.
    :param float animate_time: The number of seconds in between scrolling animation
     frames. Default is 0.3 seconds.
    :param int current_index: The index of the first visible character in the label.
     Default is 0, the first character. Will increase while scrolling."""

    def __init__(
        self,
        font: FontProtocol,
        max_characters: int = 10,
        text: Optional[str] = "",
        animate_time: Optional[float] = 0.3,
        current_index: Optional[int] = 0,
        **kwargs,
    ) -> None:
        super().__init__(font, **kwargs)
        self.animate_time = animate_time
        self._current_index = current_index
        self._last_animate_time = -1
        self._max_characters = max_characters

        if text and text[-1] != " " and len(text) > max_characters:
            text = f"{text} "
        self._full_text = text

        self.update(True)

    def update(self, force: bool = False) -> None:
        """Attempt to update the display. If ``animate_time`` has elapsed since
        previews animation frame then move the characters over by 1 index.
        Must be called in the main loop of user code.

        :param bool force: whether to ignore ``animation_time`` and force the update.
         Default is False.
        :return: None
        """
        _now = adafruit_ticks.ticks_ms()
        if force or adafruit_ticks.ticks_less(
            self._last_animate_time + int(self.animate_time * 1000), _now
        ):
            if len(self.full_text) <= self.max_characters:
                if self._text != self.full_text:
                    super()._set_text(self.full_text, self.scale)
                self._last_animate_time = _now
                return

            if self.current_index + self.max_characters <= len(self.full_text):
                _showing_string = self.full_text[
                    self.current_index : self.current_index + self.max_characters
                ]
            else:
                _showing_string_start = self.full_text[self.current_index :]
                _showing_string_end = "{}".format(
                    self.full_text[
                        : (self.current_index + self.max_characters) % len(self.full_text)
                    ]
                )

                _showing_string = f"{_showing_string_start}{_showing_string_end}"
            super()._set_text(_showing_string, self.scale)
            self.current_index += 1
            self._last_animate_time = _now

            return

    @property
    def current_index(self) -> int:
        """Index of the first visible character.

        :return int: The current index
        """
        return self._current_index

    @current_index.setter
    def current_index(self, new_index: int) -> None:
        if self.full_text:
            self._current_index = new_index % len(self.full_text)
        else:
            self._current_index = 0

    @property
    def full_text(self) -> str:
        """The full text to be shown. If it's longer than ``max_characters`` then
        scrolling will occur as needed.

        :return str: The full text of this label.
        """
        return self._full_text

    @full_text.setter
    def full_text(self, new_text: str) -> None:
        if new_text and new_text[-1] != " " and len(new_text) > self.max_characters:
            new_text = f"{new_text} "
        if new_text != self._full_text:
            self._full_text = new_text
            self.current_index = 0
            self.update(True)

    @property
    def text(self):
        """The full text to be shown. If it's longer than ``max_characters`` then
        scrolling will occur as needed.

        :return str: The full text of this label.
        """
        return self.full_text

    @text.setter
    def text(self, new_text):
        self.full_text = new_text

    @property
    def max_characters(self):
        """The maximum number of characters to display on screen.

        :return int: The maximum character length of this label.
        """
        return self._max_characters

    @max_characters.setter
    def max_characters(self, new_max_characters):
        """Recalculate the full text based on the new max characters.

        This is necessary to correctly handle the potential space at the end of
        the text.
        """
        if new_max_characters != self._max_characters:
            self._max_characters = new_max_characters
            self.full_text = self.full_text
