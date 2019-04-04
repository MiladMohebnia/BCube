import { Pod } from "./pod";
import { LabelController } from "./labelControl";

let k = -1;
let n = -1;

let standard_input1 = process.stdin;
standard_input1.setEncoding("utf-8");
console.log("please enter 'k'");
standard_input1.on("data", (input: string) => {
    if (k == -1) {
        k = parseInt(input);
        console.log("please enter 'n'");
    } else {
        n = parseInt(input);
        new Pod(k, n, new LabelController(k, n));
        standard_input1.end();
    }
});
