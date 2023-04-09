import {
  StoreCollections,
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
import { Service } from "typedi";
import ChatService from "./chat.service";

type UserCollection = Record<IId, User>;
type ProgramCollection = Record<IId, Program>;
type ResultCollection = Record<IId, Result>;
type SchoolCollection = Record<IId, School>;
type ThreadCollection = Record<IId, School>;
type EventCollection = Record<IId, Event>;
type DocumentCollection = Record<IId, Document>;
type FileCollection = Record<IId, File>;

@Service()
export default class Store {
  public store$: Record<StoreCollections, BehaviorSubject<any>>;
  public isLoading: boolean;

  // These collections will be updated upon requests on a per-page basis.
  // Each page can set up with it need. User page only needs programs for that user so programs will be only the ones for that user
  // Programs page could do the same with pagination or filtering
  // This ensures every page has what they need pulling from this source but requesting from data access
  constructor() {
    // this.#chatService = cs;
    // collections
    this.store$ = {
      // TODO: Current User
      [StoreCollections.User]: new BehaviorSubject<UserCollection>({}),
      [StoreCollections.Program]: new BehaviorSubject<ProgramCollection>({}),
      [StoreCollections.Result]: new BehaviorSubject<ResultCollection>({}),
      [StoreCollections.School]: new BehaviorSubject<SchoolCollection>({}),
      [StoreCollections.Thread]: new BehaviorSubject<ThreadCollection>({}),
      [StoreCollections.Document]: new BehaviorSubject<DocumentCollection>({}),
      [StoreCollections.Event]: new BehaviorSubject<EventCollection>({}),
      [StoreCollections.File]: new BehaviorSubject<FileCollection>({}),
      [StoreCollections.AppControls]: new BehaviorSubject<AppControls>(
        {} as AppControls
      )
    };

    this.isLoading = false;
  }

  setIsLoading(isLoading: boolean) {
    this.isLoading = isLoading;
  }

  async initCollectionInStore(
    collectionName: StoreCollections,
    request: () => Promise<any>
  ) {
    console.log("HI");
    return request()
      .then((data) => {
        const dataObject = arrayToObj(data);
        this.store$[collectionName].next(dataObject);
      })
      .catch((err) => console.error(err));
  }

  subscribeToStoreCollection(collectionName: StoreCollections, next: any) {
    this.store$[collectionName].subscribe({ next });
  }

  // Used to connect all collections to the state manager updated
  subscribeToStore(next: any) {
    Object.values(this.store$).forEach((collection$) => {
      collection$.subscribe({ next });
    });
  }

  addItemToCollection<T>(
    collectionName: StoreCollections,
    item: T & { id?: IId }
  ) {
    if (!item?.id) return;
    const newStore$ = { ...this.store$[collectionName].value, [item.id]: item };
    this.store$[collectionName].next(newStore$);
  }

  addItemsToCollection<T>(collectionName: StoreCollections, items: T[] = []) {
    const newStore$ = { ...this.store$[collectionName].value, ...items };
    this.store$[collectionName].next(newStore$);
  }

  deleteItemFromStore(collectionName: StoreCollections, id: IId) {
    const collection = { ...this.getCollectionValue(collectionName) };
    delete collection[id];
    this.store$[collectionName].next(collection);
  }

  updateCollectionListItem<T>(
    collectionName: StoreCollections,
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
  getCollectionValue = (collectionName: StoreCollections) => {
    return this.store$[collectionName].value;
  };

  getCollectionItem = (collectionName: StoreCollections, id: IId) => {
    return this.store$[collectionName].value[id];
  };

  // Returns an array
  getCurrentCollectionItems = <T>(collectionName: StoreCollections): T[] => {
    return Object.values(this.store$[collectionName].value);
  };

  // Returns an observable
  getCollection$ = (collectionName: StoreCollections) => {
    return this.store$[collectionName];
  };
}
