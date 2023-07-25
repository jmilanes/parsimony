import React from "react";

import { Button, Icon } from "../../components";
import { ProgramsPageMetaTestIds } from "@parsimony/types";
import { Container } from "typedi";
import UIApi from "../../domains/uiApi/uiApi.Service";
import { DrawerContentTypes } from "../../services/appStateService";

// TODO MAKE THIS GENERIC
export const OpenBehaviorButton = () => {
  const API = Container.get(UIApi);

  const openBulkPrograms = () => {
    API.actions.drawer.setDrawerActive(DrawerContentTypes.BehaviorViewer);
    API.updateAppState("drawer", { placement: "right" });
  };

  const BulkProgramActiveState = API.getAppState("bulkPrograms").active;

  return (
    <Button
      name="Track Behavior"
      action={openBulkPrograms}
      icon={<Icon.BehaviorTracker />}
      metaTestId={ProgramsPageMetaTestIds.addProgramToClient}
    />
  );
};
