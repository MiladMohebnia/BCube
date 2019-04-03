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
        this.masterLevel = masterLevel;
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
            var levelIndex = 0;
            while (levelIndex <= this.level) {
                this.makeConnectionOnLevel(levelIndex);
                levelIndex++;
            }
        }
        // this.printNotConnected();
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
    Pod.prototype.makeConnectionOnLevel = function (level) {
        if (this.level === 0) {
            for (var _i = 0, _a = this.nodeList; _i < _a.length; _i++) {
                var node = _a[_i];
                this.connect(this.switchList[0], node);
            }
        }
        else if (this.level === level) {
            for (var index in this.switchList) {
                var numberedIndex = parseInt(index);
                var targetSwitch = this.switchList[index];
                for (var _b = 0, _c = this.subPodList; _b < _c.length; _b++) {
                    var pod = _c[_b];
                    this.connect(targetSwitch, pod.nth_node(numberedIndex));
                }
            }
        }
        else {
            for (var _d = 0, _e = this.subPodList; _d < _e.length; _d++) {
                var pod = _e[_d];
                pod.makeConnectionOnLevel(level);
            }
        }
    };
    Pod.prototype.connect = function (s, n) {
        n.connectionList.push(s.label);
        s.connectionList.push(n.label);
        console.log(s.label + " " + n.label + " " + "1");
        console.log(n.label + " " + s.label + " " + "1");
    };
    Pod.prototype.nth_node = function (n) {
        if (this.level === 0) {
            return this.nodeList[n];
        }
        var eachPodNodeCount = Math.pow(this.connections, this.level);
        var targetSubPodIndex = n < eachPodNodeCount ? 0 : Math.floor(n / eachPodNodeCount);
        var targetNodeIndex = n < eachPodNodeCount ? n : n % eachPodNodeCount;
        return this.subPodList[targetSubPodIndex].nth_node(targetNodeIndex);
    };
    Pod.prototype.printNotConnected = function () {
        if (this.level === 0) {
            var targetSwitch = this.switchList[0];
            console.log(this);
            var connectionList = targetSwitch.connectionList;
            var lastLabel = targetSwitch.label;
            for (var index = 0; index < lastLabel; index++) {
                if (connectionList.indexOf(index))
                    continue;
                console.log(targetSwitch.label + " " + index + " " + "999999");
                console.log(index + " " + targetSwitch.label + " " + "999999");
            }
        }
        else {
            for (var _i = 0, _a = this.subPodList; _i < _a.length; _i++) {
                var pod = _a[_i];
                pod.printNotConnected();
            }
        }
    };
    return Pod;
}());
exports.Pod = Pod;
