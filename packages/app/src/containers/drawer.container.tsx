import React, { useState } from "react";
import { Drawer as ADrawer } from "antd";

import { useServices } from "../context";
import { Collections } from "@parsimony/types/src";
import { DrawerContentTypes } from "../services/appControls.service";
import { Chat, CreateChat } from "../containers";

export const Drawer = ({ content }: { content?: React.FC }) => {
  const [extended, updateExtended] = useState(false);
  const { appControls, store } = useServices();

  const controls = store.getCollectionValue(Collections.AppControls).drawer;

  if (!controls) return null;

  const onClose = () => {
    appControls.updateControls("drawer", {
      active: false
    });
  };

  const onExtend = () => {
    appControls.updateControls("drawer", {
      width: extended ? 500 : 1000
    });
    updateExtended(!extended);
  };

  return (
    <ADrawer
      placement={controls.placement || "left"}
      width={controls.width || "500"}
      onClose={onClose}
      open={controls.active}
    >
      <button onClick={onExtend}>{extended ? "collapse" : "extend"}</button>
      {controls.content === DrawerContentTypes.Chat && <Chat />}
      {controls.content === DrawerContentTypes.CreateChat && <CreateChat />}
    </ADrawer>
  );
};
