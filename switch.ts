import { LabelController } from "./labelControl";

export class Switch {
    label: number;
    connectionList : number[] = [];

    constructor(labelC: LabelController) {
        this.label = labelC.getSwitchLabel();
    }
}
