import { StoreCollections } from "@parsimony/types";
import { ICrudGenerator, IId } from "@parsimony/types";

const crudGenerator = <Schema>(collectionName: StoreCollections) => {
  return class Service implements ICrudGenerator<Schema> {
    collection: Record<string, Schema>;
    count: number;

    constructor() {
      this.collection = {};
      this.count = 0;
    }

    create = (payload: Schema) => {
      const uuid: IId = `${collectionName}_${this.count}`;
      this.collection[uuid] = { ...payload, id: uuid };
      this.count = ++this.count;
      return uuid;
    };
    delete = (id: string) => delete this.collection[id];
    update = (payload: Schema & { id: string }) =>
      (this.collection[payload.id] = payload);
    get = (id: string): Schema => this.collection[id];
    getAll = (): Schema[] => Object.values(this.collection);
  };
};

export default crudGenerator;
