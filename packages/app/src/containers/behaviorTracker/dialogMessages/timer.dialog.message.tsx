import React from "react";
import { Container } from "typedi";
import UIApi from "../../../domains/uiApi/uiApi.Service";
import { Domains, Program } from "@parsimony/types";

export const TimerSubmitDialogMessage = ({ program }: { program: Program }) => {
  const API = Container.get(UIApi);
  const user = API.system.getItem(Domains.User, program.clientId || "");
  return (
    <div>
      <p>
        <p>Did {user.firstName}:</p> <p>{program.description}</p>
      </p>
      <p>{`for ${API.actions.timer.getFormattedTimerTime(program)}`}</p>
    </div>
  );
};
