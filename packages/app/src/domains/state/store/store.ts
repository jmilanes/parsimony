import {
  Domains,
  IId,
  Program,
  Result,
  User,
  Collection,
  Thread
} from "@parsimony/types";
import { BehaviorSubject, merge } from "rxjs";
import { arrayToObj } from "../../../utils";
import { AppState } from "../appState/appState.types";
import { Service } from "typedi";

import { get } from "lodash";

export interface DomainReturnTypeMap {
  [Domains.Program]: Program;
  [Domains.Collection]: Collection;
  [Domains.User]: User;
  [Domains.Result]: Result;
  [Domains.Thread]: Thread;
  [Domains.AppState]: AppState;
}

type UserStoreValue = Record<IId, User>;
type ProgramStoreValue = Record<IId, Program>;
type ResultStoreValue = Record<IId, Result>;
type ThreadStoreValue = Record<IId, Thread>;

//TODO: THink about removing these

type CollectionStoreValue = Record<IId, Collection>;

type StoreValues = {
  [Domains.User]: UserStoreValue;
  [Domains.Program]: ProgramStoreValue;
  [Domains.Result]: ResultStoreValue;
  [Domains.Thread]: ThreadStoreValue;
  [Domains.Collection]: CollectionStoreValue;
  //TODO: This is only clientside so need to make it clearer maybe this is all just one store
  [Domains.AppState]: AppState;
};

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
      [Domains.User]: new BehaviorSubject<UserStoreValue>({}),
      [Domains.Program]: new BehaviorSubject<ProgramStoreValue>({}),
      [Domains.Result]: new BehaviorSubject<ResultStoreValue>({}),
      [Domains.Thread]: new BehaviorSubject<ThreadStoreValue>({}),
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
    merge(...Object.values(this.store$)).subscribe({ next });
  }

  public addItemByDomain<T>(domainName: Domains, item: T & { id?: IId }) {
    if (!item?.id) return;
    const newStore$ = { ...this.store$[domainName].value, [item.id]: item };
    this.store$[domainName].next(newStore$);
  }

  public addItemsByDomain<T>(domainName: Domains, items: T[] = []) {
    const newStore$ = { ...this.store$[domainName].value, ...items };
    this.store$[domainName].next(newStore$);
  }

  public deleteItemByDomain(domainName: Domains, id: IId) {
    const domain = { ...this.getCurrentValueByDomain(domainName) };
    delete domain[id];
    this.store$[domainName].next(domain);
  }

  public updateItemByDomain<T>(
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
  public getCurrentValueByDomain = (domainName: Domains) => {
    return this.store$[domainName].value;
  };

  public getItemByDomain = <T>(domainName: Domains, id?: IId) => {
    if (!id) {
      throw new Error("No id Proved getItemByDomain");
    }
    return this.store$[domainName].value[id];
  };

  public getAllItemsByDomain = <T>(domainName: Domains): T[] => {
    return Object.values(this.store$[domainName].value);
  };

  // Returns an observable
  public getDomain$ = (domainName: Domains) => {
    return this.store$[domainName];
  };

  public getValueByPath = (domainName: Domains, path: string) => {
    return get(this.getCurrentValueByDomain(domainName), path);
  };
}
