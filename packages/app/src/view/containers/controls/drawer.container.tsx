import React, { useState } from "react";
import { Drawer as ADrawer } from "antd";
import { Domains, DrawerMetaTestIds } from "@parsimony/types/dist";
import { DrawerContentTypes } from "../../../domains/state/appState/appState.types";
import {
  BehaviorTrackerContainer,
  BulkProgramsContainer,
  Chat,
  CreateChat,
  ProgramViewContainer
} from "../index";
import { Button, Icon } from "../../components";
import { Container } from "typedi";

import UIApi from "../../../domains/accessApis/uiApi/uiApi.Service";

export const Drawer = () => {
  const API = Container.get(UIApi);
  const [extended, updateExtended] = useState(false);

  const controls = API.system.getStoreValueByPath(Domains.AppState, "drawer");
  if (!controls) return null;

  const onClose = () => {
    API.actions.drawer.close();
  };

  const onExtend = async () => {
    await API.system.updateAppState("drawer", {
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
      {controls.content === DrawerContentTypes.BehaviorViewer && (
        <BehaviorTrackerContainer />
      )}
      {controls.content === DrawerContentTypes.BulkPrograms && (
        <BulkProgramsContainer />
      )}
      {controls.content === DrawerContentTypes.ProgramSelector && (
        <ProgramViewContainer />
      )}
    </ADrawer>
  );
};
