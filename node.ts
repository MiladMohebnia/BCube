import { LabelController } from "./labelControl";

export class Node {
  label: number;

  constructor(labelC: LabelController) {
    this.label = labelC.getNodeLabel();
  }
}
