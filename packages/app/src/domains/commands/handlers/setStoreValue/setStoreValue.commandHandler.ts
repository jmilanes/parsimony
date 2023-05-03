import { Service } from "typedi";

import Store from "../../../../services/store";
import { ICommandHandler } from "../comandHandler.interface";
import AppControlsService, {
  AppControls,
  ControlPayloads
} from "../../../../services/appControls.service";

export class SetStoreValueOptions {
  public declare path: keyof AppControls;
  public declare update: ControlPayloads;
}

@Service()
export class SetStoreValueCommandHandler implements ICommandHandler {
  #store: Store;
  #acs: AppControlsService;

  constructor(store: Store, acs: AppControlsService) {
    this.#store = store;
    this.#acs = acs;
  }

  //@ts-ignore
  public execute = (options: SetStoreValueOptions) => {
    this.#acs.updateControls(options.path, options.update);
  };
}
