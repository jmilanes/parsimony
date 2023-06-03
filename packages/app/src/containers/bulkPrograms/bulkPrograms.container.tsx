import React from "react";

import { Container } from "typedi";
import UIApi from "../../domains/uiApi/uiApi.Service";
import { Header, IOption, Button } from "../../components";
import { ClientSelector } from "../clientSelector";
import { BulKProgramMetaTestIds, Domains } from "@parsimony/types";
import { omit, tryCatch } from "ramda";
import { message } from "antd";

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

  return (
    <div>
      <Header text="Add Programs to Clients" size="md" />
      <ClientSelector onChange={onChange} multiSelect={false} />
      <Button
        name="Add To Client"
        metaTestId={BulKProgramMetaTestIds.addToClientBtn}
        action={onAdd}
      />
    </div>
  );
};
