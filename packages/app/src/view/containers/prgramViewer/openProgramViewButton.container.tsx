import React from "react";
import { Button, Icon } from "../../components";
import { ProgramsPageMetaTestIds } from "@parsimony/types/dist";
import { Container } from "typedi";
import UIApi from "../../../domains/accessApis/uiApi/uiApi.Service";
import { DrawerContentTypes } from "../../../domains/services/appStateService";

export const OpenProgramViewButton = () => {
  const API = Container.get(UIApi);

  return (
    <Button
      name="Show Programs"
      action={() => API.actions.drawer.open(DrawerContentTypes.ProgramSelector)}
      icon={<Icon.ProgramViewer />}
      metaTestId={ProgramsPageMetaTestIds.addProgramToClient}
    />
  );
};
