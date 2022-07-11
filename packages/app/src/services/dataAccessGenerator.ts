import { ICrudGenerator, IDataAccess, IId } from "@parsimony/types";
import { IStateService } from "./stateService";

const dataAccessGenerator = <Schema>(
  collectionService: ICrudGenerator<Schema>,
  stateManager: IStateService
): IDataAccess<Schema> => {
  return {
    create: (payload: Schema) => {
      const id = collectionService.create(payload);
      stateManager.updateState();
      return id;
    },
    update: (payload: Schema & { id: IId }) => {
      collectionService.update(payload);
      stateManager.updateState();
    },
    delete: (id: string) => {
      collectionService.delete(id);
      stateManager.updateState();
    },
    get: (id: string): Schema => collectionService.get(id),
    getAll: (): Schema[] => collectionService.getAll(),
    getAllBy: (key: keyof Schema, value: unknown): Schema[] =>
      collectionService.getAll().filter((item) => item[key] === value)
  };
};

export default dataAccessGenerator;
