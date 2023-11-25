import { Service } from "typedi";
import { Program } from "@parsimony/types";
import { buildCreateBehaviorRequest, clone } from "../../../../utils";
import CoreApi from "../../../accessApis/coreApi/coreApi.service";
import { BehaviorClient, BehaviorTracker, Interval } from "../appState.types";

const initialBehaviorClient: Omit<BehaviorClient, "id"> = {
  active: true,
  createdBehaviorIds: []
};

@Service()
export class BehaviorTrackerActions {
  #api: CoreApi;

  constructor(_api: CoreApi) {
    this.#api = _api;
  }

  currentState() {
    return this.#api.getAppState("behaviorTracker");
  }

  updateState(update: Partial<BehaviorTracker>) {
    return this.#api.updateAppState("behaviorTracker", update);
  }

  destroyClients() {
    this.updateState({ clients: {} });
  }

  addClient(id: string) {
    const clients = this.currentClients();
    this.updateState({
      clients: { ...clients, [id]: { id, ...initialBehaviorClient } }
    });
  }

  deleteClient(id: string) {
    const clients = clone(this.currentClients());
    delete clients[id];
    this.updateState({ clients });
  }

  destroyBehaviorsForClient(programs: Program[]) {
    const timers = clone(this.currentState().timers);
    const counters = clone(this.currentState().counters);
    const intervals = clone(this.currentState().intervals);
    for (const { id } of programs) {
      if (timers[id]) {
        clearInterval(timers[id].intervalId);
        delete timers[id];
        continue;
      }
      if (counters[id]) {
        delete counters[id];
        continue;
      }
      if (intervals[id]) {
        clearInterval(intervals[id].intervalId);
        delete intervals[id];
      }
    }

    this.updateState({ timers, counters, intervals });
  }

  updateClient(id: string, update: Partial<BehaviorClient>) {
    const clients = this.currentClients();
    const client = clients[id];
    this.updateState({
      clients: { ...clients, [id]: { ...client, ...update } }
    });
  }

  setActiveClientTrue(id: string) {
    this.updateClient(id, { active: true });
  }

  getActiveState(id: string) {
    return this.currentClients()[id]?.active;
  }

  setActiveClientFalse(id: string) {
    this.updateClient(id, { active: false });
  }

  currentClients() {
    return this.currentState().clients;
  }

  currentValues() {
    return Object.values(this.currentState().clients);
  }

  clientCount() {
    return Object.keys(this.currentClients()).length;
  }
}
