import React from "react";
import { Button, Icon } from "../components";
import { NavMetaTestIds } from "@parsimony/types";
import { DrawerContentTypes } from "../services/appStateService";
import { Container } from "typedi";
import UIApi from "../domains/uiApi/uiApi.Service";

export const OpenChatButton = () => {
  const API = Container.get(UIApi);
  return (
    <Button
      name="Show Chat"
      action={() => API.actions.drawer.setDrawerActive(DrawerContentTypes.Chat)}
      icon={<Icon.Chat />}
      metaTestId={NavMetaTestIds.chatBtn}
    />
  );
};
