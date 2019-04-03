import { LabelController } from "./labelControl";

export class Switch {
    label: number;

    constructor(labelC: LabelController) {
        this.label = labelC.getSwitchLabel();
    }
}
