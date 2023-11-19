import React from "react";

import { Button, Icon } from "../../components";
import { ProgramsPageMetaTestIds } from "@parsimony/types";
import { Container } from "typedi";
import UIApi from "../../../domains/accessApis/uiApi/uiApi.Service";
import { DrawerContentTypes } from "../../../domains/state/appState/appState.types";

// TODO MAKE THIS GENERIC
export const OpenBehaviorButton = () => {
  const API = Container.get(UIApi);

  const openBulkPrograms = () => {
    API.actions.drawer.open(DrawerContentTypes.BehaviorViewer);
    API.system.updateAppState("drawer", { placement: "right" });
  };

  const BulkProgramActiveState = API.system.getAppState("bulkPrograms").active;

  return (
    <Button
      name="Track Behavior"
      onClick={openBulkPrograms}
      icon={<Icon.BehaviorTracker />}
      metaTestId={ProgramsPageMetaTestIds.addProgramToClient}
    />
  );
};
