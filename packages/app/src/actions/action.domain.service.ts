import { Service } from "typedi";
import { ResultActions } from "./appState/result.actions";
import { TallyActions } from "./appState/tally.actions";
import { TimerActions } from "./appState/timer.actions";
import { IntervalActions } from "./appState/interval.actions";
import { DrawerActions } from "./appState/drawer.actions";
import { NotifcationActions } from "./appState/notifcation.actions";
import { BulkProgramsActions } from "./appState/bulkPrograms.actions";

@Service()
export class ActionDomainService {
  #resultActions: ResultActions;
  #tallyActions: TallyActions;
  #timerActions: TimerActions;
  #intervalActions: IntervalActions;
  #notifactionActions: NotifcationActions;
  #drawerActions: DrawerActions;
  #bulkProgramsActions: BulkProgramsActions;

  constructor(
    intervalActions: IntervalActions,
    resultActions: ResultActions,
    timerActions: TimerActions,
    tallyActions: TallyActions,
    notificationActions: NotifcationActions,
    drawerActions: DrawerActions,
    bulkProgramActions: BulkProgramsActions
  ) {
    this.#intervalActions = intervalActions;
    this.#resultActions = resultActions;
    this.#tallyActions = tallyActions;
    this.#timerActions = timerActions;
    this.#notifactionActions = notificationActions;
    this.#drawerActions = drawerActions;
    this.#bulkProgramsActions = bulkProgramActions;
  }

  get timer() {
    return this.#timerActions;
  }

  get tally() {
    return this.#tallyActions;
  }

  get interval() {
    return this.#intervalActions;
  }

  get result() {
    return this.#resultActions;
  }

  get notifications() {
    return this.#notifactionActions;
  }

  get bulkPrograms() {
    return this.#bulkProgramsActions;
  }

  get drawer() {
    return this.#drawerActions;
  }
}
