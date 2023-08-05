import React from "react";
import { Button } from "../../components";
import { ProgramsPageMetaTestIds } from "@parsimony/types";
import { Container } from "typedi";
import UIApi from "../../domains/uiApi/uiApi.Service";
import { DrawerContentTypes } from "../../services/appStateService";

export const OpenBulkProgramButton = () => {
  const API = Container.get(UIApi);

  const openBulkPrograms = () => {
    API.actions.drawer.setDrawerActive(DrawerContentTypes.BulkPrograms);
  };

  const BulkProgramActiveState = API.system.getAppState("bulkPrograms").active;

  const name = BulkProgramActiveState
    ? "See Selections"
    : "Add Programs To Clients";

  return (
    <Button
      name={name}
      action={openBulkPrograms}
      metaTestId={ProgramsPageMetaTestIds.addProgramToClient}
    />
  );
};
