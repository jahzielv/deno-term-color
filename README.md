# TermColorizer

![](https://github.com/jahzielv/deno-term-color/workflows/CI/badge.svg)

## About

TermColorizer adds colors to your terminal output! 🎨 Find it at https://deno.land/x/termcolorizer@master/termcolorizer.ts.

Some definitions:

-   "Foreground": the color of the actual text itself.
-   "Background": the background color of the text.

The `TermColorizer` object has a `colorize` method which takes a string
and a color specifier for that string. This color specifier can take
several forms: it can be a single `AnsiColor`, an RGB string, or
a `ColorSet` object that specifies the foreground and/or background colors.

`AnsiColor` is an enum that defines the 8 basic ANSI colors. Use these
if you want the greatest portability across shells/terminal emulators.
Most modern terminals support RGB color though!

RGB strings are strings with three decimal numbers separated by commas, like so: "123, 456, 789"
`TermColorizer` will strip the strings of whitespace, so spaces are allowed
in RGB strings.

In a `ColorSet` object, you can mix and match RGB strings and `AnsiColor` values.
This means that you could use an object like this:

```javascript
{
  fore: "123, 456, 789",
  back: AnsiColors.Red
}
```

Both properties are optional.

If you pass in just an RGB string or just an `AnsiColor`, `colorize` will default
to using that as a foreground color.

## Usage

```typescript
import {
    TermColorizer,
    AnsiColors,
} from "https://deno.land/x/termcolorizer@master/termcolorizer.ts";

const tc = new TermColorizer();

let green = tc.colorize("green text", AnsiColors.Green); // green foreground
let redAndWhite = tc.colorize("red foreground, white background", {
    fore: AnsiColors.Red,
    back: AnsiColors.White,
});
let solarizedViolet = tc.colorize("solarized violet", "108,113,196"); // solarized violet foreground
```

## Current functionality

-   Standard 8 ANSI colors
-   RGB support

## Goals

-   [x] Testing
-   [ ] Accept hex input
-   [ ] Executable that can accept piped input
-   [ ] Detect terminal color range
-   [ ] Multicolored words
