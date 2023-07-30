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

// MAke Actions pattern better... Follow timer actions
export type GetActionsReturnType = ReturnType<typeof getActions>;
export const getActions = (TimerActions: TimerActions) => {
  return {
    drawer: { getState: getDrawerState, setDrawerActive },
    bulkPrograms: {
      getState: getBulkProgramsState,
      addIdToBulkProgramProperty,
      removeIdFromBulkProgramProperty,
      isIdIncludedInBulkProgramProperty
    },
    notifications: { addNotification, removeNotification },
    timer: TimerActions
  };
};
