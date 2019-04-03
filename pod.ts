import { Node } from "./node";
import { Switch } from "./switch";
import { LabelController } from "./labelControl";

export class Pod {
  subPodList: Pod[] = [];
  nodeList: Node[] = [];
  switchList: Switch[] = [];

  constructor(
    public level: number,
    public connections: number,
    public labelC: LabelController,
    masterLevel: boolean = true
  ) {
    if (this.level > 0) {
      this.createSubPods();
      this.createSubSwitches();
    } else {
      this.createNodes();
    }
    if (masterLevel) {
      this.createSwitches();
      this.makeConnection();
    }
  }

  private createSubPods() {
    let subPodCounter = this.connections;
    while (subPodCounter-- > 0) {
      this.subPodList.push(
        new Pod(this.level - 1, this.connections, this.labelC, false)
      );
    }
  }

  private createSubSwitches() {
    for (let pod of this.subPodList) {
      pod.createSwitches();
    }
  }

  private createNodes() {
    let subPodCounter = this.connections;
    while (subPodCounter-- > 0) {
      this.nodeList.push(new Node(this.labelC));
    }
  }

  createSwitches() {
    let numberOfSwitches = Math.pow(this.connections, this.level);
    while (numberOfSwitches-- > 0) {
      this.switchList.push(new Switch(this.labelC));
    }
  }

  makeConnection() {
    if (this.level === 0) {
        for(let node of this.nodeList) {
            // console.log(
            //     `about to connect ${this.switchList[0].label} to ${node.label}`
            // );
            
            this.connect(this.switchList[0], node);
        }
        return;
    }
    for (let pod of this.subPodList) {
        pod.makeConnection();
    }
    for(let index in this.switchList) {
        let targetSwitch = this.switchList[index];
        for(let pod of this.subPodList) {
            this.connect(targetSwitch, pod.nth_node(index));
        }
        this.connect(, )
        console.log(index);
        
    }
  }

  connect(s:Switch, n: Node) {
    console.log(s.label + ' ' + n.label+ ' ' + '1');
    console.log(n.label + ' ' + s.label+ ' ' + '1');
  }

  nth_node(n: number) {
    if (this.level === 0) {
        return this.nodeList[n];
    }
  }
}
