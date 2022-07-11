import { Collections } from "@parsimony/types";
import { ICrudGenerator, IId } from "@parsimony/types";

// *** PLAN ***
// This is where the async requests will happen to graph QL
// We are prob want to use the local storage option so that we can easily support offLine mode for the CRUD operations
// Before that we need to generate the GraphQL an mongo stuff
// then we can make a new crudServiceGenerator and try for users
// then see if we can write anything re usable on the graph QL side of things for programs and schools (might be better to keep them decoupled but see what happens)
// Then revisit state management / observable / where it should all be handled
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
    delete = (id: string) => delete this.collection[id];
    update = (payload: Schema & { id: string }) =>
      (this.collection[payload.id] = payload);
    get = (id: string): Schema => this.collection[id];
    getAll = (): Schema[] => Object.values(this.collection);
  };
};

export default crudGenerator;
