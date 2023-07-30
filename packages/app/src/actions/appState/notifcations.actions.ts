import { Container } from "typedi";
import UIApi from "../../domains/uiApi/uiApi.Service";
import { uuid } from "../../utils";
import { Notification } from "../../services/appStateService";

export const addNotification = (n: Omit<Notification, "id">) => {
  const API = Container.get(UIApi);
  const id = uuid();
  const notifications = API.getAppState("notifications").activeNotifications;
  API.updateAppState("notifications", {
    activeNotifications: {
      ...notifications,
      [id]: { ...n, id }
    }
  });
};

export const removeNotification = (id: string) => {
  const API = Container.get(UIApi);
  const notifications = API.getAppState("notifications").activeNotifications;
  const update = { ...notifications };
  delete update[id];
  API.updateAppState("notifications", { activeNotifications: update });
};
