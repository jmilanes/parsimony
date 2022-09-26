import {
  Collections,
  ICrudGeneratorAsync,
  ICrudRequests,
  IId
} from "@parsimony/types";
import { BehaviorSubject } from "rxjs";
import Store from "../store";

export class AsyncCrudGenerator<
  Schema,
  CreatePayload,
  DeleteThreadPayload,
  UploadPayload,
  GetPayload
> implements
    ICrudGeneratorAsync<
      Schema,
      CreatePayload,
      DeleteThreadPayload,
      UploadPayload
    >
{
  collectionName: Collections;
  requests: ICrudRequests<
    Schema,
    CreatePayload,
    DeleteThreadPayload,
    UploadPayload,
    GetPayload,
    void
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
    const item = await this.requests.create(payload);
    this.store.addItemToStore(this.collectionName, item);
    return item;
  };

  delete = async (payload: DeleteThreadPayload) => {
    const id = await this.requests.delete(payload);
    this.store.deleteItemFromStore(this.collectionName, id);
    return id;
  };

  update = async (payload: UploadPayload) => {
    const item = await this.requests.update(payload);
    this.store.updateStore(this.collectionName, item);
    return item;
  };

  getAll = async () => {
    try {
      const items = await this.requests.getAll();
      this.store.getCollection$(this.collectionName).next(items);
    } catch (error) {
      console.error(error);
    }
  };

  get = async (id: IId) => {
    const item = await this.requests.get({ id });
    this.store.addItemToStore(this.collectionName, item);
  };

  getAllBy = (key: keyof Schema, value: unknown) => {
    // TODO Add the relationsip too all once it works
    this.store.getCollectionValueBy(this.collectionName, key, value);
  };

  subscribe = (service: { set: (data: any[]) => void }) => {
    this.store.subscribeToStoreCollection(
      this.collectionName,
      (obs: BehaviorSubject<Record<string, unknown>>) =>
        service.set(Object.values(obs))
    );
  };
}
