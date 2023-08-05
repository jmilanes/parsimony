import { Container } from "typedi";
import UIApi from "../../domains/uiApi/uiApi.Service";

import { BulkProgram } from "../../services/appStateService";

//TODO MOVE TO ACTIONS
export const createBulkOrderSelectable = <E extends { id: string }>(
  parentKey: keyof E,
  targetKey: keyof BulkProgram,
  parentTarget?: keyof BulkProgram
) => {
  const API = Container.get(UIApi);

  // key is usually targetKey but in the case of a program the parent id location
  // on a different key (parentTarget)
  const isIdSelected = (id: string, key: keyof BulkProgram = targetKey) => {
    return API.actions.bulkPrograms.isIdIncludedInBulkProgramProperty(id, key);
  };

  const isIdExcluded = (id: string) =>
    API.actions.bulkPrograms.isIdIncludedInBulkProgramProperty(
      id,
      "excludedIds"
    );

  const addIdToBulkProgramProperty = (id: string, key: keyof BulkProgram) =>
    API.actions.bulkPrograms.addIdToBulkProgramProperty(id, key);

  const removeIdFromBulkProgramProperty = (
    id: string,
    key: keyof BulkProgram
  ) => API.actions.bulkPrograms.removeIdFromBulkProgramProperty(id, key);

  const selected = (entity: E) => {
    const parentSelected = isIdSelected(
      entity[parentKey] as string,
      parentTarget
    );
    const collectionIsExcluded = isIdExcluded(entity.id);
    const collectionFoundInBulk = isIdSelected(entity.id);

    if (parentSelected && !collectionFoundInBulk && !collectionIsExcluded) {
      addIdToBulkProgramProperty(entity.id, targetKey);
    }

    return collectionFoundInBulk || !!(parentSelected && !collectionIsExcluded);
  };

  const onChange = (entity: E) => {
    const parentSelected = isIdSelected(
      entity[parentKey] as string,
      parentTarget
    );
    const collectionIsExcluded = isIdExcluded(entity.id);
    const wasSelected = selected(entity);

    wasSelected
      ? removeIdFromBulkProgramProperty(entity.id, targetKey)
      : addIdToBulkProgramProperty(entity.id, targetKey);

    if (parentSelected && wasSelected) {
      addIdToBulkProgramProperty(entity.id, "excludedIds");
    }

    if (!wasSelected && collectionIsExcluded) {
      removeIdFromBulkProgramProperty(entity.id, "excludedIds");
    }
  };

  return { selected, onChange };
};
