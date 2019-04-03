"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var pod_1 = require("./pod");
var labelControl_1 = require("./labelControl");
var k = 2;
var n = 2;
new pod_1.Pod(k, n, new labelControl_1.LabelController(k, n));
