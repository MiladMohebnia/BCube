"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var node_1 = require("./node");
var switch_1 = require("./switch");
var Pod = /** @class */ (function () {
    function Pod(level, connections, labelC, masterLevel) {
        if (masterLevel === void 0) { masterLevel = true; }
        this.level = level;
        this.connections = connections;
        this.labelC = labelC;
        this.subPodList = [];
        this.nodeList = [];
        this.switchList = [];
        if (this.level > 0) {
            this.createSubPods();
            this.createSubSwitches();
        }
        else {
            this.createNodes();
        }
        if (masterLevel) {
            this.createSwitches();
            this.makeConnection();
        }
    }
    Pod.prototype.createSubPods = function () {
        var subPodCounter = this.connections;
        while (subPodCounter-- > 0) {
            this.subPodList.push(new Pod(this.level - 1, this.connections, this.labelC, false));
        }
    };
    Pod.prototype.createSubSwitches = function () {
        for (var _i = 0, _a = this.subPodList; _i < _a.length; _i++) {
            var pod = _a[_i];
            pod.createSwitches();
        }
    };
    Pod.prototype.createNodes = function () {
        var subPodCounter = this.connections;
        while (subPodCounter-- > 0) {
            this.nodeList.push(new node_1.Node(this.labelC));
        }
    };
    Pod.prototype.createSwitches = function () {
        var numberOfSwitches = Math.pow(this.connections, this.level);
        while (numberOfSwitches-- > 0) {
            this.switchList.push(new switch_1.Switch(this.labelC));
        }
    };
    Pod.prototype.makeConnection = function () {
        if (this.level === 0) {
            for (var _i = 0, _a = this.nodeList; _i < _a.length; _i++) {
                var node = _a[_i];
                // console.log(
                //     `about to connect ${this.switchList[0].label} to ${node.label}`
                // );
                this.connect(this.switchList[0], node);
            }
            return;
        }
        for (var _b = 0, _c = this.subPodList; _b < _c.length; _b++) {
            var pod = _c[_b];
            pod.makeConnection();
        }
        for (var index in this.switchList) {
            console.log(index);
        }
    };
    Pod.prototype.connect = function (s, n) {
        console.log(s.label + ' ' + n.label + ' ' + '1');
        console.log(n.label + ' ' + s.label + ' ' + '1');
    };
    return Pod;
}());
exports.Pod = Pod;
