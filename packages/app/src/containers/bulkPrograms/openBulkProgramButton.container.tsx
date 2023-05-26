import React from "react";
import { Button } from "../../components";
import { ProgramsPageMetaTestIds } from "@parsimony/types";
import { Container } from "typedi";
import UIApi from "../../domains/uiApi/uiApi.Service";
import { DrawerContentTypes } from "../../services/appStateService";

export const OpenBulkProgramButton = ({ key }: { key: string }) => {
  const API = Container.get(UIApi);

  const openBulkPrograms = () => {
    API.actions.drawer.setDrawerActive(DrawerContentTypes.BulkPrograms);
  };

  const BulkProgramActiveState = API.getAppState("bulkPrograms").active;

  const name = BulkProgramActiveState
    ? "See Selections"
    : "Add Programs To Clients";

  return (
    <Button
      key={key}
      name={name}
      action={openBulkPrograms}
      metaTestId={ProgramsPageMetaTestIds.addProgramToClient}
    />
  );
};
