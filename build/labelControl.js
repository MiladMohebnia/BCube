"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var LabelController = /** @class */ (function () {
    function LabelController(levels, connections) {
        this.levels = levels;
        this.connections = connections;
        this.nodeLabelNumber = 0;
        this.switchLabelNumber = 0;
        this.switchLabelNumber = Math.pow(connections, levels + 1);
    }
    LabelController.prototype.getNodeLabel = function () {
        return this.nodeLabelNumber++;
    };
    LabelController.prototype.getSwitchLabel = function () {
        return this.switchLabelNumber++;
    };
    LabelController.prototype.getLastLabel = function () {
        return this.switchLabelNumber;
    };
    LabelController.prototype.getLastNodeLabel = function () {
        return Math.pow(this.connections, this.levels + 1) - 1;
    };
    return LabelController;
}());
exports.LabelController = LabelController;
