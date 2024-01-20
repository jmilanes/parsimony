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
export class IRequestHandler<
  Schema,
  CreatePayload,
  DeletePayload,
  UpdatePayload,
  GetPayload,
  GetAllByRelationshipPayload
> {
  domainName: Domains = "" as Domains;

  //@ts-ignore
  requests: ICrudRequests<
    Schema,
    CreatePayload,
    DeletePayload,
    UpdatePayload,
    GetPayload,
    GetAllByRelationshipPayload
  >;
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

  delete = async (payload: DeletePayload) => {
    // TODO: Make a better version of this this should be something built not
    // Relying on window so we can have a better ux and easier to tests.
    if (
      process.env.NODE_ENV === "test" ||
      window.confirm(`Are you sure you want to Delete this Item?`)
    ) {
      const id = await this.requests.delete(payload);
      this.#store.deleteItemByDomain(this.domainName, id);
      return id;
    }
  };

  update = async (payload: UpdatePayload) => {
    const item = (await this.requests.update(
      payload
    )) as AwaitedSchemaWithId<Schema>;
    this.#store.updateItemByDomain(this.domainName, item);
    return item;
  };

  getAll = async () => {
    try {
      const items = await this.requests.getAll();
      this.#store
        .getDomain$(this.domainName)
        .next(items ? arrayToObj(items) : {});
    } catch (error) {
      console.error(error);
    }
  };

  get = async (payload: GetPayload) => {
    const item = (await this.requests.get(
      payload
    )) as AwaitedSchemaWithId<Schema>;
    this.#store.addItemByDomain(this.domainName, item);
  };

  getAllByRelationship = async (payload: GetAllByRelationshipPayload) => {
    try {
      const newItems = await this.requests.getAllByRelationship(payload);
      if (newItems) {
        this.#store.addItemsByDomain(this.domainName, arrayToObj(newItems));
      }
    } catch (e) {
      console.error(e);
    }
  };

  subscribe = (service: { set: (data: any[]) => void }) => {
    this.#store.subscribeToStoreDomain(
      this.domainName,
      (obs: BehaviorSubject<Record<string, unknown>>) =>
        service.set(Object.values(obs))
    );
  };
}
