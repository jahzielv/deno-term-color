import { TermColorizer, TermColorCodes } from "./TermColorizer.ts";

let c = new TermColorizer();
console.log(
  c.colorize(
    "Hello!",
    { fore: TermColorCodes.Red, back: TermColorCodes.White },
  ),
);
console.log("no color");
let greenText = c.colorize("green", { fore: TermColorCodes.Green });
let yellowText = c.colorize("yellow", { fore: TermColorCodes.Yellow });
console.log(c.colorizeRGB("some rgb text", "203,75,22"));
console.log(`${greenText} ${yellowText}`);
