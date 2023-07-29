import React, { useState } from "react";

import { BehaviorTracker, Domains, Program } from "@parsimony/types";
import { Button, Icon } from "../../../components";
import { Container } from "typedi";
import UIApi from "../../../domains/uiApi/uiApi.Service";
import { initialResultData } from "../../../fixtures";

export const TallyBehaviorInput = ({ program }: { program: Program }) => {
  const [count, updateCount] = useState<number>(0);
  const API = Container.get(UIApi);

  const action = async () => {
    const date = new Date();
    await API.makeRequest({
      domain: Domains.Result,
      requestType: "create",
      payload: {
        ...initialResultData,
        id: undefined,
        clientId: program?.clientId,
        programId: program?.id,
        behaviorData: { type: program.behavior?.type, tally: count },
        created_at: date,
        updated_at: date
      }
    });
  };

  const add = () => updateCount(count + 1);
  const remove = () => count > 0 && updateCount(count - 1);

  return (
    <div className="behavior-input-container" key={program.id}>
      <div className="flex-row">
        <div>
          <Button
            metaTestId={BehaviorTracker.tallyBtn}
            name="Tally"
            action={remove}
            icon={<Icon.BehaviorTallyRemove />}
          />
          <Button
            metaTestId={BehaviorTracker.tallyBtn}
            name="Tally"
            action={add}
            icon={<Icon.BehaviorTallyAdd />}
          />
        </div>
        <p>{program.title}</p>
      </div>
      {count > 0 && (
        <div className="count-container">
          <p className="tally-count">{count}</p>
          <Button
            metaTestId={BehaviorTracker.tallyBtn}
            name="Submit"
            action={action}
          />
        </div>
      )}
    </div>
  );
};
