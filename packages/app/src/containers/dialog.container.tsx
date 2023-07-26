import * as React from "react";

import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import { Container } from "typedi";
import UIApi from "../domains/uiApi/uiApi.Service";

export const DialogContainer = () => {
  const API = Container.get(UIApi);
  const controls = API.getAppState("dialog");

  const handleClose = () => {
    API.updateAppState("dialog", { active: false });
  };

  return (
    <Dialog onClose={handleClose} open={controls.active}>
      <div className="inner-idalod">
        {controls.content && <controls.content />}
      </div>
    </Dialog>
  );
};
