import { ICrudGenerator, IId } from "../types";
import { IStateService } from "./stateService";

const dataAccessGenerator = <Schema>(
  collectionService: ICrudGenerator<Schema>,
  stateManager: IStateService
) => {
  return {
    create: (payload: Schema) => {
      const id = collectionService.create(payload);
      stateManager.updateState();
      return id;
    },
    get: (id: string): Schema => collectionService.get(id),
    getAll: (): Schema[] => collectionService.getAll(),
    delete: (id: string) => {
      collectionService.delete(id);
      stateManager.updateState();
    },
    update: (payload: Schema & { id: IId }) => {
      collectionService.update(payload);
      stateManager.updateState();
    }
  };
};

export default dataAccessGenerator;
