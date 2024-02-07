import React from "react";
import { Button } from "../../../components";
import {
  BulKProgramMetaTestIds,
  CollectionPageMetaTestIds
} from "@parsimony/types";
import { Container } from "typedi";
import UIApi from "../../../../domains/accessApis/uiApi/uiApi.Service";
import { DrawerContentTypes } from "../../../../domains/state/appState/appState.types";

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
        onClick={openBulkPrograms}
        metaTestId={CollectionPageMetaTestIds.addProgramToClientBtn}
      />
      {bulkProgramActiveState && (
        <Button
          name="Add Selected"
          type="contained"
          metaTestId={BulKProgramMetaTestIds.addToClientBtn}
          onClick={API.actions.bulkPrograms.submitBulkPrograms}
        />
      )}
    </div>
  );
};
