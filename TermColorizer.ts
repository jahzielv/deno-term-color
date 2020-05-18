import { strfmt } from "../strformat/strformat.ts";
/**
 * The eight basic colors supported by most terminals.
 */
export enum AnsiColors {
  Black,
  Red,
  Green,
  Yellow,
  Blue,
  Magenta,
  Cyan,
  White,
}

/**
 * Configures colors for a given string.
 */
interface ColorSet {
  fore?: AnsiColors | string;
  back?: AnsiColors | string;
}

function instanceOfAnsiColorSet(a: any): a is ColorSet {
  return a.fore;
}

/**
 * TermColorizer adds colors to your terminal output!
 */
export class TermColorizer {
  private ESC = "\u001b[";
  private RESET = `${this.ESC}39;49;m`;
  private END_COLORS = "m";
  /**
   * esc | color args fore | color args back | m | text | reset
   */
  private fmtFrontAndBack =
    `${this.ESC}{0}{1}${this.END_COLORS}{2}${this.RESET}`;
  private fmtFront = `${this.ESC}{0}${this.END_COLORS}{1}${this.RESET}`;

  private baseColors = [
    `30`,
    `31`,
    `32`,
    `33`,
    `34`,
    `35,`,
    `36`,
    `37`,
  ];
  constructor() {
  }

  private toBackground(color: string): string {
    let colorNum = parseInt(color) + 10;
    return colorNum.toString();
  }

  private parseColorSet(colors: ColorSet): [string, string] {
    let fore = "";
    let back = "";
    if (colors.fore) {
      // RGB color
      if (typeof colors.fore === "string") {
        fore = this.rgbForeground(colors.fore);
      } else {
        fore = this.baseColors[colors.fore];
      }
    }
    if (colors.back) {
      if (typeof colors.back === "string") {
        back = ";" + this.rgbBackground(colors.back);
      } else {
        back = ";" + this.toBackground(this.baseColors[colors.back]);
      }
    }
    return [fore, back];
  }

  private rgbForeground(rgbStr: string): string {
    let rgbSanitized = rgbStr.replace(/\s/g, "");
    let rgb = rgbSanitized.split(",");
    return `38;2;${rgb[0]};${rgb[1]};${rgb[2]}`;
  }

  private rgbBackground(rgbStr: string): string {
    let rgbSanitized = rgbStr.replace(/\s/g, "");
    let rgb = rgbSanitized.split(",");
    return `48;2;${rgb[0]};${rgb[1]};${rgb[2]}`;
  }

  /**
   * Adds the colors specified by `color` to `text`'s foreground.
   * @param text The string you want to add color to.
   * @param color One of the 8 portable ANSI colors.
   * @returns A string representing `text` with the specified color added.
   */
  public colorize(text: string, color: AnsiColors): string;

  /**
   * Adds the colors specified in `colorSet` to `text`.
   * @param text The string you want to add color to.
   * @param colorSpecifier Config object with optional properties that specifies which colors to add. `colorSpecifier` members can be either RGB strings or a `TermColors` value.
   *                      - `fore`: the foreground color, i.e. the color of the actual text
   *                      - `back`: the background color
   * @returns A string representing `text` with the specified color(s) added.
   */
  public colorize(text: string, colors: ColorSet): string;

  /**
   * Adds the RGB color specified by `color` to `text`'s foreground.
   * @param text The string you want to add color to.
   * @param color The RGB value for the color you want to add to `text`
   */
  public colorize(text: string, color: string): string;

  public colorize(text: string, colorSpecifier: any): string {
    if (instanceOfAnsiColorSet(colorSpecifier)) {
      let foreBack = this.parseColorSet(colorSpecifier);
      return strfmt(this.fmtFrontAndBack, foreBack[0], foreBack[1], text);
    }
    if (typeof colorSpecifier === "string") {
      return strfmt(this.fmtFront, this.rgbForeground(colorSpecifier), text);
    }

    let colorToAdd = this.baseColors[colorSpecifier];
    return strfmt(this.fmtFront, colorToAdd, text);
  }
}
