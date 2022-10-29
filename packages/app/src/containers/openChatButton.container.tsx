import React from "react";
import { useServices } from "../context";
import { Button } from "../components";

const OpenChatButton = () => {
  const { appControls } = useServices();

  const showDrawer = () => {
    appControls.updateControls("drawer", {
      active: true
    });
  };

  return <Button name="Show Chat" action={showDrawer} />;
};

export default OpenChatButton;
