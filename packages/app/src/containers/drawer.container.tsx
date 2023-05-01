import React, { useState } from "react";
import { Drawer as ADrawer } from "antd";

import { useServices } from "../context";
import { Domains, DrawerMetaTestIds } from "@parsimony/types";
import {
  DrawerContentTypes,
  DrawerControls
} from "../services/appControls.service";
import { Chat, CreateChat } from "../containers";
import { Button, Icon } from "../components";

export const Drawer = ({ content }: { content?: React.FC }) => {
  const [extended, updateExtended] = useState(false);
  const { appControls, commandService } = useServices();

  const controls = commandService.api.getValue<DrawerControls>({
    domain: Domains.AppControls,
    path: "drawer"
  });

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
