import React, { useState } from "react";
import { Drawer as ADrawer, Spin } from "antd";
import { Domains, DrawerMetaTestIds } from "@parsimony/types";
import {
  DrawerContentTypes,
  DrawerControls
} from "../services/appControls.service";
import { Chat, CreateChat } from "../containers";
import { Button, Icon } from "../components";
import { useAsync } from "react-use";
import { Container } from "typedi";

import UIApi from "../domains/uiApi/uiApi.Service";

export const Drawer = () => {
  const API = Container.get(UIApi);
  const [extended, updateExtended] = useState(false);

  const controls = API.getStoreValueByPath(Domains.AppControls, "drawer");
  if (!controls) return null;

  const onClose = () => {
    API.updateAppControls("drawer", { active: false });
  };

  const onExtend = async () => {
    await API.updateAppControls("drawer", {
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
