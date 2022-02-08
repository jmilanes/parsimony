import { Collections } from "../enums";
import { IId } from "../types";

const crudGenerator = <Schema>(collectionName: Collections) => {
  return class Service {
    collection: Record<any, Schema>;
    count: number;
    constructor() {
      this.collection = {};
      this.count = 0;
    }

    create = (payload: Schema) => {
      const uuid: IId = `${collectionName}_${this.count}`;
      this.collection[uuid] = { ...payload, id: uuid };
      this.count = ++this.count;
    };
    get = (id: string): Schema => this.collection[id];
    getAll = (): Schema[] => Object.values(this.collection);
    delete = (id: string) => delete this.collection[id];
    update = (payload: Schema & { id: string }) =>
      (this.collection[payload.id] = payload);
  };
};

export default crudGenerator;
