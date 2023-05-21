import React from "react";

import { Container } from "typedi";
import UIApi from "../../domains/uiApi/uiApi.Service";

export const BulkProgramsContainer = () => {
  const API = Container.get(UIApi);

  return (
    <div>
      <h1>BULK PROGRAMS</h1>
    </div>
  );
};
