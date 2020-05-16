import { strfmt } from "../strformat/strformat.ts";
/**
 * The eight basic colors supported by most terminals.
 */
export enum TermColors {
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
  fore?: TermColors;
  back?: TermColors;
}

function instanceOfColorSet(a: any): a is ColorSet {
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
    let fore = colors.fore ? this.baseColors[colors.fore] : "";
    let back = colors.back
      ? ";" + this.toBackground(this.baseColors[colors.back])
      : "";
    return [fore, back];
  }

  private rgbForeground(rgbStr: string): string {
    let rgbSanitized = rgbStr.replace(/\s/g, "");
    let rgb = rgbSanitized.split(",");
    return `38;2;${rgb[0]};${rgb[1]};${rgb[2]}`;
  }

  /**
   * Adds the colors specified by `color` to `text`'s foreground.
   * @param text The string you want to add color to.
   * @param color One of the 8 portable ANSI colors.
   * @returns A string representing `text` with the specified color added.
   */
  public colorize(text: string, color: TermColors): string;

  /**
   * Adds the colors specified in `colorSet` to `text`.
   * @param text The string you want to add color to.
   * @param colorSpecifier Config object with optional properties that specifies which colors to add.
   *                      - `fore`: the foreground color, i.e. the color of the actual text
   *                      - `back`: the background color
   * @returns A string representing `text` with the specified color(s) added.
   */
  public colorize(text: string, colors: ColorSet): string;

  public colorize(text: string, colorSpecifier: any): string {
    if (instanceOfColorSet(colorSpecifier)) {
      let foreBack = this.parseColorSet(colorSpecifier);
      return strfmt(this.fmtFrontAndBack, foreBack[0], foreBack[1], text);
    }

    let colorToAdd = this.baseColors[colorSpecifier];
    return strfmt(this.fmtFront, colorToAdd, text);
  }

  /**
   * Adds the RGB color specified to `text` if 
   * @param text The string to colorize
   * @param rgbValues An RGB in the format `"<red>,<green>,<blue>"`
   * @returns A string representing `text` with the specified color added.
   */
  public colorizeRGB(text: string, rgbValues: string): string {
    let fore = this.rgbForeground(rgbValues);
    return strfmt(this.fmtFront, fore, text);
  }
}
