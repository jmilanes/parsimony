import React, { useState } from "react";
import { Drawer as ADrawer } from "antd";

import { useServices } from "../context";
import { Collections, DrawerMetaTestIds } from "@parsimony/types";
import { DrawerContentTypes } from "../services/appControls.service";
import { Chat, CreateChat } from "../containers";
import { Button, Icon } from "../components";

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
      width: extended ? "50%" : "90%"
    });
    updateExtended(!extended);
  };

  return (
    <ADrawer
      placement={controls.placement || "left"}
      width={controls.width || "50%"}
      onClose={onClose}
      open={controls.active}
      extra={
        <Button
          metaTestId={DrawerMetaTestIds.extendBtn}
          action={onExtend}
          name={extended ? "collapse" : "extend"}
          icon={extended ? <Icon.Collapse /> : <Icon.Expand />}
        />
      }
    >
      {controls.content === DrawerContentTypes.Chat && <Chat />}
      {controls.content === DrawerContentTypes.CreateChat && <CreateChat />}
    </ADrawer>
  );
};
