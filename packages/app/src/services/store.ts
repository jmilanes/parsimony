import {
  Collections,
  Event,
  IId,
  Program,
  Result,
  School,
  User,
  Document,
  File
} from "@parsimony/types";
import { BehaviorSubject } from "rxjs";
import threadOperationStrings from "../bal/requests/operationStrings/threadOperationStrings";
import { arrayToObj } from "../utils";

type UserCollection = Record<IId, User>;
type ProgramCollection = Record<IId, Program>;
type ResultCollection = Record<IId, Result>;
type SchoolCollection = Record<IId, School>;
type ThreadCollection = Record<IId, School>;
type EventCollection = Record<IId, Event>;
type DocumentCollection = Record<IId, Document>;
type FileCollection = Record<IId, File>;

export default class Store {
  public store$: Record<IId, BehaviorSubject<Record<IId, any>>>;
  public isLoading: boolean;

  constructor() {
    // lists
    this.store$ = {
      [Collections.User]: new BehaviorSubject<UserCollection>({}),
      [Collections.Program]: new BehaviorSubject<ProgramCollection>({}),
      [Collections.Result]: new BehaviorSubject<ResultCollection>({}),
      [Collections.School]: new BehaviorSubject<SchoolCollection>({}),
      [Collections.Thread]: new BehaviorSubject<ThreadCollection>({}),
      [Collections.Document]: new BehaviorSubject<DocumentCollection>({}),
      [Collections.Event]: new BehaviorSubject<EventCollection>({}),
      [Collections.File]: new BehaviorSubject<FileCollection>({})
    };

    this.isLoading = false;
  }

  setIsLoading(isLoading: boolean) {
    this.isLoading = isLoading;
  }

  async initCollectionInStore(
    collectionName: Collections,
    request: () => Promise<any>
  ) {
    return request()
      .then((data) => {
        const dataObject = arrayToObj(data);
        this.store$[collectionName].next(dataObject);
      })
      .catch((err) => console.error(err));
  }

  subscribeToStoreCollection(collectionName: Collections, next: any) {
    this.store$[collectionName].subscribe({ next });
  }

  // Used to connect all collections to the the state manager update
  subscribeToStore(next: any) {
    Object.values(this.store$).forEach((collection$) => {
      collection$.subscribe({ next });
    });
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

  getCurrentList = (collectionName: Collections) => {
    return Object.values(this.store$[collectionName].value);
  };

  getCollection$ = (collectionName: Collections) => {
    return this.store$[collectionName];
  };
}
