/**
 * The eight basic colors supported by most terminals.
 */
export enum TermColorCodes {
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
  fore?: TermColorCodes;
  back?: TermColorCodes;
}

/**
 * TermColorizer adds colors to your terminal output!
 */
export class TermColorizer {
  private ColorCodes = { red: 31 };
  private ESC = "\u001b[";
  private RESET = `${this.ESC}39;49;m`;
  private END_COLORS = "m";
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

  private arrToColors(colors: ColorSet): string {
    //   this.colors.filter((e, i) => colors.includes(i)).join(";")
    let fore = colors.fore ? this.baseColors[colors.fore] : "";
    let back = colors.back
      ? ";" + this.toBackground(this.baseColors[colors.back])
      : "";

    return `${this.ESC}${fore}${back}${this.END_COLORS}`;
  }
  /**
   * Adds the colors specified in `colorSet` to `text`.
   * @param text The string you want to add color to
   * @param colorSet Config object that specifies what colors to add
   * - `fore`: the foreground color, i.e. the color of the actual text
   * - `back`: the background color
   * @returns A string representing `text` with the specified color(s) added.
   */
  public colorize(text: string, colorSet: ColorSet): string {
    return `${this.arrToColors(colorSet)}${text}${this.RESET}`;
  }

  /**
   * Adds the RGB color specified to `text` if 
   * @param text The string to colorize
   * @param rgbValues An RGB in the format `"<red>,<green>,<blue>"`
   * @returns A string representing `text` with the specified color added.
   */
  public colorizeRGB(text: string, rgbValues: string): string {
    let fore = this.rgbForeground(rgbValues);
    return `${this.ESC}${fore}${this.END_COLORS}${text}${this.RESET}`;
  }

  private rgbForeground(rgbStr: string): string {
    let rgbSanitized = rgbStr.replace(/\s/g, "");
    let rgb = rgbSanitized.split(",");
    return `38;2;${rgb[0]};${rgb[1]};${rgb[2]}`;
  }
}
