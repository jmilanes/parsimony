import * as React from "react";

import Snackbar from "@mui/material/Snackbar";
import UIApi from "../../../domains/accessApis/uiApi/uiApi.Service";
import { Container } from "typedi";
import { Notification } from "../../../domains/state/appStateService";

import { Button, Icon } from "../../components";
import { BehaviorTracker } from "@parsimony/types/dist";

//TODO: Breakl this up

const Notification = ({
  id,
  message,
  onClose,
  action,
  autoHideDuration,
  anchorOrigin = { vertical: "top", horizontal: "left" }
}: Notification) => {
  const API = Container.get(UIApi);
  const handleClose = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    onClose && onClose();
    API.actions.notifications.removeNotification(id);
  };

  const defaultAction = (
    <Button
      metaTestId={BehaviorTracker.stopTime}
      name="Stop Durration"
      action={() => handleClose({} as Event, "")}
      icon={<Icon.Close />}
    />
  );

  return (
    <Snackbar
      anchorOrigin={anchorOrigin}
      message={message}
      open={true}
      autoHideDuration={autoHideDuration}
      onClose={handleClose}
      action={action || defaultAction}
    />
  );
};

export const NotificationContainer = () => {
  const API = Container.get(UIApi);
  const notifications = API.system.getAppState("notifications");
  return (
    <div>
      {Object.values(notifications.activeNotifications).map(Notification)}
    </div>
  );
};
