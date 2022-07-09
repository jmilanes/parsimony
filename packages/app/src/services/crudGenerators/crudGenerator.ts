import { Collections } from "@parsimony/types";
import { ICrudGenerator, IId } from "@parsimony/types";

// ** This is a great example of where you would want to have an interface so if you provide something
// ** that abides by the contract then you will always have the same functionality throughout your app!
//TODO: Create an interface for the class (also attempt to make a functional version)

const crudGenerator = <Schema>(collectionName: Collections) => {
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
    get = (id: string): Schema => this.collection[id];
    getAll = (): Schema[] => Object.values(this.collection);
    delete = (id: string) => delete this.collection[id];
    update = (payload: Schema & { id: string }) =>
      (this.collection[payload.id] = payload);
  };
};

export default crudGenerator;
