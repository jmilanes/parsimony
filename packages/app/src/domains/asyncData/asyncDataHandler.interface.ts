import { Collections, ICrudRequests, IId } from "@parsimony/types";
import { BehaviorSubject } from "rxjs";
import { arrayToObj } from "../../utils";
import Store from "../../services/store";

type AwaitedSchemaWithId<Schema> = Awaited<Schema> & {
  id?: string | undefined;
};

export class AsyncDataHandlerInterface<
  Schema,
  CreatePayload,
  DeleteThreadPayload,
  UpdatePayload,
  GetPayload,
  GetAllByRelationshipPayload
> {
  collectionName: Collections;
  requests: ICrudRequests<
    Schema,
    CreatePayload,
    DeleteThreadPayload,
    UpdatePayload,
    GetPayload,
    GetAllByRelationshipPayload
  >;
  store: Store;

  constructor(collectionName: Collections, requests: any, store: Store) {
    this.store = store;
    this.collectionName = collectionName;
    this.requests = requests;
  }

  init = async () => {
    await this.store.initCollectionInStore(
      this.collectionName,
      this.requests.getAll
    );
  };

  create = async (payload: CreatePayload) => {
    const item = (await this.requests.create(
      payload
    )) as AwaitedSchemaWithId<Schema>;
    this.store.addItemToCollection(this.collectionName, item);
    return item;
  };

  delete = async (payload: DeleteThreadPayload) => {
    const id = await this.requests.delete(payload);
    this.store.deleteItemFromStore(this.collectionName, id);
    return id;
  };

  update = async (payload: UpdatePayload) => {
    const item = (await this.requests.update(
      payload
    )) as AwaitedSchemaWithId<Schema>;
    this.store.updateCollectionListItem(this.collectionName, item);
    return item;
  };

  getAll = async () => {
    try {
      const items = await this.requests.getAll();
      this.store.getCollection$(this.collectionName).next(arrayToObj(items));
    } catch (error) {
      console.error(error);
    }
  };

  get = async (id: IId) => {
    const item = (await this.requests.get({
      id
    } as unknown as GetPayload)) as AwaitedSchemaWithId<Schema>;
    this.store.addItemToCollection(this.collectionName, item);
  };

  getAllByRelationship = async (
    relationshipProperty: keyof Schema,
    id: string
  ) => {
    try {
      const items = await this.requests.getAllByRelationship({
        relationshipProperty,
        id
      } as unknown as GetAllByRelationshipPayload);
      this.store.getCollection$(this.collectionName).next(items);
    } catch (error) {
      console.error(error);
    }
  };

  subscribe = (service: { set: (data: any[]) => void }) => {
    this.store.subscribeToStoreCollection(
      this.collectionName,
      (obs: BehaviorSubject<Record<string, unknown>>) =>
        service.set(Object.values(obs))
    );
  };
}
