
export class LabelController {
    nodeLabelNumber: number = 0;
    switchLabelNumber: number = 0;
  
    constructor(levels: number, connections: number) {
      this.switchLabelNumber = Math.pow(connections, levels + 1);
    }
  
    getNodeLabel() {
      return this.nodeLabelNumber++;
    }
  
    getSwitchLabel() {
      return this.switchLabelNumber++;
    }

    getLastLabel() {
      return this.switchLabelNumber;
    }
  }
  