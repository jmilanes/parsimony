import { Service } from "typedi";
import { ResultActions } from "./appState/result.actions";
import { TallyActions } from "./appState/tally.actions";
import { TimerActions } from "./appState/timer.actions";
import { IntervalActions } from "./appState/interval.actions";
import { DrawerActions } from "./appState/drawer.actions";
import { NotificationActions } from "./appState/notification.actions";
import { BulkProgramsActions } from "./appState/bulkPrograms.actions";
import { ObservationActions } from "./appState/observations.actions";
import { ProgramViewerActions } from "./appState/programViewer.actions";
import { CollectionRelocationActions } from "./appState/collection.relocation.actions";

@Service()
export class ActionDomainService {
  #resultActions: ResultActions;
  #tallyActions: TallyActions;
  #timerActions: TimerActions;
  #intervalActions: IntervalActions;
  #programViewer: ProgramViewerActions;
  #notificationActions: NotificationActions;
  #drawerActions: DrawerActions;
  #bulkProgramsActions: BulkProgramsActions;
  #observationActions: ObservationActions;
  #collectionRelocation: CollectionRelocationActions;

  constructor(
    intervalActions: IntervalActions,
    resultActions: ResultActions,
    timerActions: TimerActions,
    tallyActions: TallyActions,
    notificationActions: NotificationActions,
    drawerActions: DrawerActions,
    bulkProgramActions: BulkProgramsActions,
    observationActions: ObservationActions,
    programViewer: ProgramViewerActions,
    collectionRelocation: CollectionRelocationActions
  ) {
    this.#intervalActions = intervalActions;
    this.#resultActions = resultActions;
    this.#tallyActions = tallyActions;
    this.#timerActions = timerActions;
    this.#notificationActions = notificationActions;
    this.#drawerActions = drawerActions;
    this.#bulkProgramsActions = bulkProgramActions;
    this.#observationActions = observationActions;
    this.#programViewer = programViewer;
    this.#collectionRelocation = collectionRelocation;
  }

  get timer() {
    return this.#timerActions;
  }

  get tally() {
    return this.#tallyActions;
  }

  //
  get interval() {
    return this.#intervalActions;
  }

  get result() {
    return this.#resultActions;
  }

  get notifications() {
    return this.#notificationActions;
  }

  get bulkPrograms() {
    return this.#bulkProgramsActions;
  }

  get drawer() {
    return this.#drawerActions;
  }

  get observations() {
    return this.#observationActions;
  }

  get programViewer() {
    return this.#programViewer;
  }

  get collectionRelocation() {
    return this.#collectionRelocation;
  }
}
