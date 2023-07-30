import { DrawerContentTypes } from "../../services/appStateService";
import { Container } from "typedi";
import UIApi from "../../domains/uiApi/uiApi.Service";

export const getDrawerState = () => {
  const API = Container.get(UIApi);
  return API.getAppState("drawer");
};

export const setDrawerActive = (content: DrawerContentTypes) => {
  const API = Container.get(UIApi);
  API.updateAppState("drawer", {
    active: true,
    content
  });
};
