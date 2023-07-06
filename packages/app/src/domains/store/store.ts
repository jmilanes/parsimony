import {
  Domains,
  Document,
  Event,
  File,
  IId,
  Program,
  Result,
  School,
  User,
  Collection,
  Thread
} from "@parsimony/types";
import { BehaviorSubject } from "rxjs";
import { arrayToObj } from "../../utils";
import { AppState } from "../../services/appStateService";
import { Service } from "typedi";

import { get } from "lodash";

export interface DomainReturnTypeMap {
  [Domains.Program]: Program;
  [Domains.Collection]: Collection;
  [Domains.User]: User;
  [Domains.School]: School;
  [Domains.Result]: Result;
  [Domains.Thread]: Thread;
  [Domains.Document]: Document;
  [Domains.File]: File;
  [Domains.Event]: Event;
  [Domains.AppState]: AppState;
}

type UserStoreValue = Record<IId, User>;
type ProgramStoreValue = Record<IId, Program>;
type ResultStoreValue = Record<IId, Result>;
type SchoolStoreValue = Record<IId, School>;
type ThreadStoreValue = Record<IId, School>;

//TODO: THink about removing these
type EventStoreValue = Record<IId, Event>;
type DocumentStoreValue = Record<IId, Document>;
type FileStoreValue = Record<IId, File>;
type CollectionStoreValue = Record<IId, Collection>;

//TODO: idea maybe the store can be turned into async then we can check if its not inclued we can go fetch
// Also have an option for allways fetching
// Amount we acctually want for the get alls
@Service()
export default class Store {
  public store$: Record<Domains, BehaviorSubject<any>>;
  public isLoading: boolean;

  // These domains will be updated upon requests on a per-page basis.
  // Each page can set up with it need. User page only needs programs for that user so programs will be only the ones for that user
  // Programs page could do the same with pagination or filtering
  // This ensures every page has what they need pulling from this source but requesting from data access
  constructor() {
    // this.#chatService = cs;
    // domains
    this.store$ = {
      // TODO: Current User
      [Domains.User]: new BehaviorSubject<UserStoreValue>({}),
      [Domains.Program]: new BehaviorSubject<ProgramStoreValue>({}),
      [Domains.Result]: new BehaviorSubject<ResultStoreValue>({}),
      [Domains.School]: new BehaviorSubject<SchoolStoreValue>({}),
      [Domains.Thread]: new BehaviorSubject<ThreadStoreValue>({}),
      [Domains.Document]: new BehaviorSubject<DocumentStoreValue>({}),
      [Domains.Event]: new BehaviorSubject<EventStoreValue>({}),
      [Domains.File]: new BehaviorSubject<FileStoreValue>({}),
      [Domains.Collection]: new BehaviorSubject<CollectionStoreValue>({}),
      //TODO: This is only clientside so need to make it clearer maybe this is all just one store
      [Domains.AppState]: new BehaviorSubject<AppState>({} as AppState)
    };

    this.isLoading = false;
  }

  setIsLoading(isLoading: boolean) {
    this.isLoading = isLoading;
  }

  public async initDomainInStore(
    domainName: Domains,
    request: () => Promise<any>
  ) {
    return request()
      .then((data) => {
        const dataObject = arrayToObj(data);
        this.store$[domainName].next(dataObject);
      })
      .catch((err) => console.error(err));
  }

  public subscribeToStoreDomain(domainName: Domains, next: any) {
    this.store$[domainName].subscribe({ next });
  }

  // Used to connect all domains to the state manager updated
  public subscribeToStore(next: any) {
    Object.values(this.store$).forEach((domain$) => {
      domain$.subscribe({ next });
    });
  }

  public addItemToDomain<T>(domainName: Domains, item: T & { id?: IId }) {
    if (!item?.id) return;
    const newStore$ = { ...this.store$[domainName].value, [item.id]: item };
    this.store$[domainName].next(newStore$);
  }

  public addItemsToDomain<T>(domainName: Domains, items: T[] = []) {
    const newStore$ = { ...this.store$[domainName].value, ...items };
    this.store$[domainName].next(newStore$);
  }

  public deleteItemFromStore(domainName: Domains, id: IId) {
    const domain = { ...this.getDomainValue(domainName) };
    delete domain[id];
    this.store$[domainName].next(domain);
  }

  public updateDomainListItem<T>(
    domainName: Domains,
    updatedItem: T & { id?: IId }
  ) {
    if (!updatedItem.id) return;
    const updatedDomain = {
      ...this.store$[domainName].value,
      [updatedItem.id]: updatedItem
    };
    this.store$[domainName].next(updatedDomain);
  }

  // Returns an object
  public getDomainValue = (domainName: Domains) => {
    return this.store$[domainName].value;
  };

  public getDomainItem = <T>(domainName: Domains, id?: IId) => {
    if (!id) {
      throw new Error("No id Proved getDomainIntem");
    }
    return this.store$[domainName].value[id];
  };

  // Returns an array
  public getCurrentDomainItems = <T>(domainName: Domains): T[] => {
    return Object.values(this.store$[domainName].value);
  };

  // Returns an observable
  public getDomain$ = (domainName: Domains) => {
    return this.store$[domainName];
  };

  public getValueByPath = (domainName: Domains, path: string) => {
    return get(this.getDomainValue(domainName), path);
  };
}
