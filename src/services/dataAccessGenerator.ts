export type ICollectionSercie<Schema> = {
  create: (payload: Schema) => void;
  get: (id: string) => Schema;
  getAll: () => Schema[];
  delete: (id: string) => void;
  update: (payload: Schema) => void;
};

const dataAccessGenerator = <Schema>(
  collectionService: ICollectionSercie<Schema>,
  stateManager: any
) => {
  return {
    create: (payload: Schema) => {
      collectionService.create(payload);
      stateManager.updateState();
    },
    get: (id: string): Schema => collectionService.get(id),
    getAll: (): Schema[] => collectionService.getAll(),
    delete: (id: string) => {
      collectionService.delete(id);
      stateManager.updateState();
    },
    update: (payload: Schema) => {
      collectionService.update(payload);
      stateManager.updateState();
    }
  };
};

export default dataAccessGenerator;
