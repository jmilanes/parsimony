import {
  Collections,
  Document,
  Event,
  File,
  IId,
  Program,
  Result,
  School,
  User
} from "@parsimony/types";
import { BehaviorSubject } from "rxjs";
import { arrayToObj } from "../utils";
import { AppControls } from "./appControls.service";

type UserCollection = Record<IId, User>;
type ProgramCollection = Record<IId, Program>;
type ResultCollection = Record<IId, Result>;
type SchoolCollection = Record<IId, School>;
type ThreadCollection = Record<IId, School>;
type EventCollection = Record<IId, Event>;
type DocumentCollection = Record<IId, Document>;
type FileCollection = Record<IId, File>;

export default class Store {
  public store$: Record<Collections, BehaviorSubject<any>>;
  public isLoading: boolean;

  // These collections will be updated upon requests on a per page basis.
  // Each page can set up with it need. User page only needs programs for that user so programs will be only the ones for that user
  // Programs page could do the same with pagination or filtering
  // This ensures every page has what they need pulling from this source but requesting from data access
  constructor() {
    // collections
    this.store$ = {
      [Collections.User]: new BehaviorSubject<UserCollection>({}),
      [Collections.Program]: new BehaviorSubject<ProgramCollection>({}),
      [Collections.Result]: new BehaviorSubject<ResultCollection>({}),
      [Collections.School]: new BehaviorSubject<SchoolCollection>({}),
      [Collections.Thread]: new BehaviorSubject<ThreadCollection>({}),
      [Collections.Document]: new BehaviorSubject<DocumentCollection>({}),
      [Collections.Event]: new BehaviorSubject<EventCollection>({}),
      [Collections.File]: new BehaviorSubject<FileCollection>({}),
      [Collections.AppControls]: new BehaviorSubject<AppControls>(
        {} as AppControls
      )
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

  // Used to connect all collections to the state manager updated
  subscribeToStore(next: any) {
    Object.values(this.store$).forEach((collection$) => {
      collection$.subscribe({ next });
    });
  }

  addItemToCollection<T>(collectionName: Collections, item: T & { id?: IId }) {
    if (!item?.id) return;
    const newStore$ = { ...this.store$[collectionName].value, [item.id]: item };
    this.store$[collectionName].next(newStore$);
  }

  addItemsToCollection<T>(collectionName: Collections, items: T[] = []) {
    const newStore$ = { ...this.store$[collectionName].value, ...items };
    this.store$[collectionName].next(newStore$);
  }

  deleteItemFromStore(collectionName: Collections, id: IId) {
    const collection = { ...this.getCollectionValue(collectionName) };
    delete collection[id];
    this.store$[collectionName].next(collection);
  }

  updateCollectionListItem<T>(
    collectionName: Collections,
    updatedItem: T & { id?: IId }
  ) {
    if (!updatedItem.id) return;
    const updatedCollection = {
      ...this.store$[collectionName].value,
      [updatedItem.id]: updatedItem
    };
    this.store$[collectionName].next(updatedCollection);
  }

  // Returns an object
  getCollectionValue = (collectionName: Collections) => {
    return this.store$[collectionName].value;
  };

  getCollectionItem = (collectionName: Collections, id: IId) => {
    return this.store$[collectionName].value[id];
  };

  // Returns an array
  getCurrentCollectionItems = <T>(collectionName: Collections): T[] => {
    return Object.values(this.store$[collectionName].value);
  };

  // Returns an observable
  getCollection$ = (collectionName: Collections) => {
    return this.store$[collectionName];
  };
}
