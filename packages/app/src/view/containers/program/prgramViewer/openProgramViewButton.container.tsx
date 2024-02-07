import React from "react";
import { Button, Icon } from "../../../components";
import { NavMetaTestIds, CollectionPageMetaTestIds } from "@parsimony/types";
import { Container } from "typedi";
import UIApi from "../../../../domains/accessApis/uiApi/uiApi.Service";
import { DrawerContentTypes } from "../../../../domains/state/appState/appState.types";

export const OpenProgramViewButton = () => {
  const API = Container.get(UIApi);

  return (
    <Button
      name="Show Programs"
      onClick={() =>
        API.actions.drawer.open(DrawerContentTypes.ProgramSelector)
      }
      icon={<Icon.ProgramViewer />}
      metaTestId={NavMetaTestIds.openAddProgramToClientSideBar}
    />
  );
};
