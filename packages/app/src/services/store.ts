import { Collections, IId, User } from "@parsimony/types";
import { BehaviorSubject, pipe } from "rxjs";
import { arrayToObj } from "../utils";

type UserCollection = Record<IId, User>;

export class Store {
  public store$: Record<IId, BehaviorSubject<Record<IId, any>>>;

  constructor() {
    this.store$ = {
      [Collections.User]: new BehaviorSubject<UserCollection>({})
    };
  }

  initCollectionInStore(
    collectionName: Collections,
    request: () => Promise<any>
  ) {
    request().then((data) => {
      const dataObject = arrayToObj(data);
      this.store$[collectionName].next(dataObject);
    });
  }

  subscribeToStoreCollection(collectionName: Collections, next: any) {
    this.store$[collectionName].subscribe({ next });
  }

  addItemToStore<T>(collectionName: Collections, item: T & { id?: IId }) {
    if (!item.id) return;
    const newStore$ = { ...this.store$[collectionName].value, [item.id]: item };
    this.store$[collectionName].next(newStore$);
  }

  deleteItemFromStore(collectionName: Collections, id: IId) {
    const collection = this.getCollectionValue(collectionName);
    delete collection[id];
    this.store$[collectionName].next(collection);
  }

  updateStore<T>(collectionName: Collections, update: T & { id?: IId }) {
    if (!update.id) return;
    const updateStore$ = {
      ...this.store$[collectionName].value,
      [update.id]: update
    };
    this.store$[collectionName].next(updateStore$);
  }

  getCollectionValue = (collectionName: Collections) => {
    return this.store$[collectionName].value;
  };

  getCollectionValueBy = (
    collectionName: Collections,
    key: any,
    value: unknown
  ) => {
    return Object.values(this.store$[collectionName].value).filter(
      (item) => item[key] === value
    );
  };

  getCollectionItem = (collectionName: Collections, id: IId) => {
    return this.store$[collectionName].value[id];
  };

  getCollection$ = (collectionName: Collections) => {
    return this.store$[collectionName];
  };
}

export interface ICrudGeneratorAsync<
  Schema,
  CreatePayload,
  DeletePAyload,
  UploadPayload
> {
  create: (payload: CreatePayload) => void;
  fetch: () => void;
  delete: (payload: DeletePAyload) => void;
  update: (payload: UploadPayload) => void;
  get: (id: string) => Schema;
  getAll: () => Schema[];
  getAllBy: (key: keyof Schema, value: unknown) => Schema[];
}

export type ICrudRequests<Schema, CreatePayload, DeletePAyload, UploadPayload> =
  {
    fetch: () => Promise<Schema[]>;
    delete: (payload: DeletePAyload) => Promise<string>;
    create: (payload: CreatePayload) => Promise<Schema>;
    update: (payload: UploadPayload) => Promise<Schema>;
  };

export const asyncCrudGenerator = <
  Schema,
  CreatePayload,
  DeletePAyload,
  UploadPayload
>(
  collectionName: Collections,
  requests: ICrudRequests<Schema, CreatePayload, DeletePAyload, UploadPayload>,
  store: Store
) => {
  return class Service
    implements
      ICrudGeneratorAsync<Schema, CreatePayload, DeletePAyload, UploadPayload>
  {
    create = async (payload: CreatePayload) => {
      const item = await requests.create(payload);
      store.addItemToStore(collectionName, item);
    };
    delete = async (payload: DeletePAyload) => {
      const id = await requests.delete(payload);
      store.deleteItemFromStore(collectionName, id);
    };
    update = async (payload: UploadPayload) => {
      const item = await requests.update(payload);
      // TODO: 1 MAke this work
      console.log("MAKE ME WORK");
      store.updateStore(collectionName, item);
    };
    fetch = () => {
      store.initCollectionInStore(collectionName, requests.fetch);
    };
    getAll = () => Object.values(store.getCollectionValue(collectionName));
    get = (id: IId) => store.getCollectionItem(collectionName, id);
    getAllBy = (key: keyof Schema, value: unknown) =>
      store.getCollectionValueBy(collectionName, key, value);
  };
};
