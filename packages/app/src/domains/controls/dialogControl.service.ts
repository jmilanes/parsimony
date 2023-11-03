import AppStateService, {
  DialogControls,
  DialogQueueItem
} from "../state/appStateService";

import { Service } from "typedi";

@Service()
export class DialogControlService {
  #ass: AppStateService;

  constructor(ass: AppStateService) {
    this.#ass = ass;
  }

  public getState = () => {
    return this.#ass.getAppStateByKey("dialog");
  };

  public updateState = (update: Partial<DialogControls>) => {
    this.#ass.updateAppState("dialog", update);
  };

  public open = () => {
    this.updateState({ active: true });
  };

  public close = () => {
    const head = this.#getHead();
    if (head) {
      this.updateState(head);
      return;
    }
    this.updateState({ active: false });
  };

  public push = (item: DialogQueueItem) => {
    const { queue, active } = this.getState();

    queue.push(item);
    this.updateState({ queue });

    if (!active) {
      this.open();
      const head = this.#getHead();
      if (head) {
        this.updateState(head);
      }
    }
  };

  #getHead() {
    const { queue } = this.getState();
    const head = queue.shift();
    this.updateState({ queue });
    return head;
  }

  public clear = () => {
    this.updateState({ queue: [] });
  };

  public getQueueLength = () => {
    const { queue } = this.getState();
    return queue.length;
  };
}
