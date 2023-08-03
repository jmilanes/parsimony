import { getDrawerState, setDrawerActive } from "./appState/drawer.actions";
import {
  getBulkProgramsState,
  addIdToBulkProgramProperty,
  removeIdFromBulkProgramProperty,
  isIdIncludedInBulkProgramProperty
} from "./appState/bulkPrograms.actions";
import {
  addNotification,
  removeNotification
} from "./appState/notifcations.actions";
import { TimerActions } from "./appState/timer.actions";
import { TallyActions } from "./appState/tally.actions";
import { IntervalActions } from "./appState/interval.actions";

// MAke Actions pattern better... Follow timer actions
export type GetActionsReturnType = ReturnType<typeof getActions>;
export const getActions = (
  TimerActions: TimerActions,
  TallyActions: TallyActions,
  intervalActions: IntervalActions
) => {
  return {
    drawer: { getState: getDrawerState, setDrawerActive },
    bulkPrograms: {
      getState: getBulkProgramsState,
      addIdToBulkProgramProperty,
      removeIdFromBulkProgramProperty,
      isIdIncludedInBulkProgramProperty
    },
    notifications: { addNotification, removeNotification },
    timer: TimerActions,
    tally: TallyActions,
    interval: intervalActions
  };
};
