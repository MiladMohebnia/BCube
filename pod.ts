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
    public masterLevel: boolean = true
  ) {
    if (this.level > 0) {
      this.createSubPods();
      this.createSubSwitches();
    } else {
      this.createNodes();
    }
    if (masterLevel) {
      this.createSwitches();
      let levelIndex: number = 0;
      while (levelIndex <= this.level) {
        this.makeConnectionOnLevel(levelIndex);
        levelIndex++;
      }
      this.printNotConnectedNodes();
    }
    // this.printNotConnected();
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

  makeConnectionOnLevel(level: number) {
    if (this.level === 0) {
      for (let node of this.nodeList) {
        this.connect(this.switchList[0], node);
      }
      this.printNotConnected(this.switchList[0]);
    } else if (this.level === level) {
      for (let index in this.switchList) {
        let numberedIndex = parseInt(index);
        let targetSwitch = this.switchList[index];
        for (let pod of this.subPodList) {
          this.connect(targetSwitch, pod.nth_node(numberedIndex));
        }
        this.printNotConnected(targetSwitch);
      }
    } else {
      for (let pod of this.subPodList) {
        pod.makeConnectionOnLevel(level);
      }
    }
  }

  connect(s: Switch, n: Node) {
    n.connectionList.push(s.label);
    s.connectionList.push(n.label);
    console.log(s.label + " " + n.label + " " + "1");
    console.log(n.label + " " + s.label + " " + "1");
  }

  nth_node(n: number): Node {
    if (this.level === 0) {
      return this.nodeList[n];
    }
    let eachPodNodeCount = Math.pow(this.connections, this.level);
    let targetSubPodIndex =
      n < eachPodNodeCount ? 0 : Math.floor(n / eachPodNodeCount);
    let targetNodeIndex = n < eachPodNodeCount ? n : n % eachPodNodeCount;
    return this.subPodList[targetSubPodIndex].nth_node(targetNodeIndex);
  }

  printNotConnected(s: Switch) {
    let targetSwitch: Switch = s;
    let connectionList: number[] = targetSwitch.connectionList;
    let lastLabel: number = targetSwitch.label;
    for (let index = 0; index < lastLabel; index++) {
      if (connectionList.indexOf(index) >= 0) continue;
      console.log(targetSwitch.label + " " + index + " " + "999999");
      console.log(index + " " + targetSwitch.label + " " + "999999");
    }
  }

  printNotConnectedNodes() {
    let lastLabel: number = this.labelC.getLastNodeLabel();
    let targetNodeLabel: number = 1;
    while (targetNodeLabel <= lastLabel) {
      for (let index = 0; index < targetNodeLabel; index++) {
        console.log(targetNodeLabel + " " + index + " " + "999999");
        console.log(index + " " + targetNodeLabel + " " + "999999");
      }
      targetNodeLabel++;
    }
  }
}
