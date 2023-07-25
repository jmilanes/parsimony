import React from "react";

import { BehaviorTracker, Domains, Program } from "@parsimony/types";
import { Button, Icon } from "../../../components";
import { Container } from "typedi";
import UIApi from "../../../domains/uiApi/uiApi.Service";
import { initialResultData } from "../../../fixtures";
import { getFullDate } from "../../../utils";

export const TallyBehaviorInput = (program: Program) => {
  const API = Container.get(UIApi);

  const action = async () => {
    const date = new Date();
    const fy = getFullDate(date);
    await API.makeRequest({
      domain: Domains.Result,
      requestType: "create",
      payload: {
        ...initialResultData,
        id: undefined,
        clientId: program?.clientId,
        programId: program?.id,
        behaviorData: { type: program.behavior?.type, tally: 1 },
        created_at: date,
        updated_at: date
      }
    });
  };

  return (
    <li key={program.id}>
      {program.title}{" "}
      <Button
        metaTestId={BehaviorTracker.tallyBtn}
        name="Tally"
        action={action}
        icon={<Icon.BehaviorTally />}
      />
    </li>
  );
};
