import React from "react";
import { Autocomplete } from "../components";
import { ChatMetaTestIds, Domains, User } from "@parsimony/types";
import { Container } from "typedi";
import UIApi from "../domains/uiApi/uiApi.Service";

import { getFullName } from "../utils";

type ClientSelectorProps = {
  onChange: (value: any) => void;
  multiSelect: boolean;
};

export const ClientSelector = ({
  onChange,
  multiSelect
}: ClientSelectorProps) => {
  const API = Container.get(UIApi);

  const authService = API.Auth;
  const currentUserId = authService.currentUser?.id as string;
  const clients = API.getItemsFromStore(Domains.User);

  //TODO Add Filter prop so that we can ge the correct list client or no client
  const options = clients
    .filter((user: User) => user.id !== currentUserId)
    .map((user: User) => ({
      label: getFullName(user),
      value: user.id
    }));

  return (
    <Autocomplete
      label="Select user User"
      options={options}
      multiSelect={multiSelect}
      updateState={onChange}
      metaTestId={ChatMetaTestIds.createChatNameField}
    />
  );
};
