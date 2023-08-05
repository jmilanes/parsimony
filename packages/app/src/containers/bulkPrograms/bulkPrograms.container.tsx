import React from "react";

import { Container } from "typedi";
import UIApi from "../../domains/uiApi/uiApi.Service";
import { Button, Header, IOption } from "../../components";
import { ClientSelector } from "../clientSelector";
import { BulKProgramMetaTestIds, Domains } from "@parsimony/types";
import { omit } from "ramda";
import { message } from "antd";
import { Tree } from "../../components/tree.componet";
import { findTopLevelCollection } from "../../utils";

//TODO Most of this can get moved to actions
export const BulkProgramsContainer = () => {
  const API = Container.get(UIApi);

  const resetBulkPrograms = () =>
    API.system.updateAppState("bulkPrograms", {
      clientId: undefined,
      excludedIds: [],
      collectionIds: [],
      programIds: [],
      subscribers: []
    });

  const onChange = (option: IOption) => {
    resetBulkPrograms();
    if (option === null) {
      API.system.updateAppState("bulkPrograms", {
        active: false
      });
      return;
    }

    API.system.updateAppState("bulkPrograms", {
      active: true,
      clientId: option.value as string
    });

    API.system.updateAppState("drawer", {
      active: false
    });
  };

  const onAdd = async () => {
    const payload = omit(["active"], API.system.getAppState("bulkPrograms"));

    try {
      await API.system.makeRequest({
        domain: Domains.Program,
        requestType: "addProgramsToClient",
        payload
      });
      resetBulkPrograms();
      API.system.updateAppState("bulkPrograms", {
        active: false
      });
      API.system.updateAppState("drawer", {
        active: false
      });
    } catch (e) {
      message.error("Programs Not Added To Client");
    }
  };

  const selectedCollections = API.system
    .getAppState("bulkPrograms")
    .collectionIds.map((id) => API.system.getItem(Domains.Collection, id));

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

  return (
    <div>
      <Header text="Add Programs to Clients" size="md" />
      <ClientSelector onChange={onChange} multiSelect={false} />
      <Button
        name="Add Progams To ClientTo Client"
        metaTestId={BulKProgramMetaTestIds.addToClientBtn}
        action={onAdd}
      />
      <Header text="Selected Programs:" size="sm" marginTop={20} />
      <Tree
        collections={filteredCollections}
        actions={{
          onClose
        }}
      />
    </div>
  );
};
