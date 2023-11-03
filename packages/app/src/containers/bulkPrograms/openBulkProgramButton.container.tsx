import React from "react";
import { Button } from "../../components";
import {
  BulKProgramMetaTestIds,
  ProgramsPageMetaTestIds
} from "@parsimony/types";
import { Container } from "typedi";
import UIApi from "../../domains/accessApis/uiApi/uiApi.Service";
import { DrawerContentTypes } from "../../services/appStateService";

export const OpenBulkProgramButton = () => {
  const API = Container.get(UIApi);

  const openBulkPrograms = () => {
    API.actions.drawer.open(DrawerContentTypes.BulkPrograms);
  };

  const bulkProgramActiveState = API.system.getAppState("bulkPrograms").active;

  const name = bulkProgramActiveState
    ? "See Selections"
    : "Add Programs To Clients";

  return (
    <div className="bulk-program-buttons">
      <Button
        name={name}
        action={openBulkPrograms}
        metaTestId={ProgramsPageMetaTestIds.addProgramToClient}
      />
      {bulkProgramActiveState && (
        <Button
          name="Add Selected"
          type="contained"
          metaTestId={BulKProgramMetaTestIds.addToClientBtn}
          action={API.actions.bulkPrograms.submitBulkPrograms}
        />
      )}
    </div>
  );
};
