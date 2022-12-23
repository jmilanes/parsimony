import React from "react";
import { useServices } from "../context";
import { Button, Icon } from "../components";
import { NavDataIds } from "@parsimony/types/src";

export const OpenChatButton = () => {
  const { appControls } = useServices();

  const showDrawer = () => {
    appControls.updateControls("drawer", {
      active: true
    });
  };

  return (
    <Button
      name="Show Chat"
      action={showDrawer}
      icon={<Icon.Chat />}
      dataTestId={NavDataIds.chatBtn}
    />
  );
};
