import { Domains } from "@parsimony/types";
import { clone } from "../../../utils";
import Store from "../store/store";
import { Service } from "typedi";
import { AppState } from "./appState.types";
import { APP_STATE } from "./initialAppStateTree";

@Service()
export default class AppStateService {
  store: Store;
  appState: AppState;

  constructor(store: Store) {
    //@ts-ignore
    window.getAppState = this.getAppState;

    this.store = store;
    this.appState = APP_STATE;
  }

  init = () => {
    this.store.getDomain$(Domains.AppState).next(this.appState);
  };

  public getAppState = () => {
    return this.store.getDomainValue(Domains.AppState);
  };

  public getAppStateByKey = <K extends keyof AppState>(
    appStateKey: K
  ): AppState[K] => {
    return this.store.getValueByPath(Domains.AppState, appStateKey);
  };

  public updateAppState = <K extends keyof AppState>(
    appStateKey: K,
    update: Partial<AppState[K]>
  ) => {
    // TODO: Make this better
    const currentControls = clone(this.store.getDomainValue(Domains.AppState));

    currentControls[appStateKey] = {
      ...(currentControls[appStateKey] as Record<string, any>),
      ...update
    };

    this.store.getDomain$(Domains.AppState).next({ ...currentControls });
  };

  public resetAppStateByKey = (appStateKey: keyof AppState) => {
    const currentControls = clone(this.store.getDomainValue(Domains.AppState));
    currentControls[appStateKey] = APP_STATE[appStateKey];
    this.store.getDomain$(Domains.AppState).next({ ...currentControls });
  };
}
