import React from "react";
import { useServices } from "../context";
import { Button } from "../components";

export const OpenChatButton = () => {
  const { appControls } = useServices();

  const showDrawer = () => {
    appControls.updateControls("drawer", {
      active: true
    });
  };

  return <Button name="Show Chat" action={showDrawer} />;
};
