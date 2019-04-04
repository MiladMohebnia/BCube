
export class LabelController {
    nodeLabelNumber: number = 0;
    switchLabelNumber: number = 0;
  
    constructor(public levels: number, public connections: number) {
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

    getLastNodeLabel() {
      return Math.pow(this.connections, this.levels + 1) - 1;
    }
  }
  