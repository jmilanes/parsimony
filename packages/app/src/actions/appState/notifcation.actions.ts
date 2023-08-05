import { Service } from "typedi";

import { uuid } from "../../utils";
import { Notification } from "../../services/appStateService";
import CoreApi from "../../domains/coreApi/coreApi.service";

@Service()
export class NotifcationActions {
  #api: CoreApi;

  constructor(_api: CoreApi) {
    this.#api = _api;
  }

  public addNotification = (n: Omit<Notification, "id">) => {
    const id = uuid();
    const notifications =
      this.#api.getAppState("notifications").activeNotifications;
    this.#api.updateAppState("notifications", {
      activeNotifications: {
        ...notifications,
        [id]: { ...n, id }
      }
    });
  };

  public removeNotification = (id: string) => {
    const notifications =
      this.#api.getAppState("notifications").activeNotifications;
    const update = { ...notifications };
    delete update[id];
    this.#api.updateAppState("notifications", { activeNotifications: update });
  };
}
