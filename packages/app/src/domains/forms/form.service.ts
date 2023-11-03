import { Service } from "typedi";
import { InputForm } from "./form";

import AppStateService from "../state/appState/appStateService";

@Service()
export class FormService {
  #ass: AppStateService;

  constructor(ass: AppStateService) {
    this.#ass = ass;
  }

  create<D = Record<string, any>>(initialData: D) {
    return new InputForm<D>(initialData, this.#ass);
  }
}
