import React from "react";
import { Button, Icon } from "../../components";
import { NavMetaTestIds } from "@parsimony/types/dist";
import { DrawerContentTypes } from "../../../domains/state/appState/appState.types";
import { Container } from "typedi";
import UIApi from "../../../domains/accessApis/uiApi/uiApi.Service";

export const OpenChatButton = () => {
  const API = Container.get(UIApi);
  return (
    <Button
      name="Show Chat"
      action={() => API.actions.drawer.open(DrawerContentTypes.Chat)}
      icon={<Icon.Chat />}
      metaTestId={NavMetaTestIds.chatBtn}
    />
  );
};
