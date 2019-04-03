import { Pod } from "./pod";
import { LabelController } from "./labelControl";

let k = 2;
let n = 2;

new Pod(k, n, new LabelController(k, n));
