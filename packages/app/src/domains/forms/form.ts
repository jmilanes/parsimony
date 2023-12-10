import deepmerge from "deepmerge";
import AppStateService from "../state/appState/appStateService";
import { uuid } from "../../utils";

export class InputForm<D = Record<string, any>> {
  #id: string = uuid();
  #initialData: D;
  #ass: AppStateService;

  constructor(data: D, ass: AppStateService) {
    this.#initialData = data;
    this.#ass = ass;
    this.#ass.updateAppState("forms", { [this.#id]: data });
  }

  //com

  get Data() {
    return this.#ass.getAppState().forms[this.#id];
  }

  public updateData = (update: Partial<D>, deep?: boolean) => {
    const form = this.#ass.getAppState().forms[this.#id];
    const data = deep
      ? deepmerge(form, update)
      : {
          ...this.#ass.getAppState().forms[this.#id],
          ...update
        };
    this.#ass.updateAppState("forms", { [this.#id]: data });
  };

  public reset = () => {
    this.#ass.updateAppState("forms", { [this.#id]: this.#initialData });
  };

  public destroy = () => {
    // DElete the ID at the form
  };
}
