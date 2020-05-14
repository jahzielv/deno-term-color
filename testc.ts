import { TermColorizer, TermColors } from "./TermColorizer.ts";

let c = new TermColorizer();
console.log(
  c.colorize(
    "Hello!",
    { fore: TermColors.Red, back: TermColors.White },
  ),
);
console.log("no color");
let greenText = c.colorize("green", { fore: TermColors.Green });
let yellowText = c.colorize("yellow", { fore: TermColors.Yellow });
console.log(c.colorizeRGB("some rgb text", "203,75,22"));
console.log(`${greenText} ${yellowText}`);
