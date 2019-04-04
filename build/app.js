"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var pod_1 = require("./pod");
var labelControl_1 = require("./labelControl");
var k = -1;
var n = -1;
var standard_input1 = process.stdin;
standard_input1.setEncoding("utf-8");
console.log("please enter 'k'");
standard_input1.on("data", function (input) {
    if (k == -1) {
        k = parseInt(input);
        console.log("please enter 'n'");
    }
    else {
        n = parseInt(input);
        new pod_1.Pod(k, n, new labelControl_1.LabelController(k, n));
        standard_input1.end();
    }
});
