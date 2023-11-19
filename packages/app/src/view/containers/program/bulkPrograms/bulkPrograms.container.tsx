import React from "react";

import { Container } from "typedi";
import UIApi from "../../../../domains/accessApis/uiApi/uiApi.Service";
import { Button, Header, IOption } from "../../../components";
import { ClientSelector } from "../../shared/clientSelector";
import { BulKProgramMetaTestIds, Domains } from "@parsimony/types";
import { CollectionTree } from "../../../components/tree.componet";
import { findTopLevelCollection } from "../../../../utils";

export const BulkProgramsContainer = () => {
  const API = Container.get(UIApi);

  const onChange = (option: IOption) => {
    if (!option.value) {
      API.actions.bulkPrograms.resetBulkProgram();
    }
    API.actions.bulkPrograms.startSelections(option.value as string);
  };

  const selectedCollections = API.system
    .getAppState("bulkPrograms")
    .collectionIds.map((id) => API.system.getItem(Domains.Collection, id));

  const orphanPrograms = API.system
    .getAppState("bulkPrograms")
    .programIds.map((id) => API.system.getItem(Domains.Program, id));

  const { ret: topLevelCollections } =
    findTopLevelCollection(selectedCollections);

  const filteredCollections = topLevelCollections.filter(
    (collection) =>
      !API.actions.bulkPrograms.isIdIncludedInBulkProgramProperty(
        collection.id,
        "excludedIds"
      )
  );

  const onClose = (id: string, isProgram = false) => {
    API.actions.bulkPrograms.addIdToBulkProgramProperty(id, "excludedIds");
    API.actions.bulkPrograms.removeIdFromBulkProgramProperty(
      id,
      isProgram ? "programIds" : "collectionIds"
    );
  };

  const selectedClient = API.system.getAppState("bulkPrograms").clientId;

  return (
    <div>
      <div className="bulk-program-header">
        <Header text="Add Programs to Clients" size="md" />
        <Button
          name="Add"
          type="contained"
          metaTestId={BulKProgramMetaTestIds.addToClientBtn}
          onClick={API.actions.bulkPrograms.submitBulkPrograms}
        />
      </div>
      <ClientSelector
        onChange={onChange}
        multiSelect={false}
        selected={selectedClient}
        onCancel={() => API.actions.bulkPrograms.resetBulkProgram()}
      />

      {selectedClient && (
        <CollectionTree
          clientName={
            API.actions.bulkPrograms.getSelectedClient()?.firstName || ""
          }
          orphanPrograms={orphanPrograms}
          collections={filteredCollections}
          actions={{
            onClose
          }}
        />
      )}
    </div>
  );
};
