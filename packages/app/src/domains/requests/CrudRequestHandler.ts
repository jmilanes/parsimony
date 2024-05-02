import { Domains, ICrudRequests } from "@parsimony/types";
import { BehaviorSubject } from "rxjs";
import { arrayToObj } from "../../utils";
import Store from "../state/store/store";
import { Service } from "typedi";
import * as process from "process";

type AwaitedSchemaWithId<Schema> = Awaited<Schema> & {
  id?: string | undefined;
};

@Service()
export class CrudRequestHandler<Schema, CreatePayload, UpdatePayload> {
  domainName: Domains = "" as Domains;
  requests: ICrudRequests<Schema, CreatePayload, UpdatePayload>;
  #store: Store;

  // TODO Add a debugger and better testing
  constructor(store: Store) {
    this.#store = store;
  }

  init = async () => {
    await this.#store.initDomainInStore(this.domainName, this.requests.getAll);
  };

  create = async (payload: CreatePayload) => {
    const item = (await this.requests.create(
      payload
    )) as AwaitedSchemaWithId<Schema>;
    this.#store.addItemByDomain(this.domainName, item);
    return item;
  };

  delete = async (id: string) => {
    // TODO: Make a better version of this this should be something built not
    // Relying on window so we can have a better ux and easier to tests.
    if (
      process.env.NODE_ENV === "test" ||
      window.confirm(`Are you sure you want to Delete this Item?`)
    ) {
      const deletedItem = await this.requests.delete(id);
      debugger;
      this.#store.deleteItemByDomain(this.domainName, deletedItem.id);
      return deletedItem.id;
    }
  };

  update = async (id: string, payload: UpdatePayload) => {
    const item = (await this.requests.update(
      id,
      payload
    )) as AwaitedSchemaWithId<Schema>;
    this.#store.updateItemByDomain(this.domainName, item);
    return item;
  };

  getAll = async () => {
    try {
      const items = await this.requests.getAll();
      //@ts-ignore TODO: Handle in NEST
      this.#store.getDomain$(this.domainName).next(arrayToObj(items));
    } catch (error) {
      console.error(error);
    }
  };

  get = async (id: string) => {
    const item = (await this.requests.get(id)) as AwaitedSchemaWithId<Schema>;
    this.#store.addItemByDomain(this.domainName, item);
  };

  subscribe = (service: { set: (data: any[]) => void }) => {
    this.#store.subscribeToStoreDomain(
      this.domainName,
      (obs: BehaviorSubject<Record<string, unknown>>) =>
        service.set(Object.values(obs))
    );
  };
}
