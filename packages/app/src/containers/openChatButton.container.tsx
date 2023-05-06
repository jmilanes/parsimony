import React from "react";
import { Button, Icon } from "../components";
import { NavMetaTestIds } from "@parsimony/types";
import { Container } from "typedi";
import UIApi from "../domains/uiApi/uiApi.Service";

export const OpenChatButton = () => {
  const API = Container.get(UIApi);

  const showDrawer = () => {
    API.updateAppControls("drawer", { active: true });
  };

  return (
    <Button
      name="Show Chat"
      action={showDrawer}
      icon={<Icon.Chat />}
      metaTestId={NavMetaTestIds.chatBtn}
    />
  );
};
