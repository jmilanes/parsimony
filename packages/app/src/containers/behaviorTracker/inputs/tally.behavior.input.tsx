import React from "react";

import { BehaviorTracker, Domains, Program } from "@parsimony/types";
import { Button, Icon } from "../../../components";
import { Container } from "typedi";
import UIApi from "../../../domains/uiApi/uiApi.Service";

export const TallyBehaviorInput = ({ program }: { program: Program }) => {
  const API = Container.get(UIApi);
  const count = API.actions.tally.getCounter(program);
  const safeCount = count || 0;
  return (
    <div className="behavior-input-container" key={program.id}>
      <div className="flex-row">
        <div>
          <Button
            metaTestId={BehaviorTracker.tallyBtn}
            name="Tally"
            action={() => API.actions.tally.decrement(program)}
            icon={<Icon.BehaviorTallyRemove />}
          />
          <Button
            metaTestId={BehaviorTracker.tallyBtn}
            name="Tally"
            action={() => API.actions.tally.increment(program)}
            icon={<Icon.BehaviorTallyAdd />}
          />
        </div>
        <p>{program.title}</p>
      </div>
      {safeCount > 0 && (
        <div className="count-container">
          <p className="tally-count">{count}</p>
          <Button
            metaTestId={BehaviorTracker.tallyBtn}
            name="Submit"
            action={() => API.actions.tally.submit(program, count)}
          />
        </div>
      )}
    </div>
  );
};
