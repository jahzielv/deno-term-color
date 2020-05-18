import * as Testing from "https://deno.land/std/testing/asserts.ts";
import { TermColorizer, AnsiColors } from "./termcolorizer.ts";

const c = new TermColorizer();
const enc = new TextEncoder();
Deno.test({
  name: "ANSI Fore",
  fn: () => {
    let greenStr = c.colorize("green", AnsiColors.Green);
    console.log(greenStr);
    Testing.assertEquals(
      enc.encode(greenStr),
      enc.encode("\u001b[32mgreen\u001b[39;49;m"),
    );
  },
});

Deno.test({
  name: "ANSI Fore, ANSI Back",
  fn: () => {
    let redAndWhiteStr = c.colorize(
      "red and white",
      { fore: AnsiColors.Red, back: AnsiColors.White },
    );
    console.log(redAndWhiteStr);
    Testing.assertEquals(
      enc.encode(redAndWhiteStr),
      enc.encode("\u001b[31;47mred and white\u001b[39;49;m"),
    );
  },
});

Deno.test({
  name: "ANSI fore, RGB back",
  fn: () => {
    let str = c.colorize(
      "White front, Solarized violet back",
      { fore: AnsiColors.White, back: "108,113,196" },
    );
    console.log(str);
    Testing.assertEquals(
      enc.encode(str),
      enc.encode(
        "\u001b[37;48;2;108;113;196mWhite front, Solarized violet back\u001b[39;49;m",
      ),
    );
  },
});

Deno.test({
  name: "RGB fore",
  fn: () => {
    let str = c.colorize("Solarized orange", "203, 75, 22");
    console.log(str);
    Testing.assertEquals(
      enc.encode(str),
      enc.encode("\u001b[38;2;203;75;22mSolarized orange\u001b[39;49;m"),
    );
  },
});

Deno.test({
  name: "RGB fore, RGB back",
  fn: () => {
    let str = c.colorize(
      "Solarized orange, Base 3",
      { fore: "203, 75, 22", back: "253, 246, 227" },
    );
    console.log(str);
    Testing.assertEquals(
      enc.encode(str),
      enc.encode(
        "\u001b[38;2;203;75;22;48;2;253;246;227mSolarized orange, Base 3\u001b[39;49;m",
      ),
    );
  },
});
