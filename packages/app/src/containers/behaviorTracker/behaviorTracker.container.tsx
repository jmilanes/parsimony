import React from "react";

import { Container } from "typedi";
import UIApi from "../../domains/uiApi/uiApi.Service";
import { Header, IOption } from "../../components";

export const BehaviorTrackerContainer = () => {
  const API = Container.get(UIApi);

  return (
    <div>
      <Header text="Client Behaviors" size="md" />
    </div>
  );
};
