import { Service } from "typedi";
import { ResultActions } from "./actions/result.actions";
import { TallyActions } from "./actions/tally.actions";
import { TimerActions } from "./actions/timer.actions";
import { IntervalActions } from "./actions/interval.actions";
import { DrawerActions } from "./actions/drawer.actions";
import { NotificationActions } from "./actions/notification.actions";
import { BulkProgramsActions } from "./actions/bulkPrograms.actions";
import { ObservationActions } from "./actions/observations.actions";
import { ProgramViewerActions } from "./actions/programViewer.actions";
import { CollectionRelocationActions } from "./actions/collection.relocation.actions";
import { ToggleActions } from "./actions/toggle.actions";
import { BehaviorTrackerActions } from "./actions/bahaviorTracker.actions";

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
  #toggleActions: ToggleActions;
  #behaviorTracker: BehaviorTrackerActions;

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
    // TODO: Collections should be a class with two sub classes
    // (same with program and behavior)
    collectionRelocation: CollectionRelocationActions,
    toggle: ToggleActions,
    behaviorTracker: BehaviorTrackerActions
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
    this.#toggleActions = toggle;
    this.#behaviorTracker = behaviorTracker;
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

  get toggle() {
    return this.#toggleActions;
  }

  get behaviorTracker() {
    return this.#behaviorTracker;
  }
}
