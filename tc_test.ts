import * as Testing from "https://deno.land/std/testing/asserts.ts";
import { TermColorizer, TermColors } from "./TermColorizer.ts";

const c = new TermColorizer();
const enc = new TextEncoder();
Deno.test({
  name: "basic one-color one-string test",
  fn: () => {
    let greenStr = c.colorize("green", TermColors.Green);
    console.log(greenStr);
    Testing.assertEquals(
      enc.encode(greenStr),
      enc.encode("\u001b[32mgreen\u001b[39;49;m"),
    );
  },
});

Deno.test({
  name: "foreground and background test",
  fn: () => {
    let redAndWhiteStr = c.colorize(
      "red and white",
      { fore: TermColors.Red, back: TermColors.White },
    );
    console.log(redAndWhiteStr);
    Testing.assertEquals(
      enc.encode(redAndWhiteStr),
      enc.encode("\u001b[31;47mred and white\u001b[39;49;m"),
    );
  },
});

Deno.test({
  name: "RGB foreground test",
  fn: () => {
    let rgbStr = c.colorizeRGB("solarized violet", "108, 113, 196");
    console.log(rgbStr);
    Testing.assertEquals(
      enc.encode(rgbStr),
      enc.encode("\u001b[38;2;108;113;196msolarized violet\u001b[39;49;m"),
    );
  },
});
