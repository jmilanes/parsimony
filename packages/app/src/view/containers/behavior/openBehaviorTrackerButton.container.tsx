import React from "react";

import { Button, Icon } from "../../components";
import { NavMetaTestIds } from "@parsimony/types";
import { Container } from "typedi";
import UIApi from "../../../domains/accessApis/uiApi/uiApi.Service";
import { DrawerContentTypes } from "../../../domains/state/appState/appState.types";

// TODO MAKE TOGGLE BUTTON THIS GENERIC
export const OpenBehaviorButton = () => {
  const API = Container.get(UIApi);

  const openBulkPrograms = () => {
    API.actions.drawer.open(DrawerContentTypes.BehaviorViewer);
    API.system.updateAppState("drawer", { placement: "right" });
  };

  return (
    <Button
      name="Track Behavior"
      onClick={openBulkPrograms}
      icon={<Icon.BehaviorTracker />}
      metaTestId={NavMetaTestIds.openBehhaviorSideBar}
    />
  );
};
