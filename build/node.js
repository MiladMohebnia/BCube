"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Node = /** @class */ (function () {
    function Node(labelC) {
        this.connectionList = [];
        this.label = labelC.getNodeLabel();
    }
    return Node;
}());
exports.Node = Node;
