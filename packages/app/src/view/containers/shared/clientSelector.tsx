import React from "react";
import { Autocomplete, Button, Header } from "../../components";
import {
  ChatMetaTestIds,
  Domains,
  ProgramPageMetaTestIds,
  User,
  UserRoles
} from "@parsimony/types";
import { Container } from "typedi";
import UIApi from "../../../domains/accessApis/uiApi/uiApi.Service";

import { getFullName } from "../../../utils";

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

  const currentUserId = API.system.Auth.getCurrentUser()?.id as string;
  const clients = API.system.getItemsFromStore(Domains.User);

  const selectedUser = selected
    ? API.system.getItem(Domains.User, selected)
    : undefined;

  const selectedName = selected ? getFullName(selectedUser) : undefined;

  const options = clients
    .filter(
      (user: User) =>
        user.id !== currentUserId && user.type === UserRoles.Client
    )
    .map((user: User) => ({
      label: getFullName(user),
      value: user.id
    }));

  const SelectedView = () => {
    return (
      <div className="client-selector-selected-view">
        <Header text={selectedName || ""} size="sm" />
        <Button
          name="Cancel"
          onClick={onCancel}
          metaTestId={ProgramPageMetaTestIds.clientSelector}
        />
      </div>
    );
  };

  return selected ? (
    <SelectedView />
  ) : (
    <Autocomplete
      label="Select User"
      options={options}
      multiSelect={multiSelect}
      onChange={onChange}
      metaTestId={ChatMetaTestIds.createChatNameField}
    />
  );
};
