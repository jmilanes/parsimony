import { getDrawerState, setDrawerActive } from "./appState/drawer";
import {
  getBulkProgramsState,
  addIdToBulkProgramProperty,
  removeIdFromBulkProgramProperty,
  isIdIncludedInBulkProgramProperty
} from "./appState/bulkPrograms";

export type GetActionsReturnType = ReturnType<typeof getActions>;
export const getActions = () => {
  return {
    drawer: { getState: getDrawerState, setDrawerActive },
    bulkPrograms: {
      getState: getBulkProgramsState,
      addIdToBulkProgramProperty,
      removeIdFromBulkProgramProperty,
      isIdIncludedInBulkProgramProperty
    }
  };
};
