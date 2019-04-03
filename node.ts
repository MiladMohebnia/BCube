import { LabelController } from "./labelControl";

export class Node {
  label: number;
  connectionList : number[] = [];

  constructor(labelC: LabelController) {
    this.label = labelC.getNodeLabel();
  }
}
