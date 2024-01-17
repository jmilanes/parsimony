import * as React from "react";

import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from "@mui/material";
import { Button } from "../../components";

import { Container } from "typedi";
import UIApi from "../../../domains/accessApis/uiApi/uiApi.Service";
import { DialogMetaIds } from "@parsimony/types";

export const DialogContainer = () => {
  const API = Container.get(UIApi);
  const { active, title, actions, message } = API.system.getAppState("dialog");

  const buttons = actions?.map((x) => {
    return (
      <Button
        name={x.name}
        onClick={x.action}
        metaTestId={`${DialogMetaIds.action}-${x.name}`}
      ></Button>
    );
  });

  const stackedDialogs = API.system.Dialog.getQueueLength();

  return (
    <Dialog open={active} onClose={API.system.Dialog.close}>
      {stackedDialogs ? (
        <div className="dialog-stack-indicator">{stackedDialogs}</div>
      ) : null}
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        {typeof message === "string" ? (
          <DialogContentText>{message}</DialogContentText>
        ) : (
          message
        )}
      </DialogContent>
      <DialogActions>{buttons}</DialogActions>
    </Dialog>
  );
};
