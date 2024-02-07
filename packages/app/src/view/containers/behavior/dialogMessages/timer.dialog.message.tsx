import React from "react";
import { Container } from "typedi";
import UIApi from "../../../../domains/accessApis/uiApi/uiApi.Service";
import { Domains, Program, CollectionPageMetaTestIds } from "@parsimony/types";
import { Field } from "../../../components";

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
        onChange={(value) => {
          updateLocalTime(value);
          API.actions.timer.updateTimeState(program.id, {
            time: API.actions.timer.resolveFormattedTIme(value)
          });
        }}
        metaTestId={CollectionPageMetaTestIds.addProgramFormTitleField}
      />
    </div>
  );
};
