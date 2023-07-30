import * as React from "react";

import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from "@mui/material";
import { Button } from "../components";

import { Container } from "typedi";
import UIApi from "../domains/uiApi/uiApi.Service";
import { DialogMetaIds } from "@parsimony/types";

export const DialogContainer = () => {
  const API = Container.get(UIApi);
  const controls = API.getAppState("dialog");

  const handleClose = () => {
    API.updateAppState("dialog", { active: false });
    // TODO Fix reseting
  };

  const actions = controls.actions?.map((x) => {
    return (
      <Button
        name={x.name}
        action={x.action}
        metaTestId={DialogMetaIds.action}
        metaTestQualifier={x.name}
      ></Button>
    );
  });

  return (
    <Dialog open={controls.active} onClose={handleClose}>
      <DialogTitle>{controls.title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{controls.message}</DialogContentText>
      </DialogContent>
      <DialogActions>{actions}</DialogActions>
    </Dialog>
  );
};
