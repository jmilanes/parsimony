import { Domains, ICrudRequests, IId } from "@parsimony/types";
import { BehaviorSubject } from "rxjs";
import { arrayToObj } from "../../utils";
import Store from "../state/store/store";
import { Service } from "typedi";
import { message } from "antd";

type AwaitedSchemaWithId<Schema> = Awaited<Schema> & {
  id?: string | undefined;
};

@Service()
export class IRequestHandler<
  Schema,
  CreatePayload,
  DeleteThreadPayload,
  UpdatePayload,
  GetPayload,
  GetAllByRelationshipPayload
> {
  domainName: Domains = "" as Domains;

  //@ts-ignore
  requests: ICrudRequests<
    Schema,
    CreatePayload,
    DeleteThreadPayload,
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
    this.#store.addItemToDomain(this.domainName, item);
    return item;
  };

  delete = async (payload: DeleteThreadPayload) => {
    // TODO: Make a better version of this
    if (window.confirm(`Are you sure you want to Delete this Item?`)) {
      const id = await this.requests.delete(payload);
      this.#store.deleteItemFromStore(this.domainName, id);
      return id;
    }
  };

  update = async (payload: UpdatePayload) => {
    const item = (await this.requests.update(
      payload
    )) as AwaitedSchemaWithId<Schema>;
    this.#store.updateDomainListItem(this.domainName, item);
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
    this.#store.addItemToDomain(this.domainName, item);
  };

  getAllByRelationship = async (payload: GetAllByRelationshipPayload) => {
    try {
      const newItems = await this.requests.getAllByRelationship(payload);
      if (newItems) {
        this.#store.addItemsToDomain(this.domainName, arrayToObj(newItems));
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
