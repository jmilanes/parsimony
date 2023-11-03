import { Domains } from "@parsimony/types/dist";
import { ICrudGenerator, IId } from "@parsimony/types/dist";

const crudGenerator = <Schema>(domainName: Domains) => {
  return class Service implements ICrudGenerator<Schema> {
    domain: Record<string, Schema>;
    count: number;

    constructor() {
      this.domain = {};
      this.count = 0;
    }

    create = (payload: Schema) => {
      const uuid: IId = `${domainName}_${this.count}`;
      this.domain[uuid] = { ...payload, id: uuid };
      this.count = ++this.count;
      return uuid;
    };
    delete = (id: string) => delete this.domain[id];
    update = (payload: Schema & { id: string }) =>
      (this.domain[payload.id] = payload);
    get = (id: string): Schema => this.domain[id];
    getAll = (): Schema[] => Object.values(this.domain);
  };
};

export default crudGenerator;
