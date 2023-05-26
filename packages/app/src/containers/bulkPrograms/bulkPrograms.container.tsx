import React from "react";

import { Container } from "typedi";
import UIApi from "../../domains/uiApi/uiApi.Service";
import { Header, IOption } from "../../components";
import { ClientSelector } from "../clientSelector";

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

  return (
    <div>
      <Header text="Add Programs to Clients" size="md" />
      <ClientSelector onChange={onChange} multiSelect={false} />
    </div>
  );
};
