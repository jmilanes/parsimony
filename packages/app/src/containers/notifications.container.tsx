import * as React from "react";

import Snackbar from "@mui/material/Snackbar";
import UIApi from "../domains/uiApi/uiApi.Service";
import { Container } from "typedi";
import { Notification } from "../services/appStateService";
import { Slide } from "@mui/material";
import { Button, Icon } from "../components";
import { BehaviorTracker } from "@parsimony/types";
import { uuid } from "../utils";

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
      name="Stop Time"
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
  const notifications = API.getAppState("notifications");
  const time = API.getAppState("behaviorTracker").time;
  console.log("NOTIFCATION RERENDER");
  return (
    <div>
      {Object.values(notifications.activeNotifications).map(Notification)}
    </div>
  );
};
