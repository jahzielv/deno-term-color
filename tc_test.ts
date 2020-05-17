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
  name: "ANSI fore, RGB back",
  fn: () => {
    let str = c.colorize(
      "white front, SV back",
      { fore: TermColors.White, back: "108,113,196" },
    );
    console.log(str);
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
  },
});

Deno.test({
  name: "RGB fore",
  fn: () => {
    let str = c.colorize("Solarized orange", "203, 75, 22");
    console.log(str);
  },
});
