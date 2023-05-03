import React from "react";
import { useServices } from "../context";
import { Button, Icon } from "../components";
import { NavMetaTestIds } from "@parsimony/types";
import { Container } from "typedi";
import { CommandService } from "../domains/commands/command.service";

export const OpenChatButton = () => {
  const CS = Container.get(CommandService);

  const showDrawer = () => {
    CS.api.setStoreValue({
      path: "drawer",
      update: {
        active: true
      }
    });
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
