"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var LabelController = /** @class */ (function () {
    function LabelController(levels, connections) {
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
    return LabelController;
}());
exports.LabelController = LabelController;
