import { Collections, IId, Program, User } from "@parsimony/types";
import { BehaviorSubject } from "rxjs";
import { arrayToObj } from "../utils";

type UserCollection = Record<IId, User>;
type ProgramCollection = Record<IId, Program>;

export class Store {
  public store$: Record<IId, BehaviorSubject<Record<IId, any>>>;

  constructor() {
    this.store$ = {
      [Collections.User]: new BehaviorSubject<UserCollection>({}),
      [Collections.Program]: new BehaviorSubject<ProgramCollection>({})
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
  DeleteThreadPayload,
  UploadPayload
> {
  create: (payload: CreatePayload) => void;
  init: () => void;
  delete: (payload: DeleteThreadPayload) => void;
  update: (payload: UploadPayload) => void;
  get: (id: string) => Schema;
  getAll: () => Schema[];
  getAllBy: (key: keyof Schema, value: unknown) => Schema[];
}

export type ICrudRequests<
  Schema,
  CreatePayload,
  DeleteThreadPayload,
  UploadPayload,
  GetPayload
> = {
  getAll: () => Promise<Schema[]>;
  get: (payload?: GetPayload) => Promise<Schema>;
  delete: (payload?: DeleteThreadPayload) => Promise<string>;
  create: (payload?: CreatePayload) => Promise<Schema>;
  update: (payload?: UploadPayload) => Promise<Schema>;
};

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
    GetPayload
  >;
  store: Store;
  constructor(collectionName: Collections, requests: any, store: Store) {
    this.store = store;
    this.collectionName = collectionName;
    this.requests = requests;
  }

  init = () => {
    this.store.initCollectionInStore(this.collectionName, this.requests.getAll);
  };
  create = async (payload: CreatePayload) => {
    const item = await this.requests.create(payload);
    this.store.addItemToStore(this.collectionName, item);
  };
  delete = async (payload: DeleteThreadPayload) => {
    const id = await this.requests.delete(payload);
    this.store.deleteItemFromStore(this.collectionName, id);
  };
  update = async (payload: UploadPayload) => {
    const item = await this.requests.update(payload);
    this.store.updateStore(this.collectionName, item);
  };
  getAll = () =>
    Object.values(this.store.getCollectionValue(this.collectionName));
  get = (id: IId) => this.store.getCollectionItem(this.collectionName, id);
  getAllBy = (key: keyof Schema, value: unknown) =>
    this.store.getCollectionValueBy(this.collectionName, key, value);
  subscribe = (service: { set: (data: any[]) => void }) => {
    this.store.subscribeToStoreCollection(
      this.collectionName,
      (obs: BehaviorSubject<Record<string, unknown>>) =>
        service.set(Object.values(obs))
    );
  };
}
