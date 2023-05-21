import React, { useState } from "react";
import { Drawer as ADrawer, Spin } from "antd";
import { Domains, DrawerMetaTestIds } from "@parsimony/types";
import { DrawerContentTypes } from "../services/appStateService";
import { BulkProgramsContainer, Chat, CreateChat } from "../containers";
import { Button, Icon } from "../components";
import { Container } from "typedi";

import UIApi from "../domains/uiApi/uiApi.Service";

export const Drawer = () => {
  const API = Container.get(UIApi);
  const [extended, updateExtended] = useState(false);

  const controls = API.getStoreValueByPath(Domains.AppState, "drawer");
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
      {controls.content === DrawerContentTypes.BulkPrograms && (
        <BulkProgramsContainer />
      )}
    </ADrawer>
  );
};
