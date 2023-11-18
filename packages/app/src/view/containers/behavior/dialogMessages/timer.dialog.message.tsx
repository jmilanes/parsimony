import React from "react";
import { Container } from "typedi";
import UIApi from "../../../../domains/accessApis/uiApi/uiApi.Service";
import {
  AddModalControls,
  Domains,
  Program,
  ProgramsPageMetaTestIds
} from "@parsimony/types";
import { Button, Field } from "../../../components";

export const TimerSubmitDialogMessage = ({ program }: { program: Program }) => {
  const API = Container.get(UIApi);
  const user = API.system.getItem(Domains.User, program.clientId || "");
  const [localTime, updateLocalTime] = React.useState(
    API.actions.timer.getFormattedTimerTime(program)
  );
  return (
    <div>
      <p>Did {user.firstName}:</p> <p>{program.description}</p>
      <Field
        placeHolderText="Update Time"
        value={localTime}
        updateState={(_p, v) => {
          updateLocalTime(v);
          API.actions.timer.updateTimeState(program.id, {
            time: API.actions.timer.resolveFormattedTIme(v)
          });
        }}
        metaTestId={ProgramsPageMetaTestIds.titleField}
      />
    </div>
  );
};
