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

export const BulkProgramsContainer = () => {
  const API = Container.get(UIApi);

  const resetBulkPrograms = () =>
    API.updateAppState("bulkPrograms", {
      clientId: undefined,
      excludedIds: [],
      collectionIds: [],
      programIds: [],
      subscribers: []
    });

  const onChange = (option: IOption) => {
    resetBulkPrograms();
    if (option === null) {
      API.updateAppState("bulkPrograms", {
        active: false
      });
      return;
    }

    API.updateAppState("bulkPrograms", {
      active: true,
      clientId: option.value as string
    });

    API.updateAppState("drawer", {
      active: false
    });
  };

  const onAdd = async () => {
    const payload = omit(["active"], API.getAppState("bulkPrograms"));

    try {
      await API.makeRequest({
        domain: Domains.Program,
        requestType: "addProgramsToClient",
        payload
      });
      resetBulkPrograms();
      API.updateAppState("bulkPrograms", {
        active: false
      });
      API.updateAppState("drawer", {
        active: false
      });
    } catch (e) {
      message.error("Programs Not Added To Client");
    }
  };

  const selectedClientIds = API.getAppState("bulkPrograms").collectionIds.map(
    (id) => API.getItem(Domains.Collection, id)
  );

  const { ret: topLevelCollections } =
    findTopLevelCollection(selectedClientIds);

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
      <Tree collections={topLevelCollections} />
    </div>
  );
};
