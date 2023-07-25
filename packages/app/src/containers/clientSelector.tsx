import React from "react";
import { Autocomplete, Button } from "../components";
import {
  ChatMetaTestIds,
  Domains,
  ProgramPageMetaTestIds,
  User
} from "@parsimony/types";
import { Container } from "typedi";
import UIApi from "../domains/uiApi/uiApi.Service";

import { getFullName } from "../utils";

type ClientSelectorProps = {
  onChange: (value: any) => void;
  onCancel?: () => void;
  multiSelect: boolean;
  selected?: string;
};

export const ClientSelector = ({
  onChange,
  multiSelect,
  selected,
  onCancel
}: ClientSelectorProps) => {
  const API = Container.get(UIApi);

  const currentUserId = API.Auth.currentUser?.id as string;
  const clients = API.getItemsFromStore(Domains.User);

  const selectedUser = selected
    ? API.getItem(Domains.User, selected)
    : undefined;

  const selectedName = selected ? getFullName(selectedUser) : undefined;

  const options = clients
    .filter((user: User) => user.id !== currentUserId)
    .map((user: User) => ({
      label: getFullName(user),
      value: user.id
    }));

  const SelectedView = () => {
    return (
      <>
        <p>{selectedName}</p>
        <Button
          name="Cancel"
          action={onCancel}
          metaTestId={ProgramPageMetaTestIds.clientSelector}
        />
      </>
    );
  };

  return selected ? (
    <SelectedView />
  ) : (
    <Autocomplete
      label="Select user User"
      options={options}
      multiSelect={multiSelect}
      updateState={onChange}
      metaTestId={ChatMetaTestIds.createChatNameField}
    />
  );
};
