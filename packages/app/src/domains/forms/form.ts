import deepmerge from "deepmerge";
import AppStateService from "../services/appStateService";
import { uuid } from "../../utils";

export class InputForm<D = Record<string, any>> {
  #id: string = uuid();
  #initalData: D;
  #ass: AppStateService;

  constructor(data: D, ass: AppStateService) {
    this.#initalData = data;
    this.#ass = ass;
    this.#ass.updateAppState("forms", { [this.#id]: data });
  }

  get Data() {
    return this.#ass.getAppState().forms[this.#id];
  }

  public updateData = (update: Partial<D>) => {
    const data = deepmerge(this.#ass.getAppState().forms[this.#id], update);
    this.#ass.updateAppState("forms", { [this.#id]: data });
  };

  public reset = () => {
    this.#ass.updateAppState("forms", { [this.#id]: this.#initalData });
  };
}
