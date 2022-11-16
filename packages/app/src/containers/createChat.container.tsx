import { Collections, User } from "@parsimony/types/src";
import React, { useEffect, useState } from "react";

import { createThread } from "../bal";
import { Header, Field, Autocomplete, Button } from "../components";

import { useServices } from "../context";
import { DrawerContentTypes } from "../services/appControls.service";
import { getFullName } from "../utils";

export const CreateChat = () => {
  const { appControls, dataAccess, store, authService } = useServices();
  const currentUser = authService.currentUser?.id as string;
  const currentNAme = authService.currentUser?.firstName as string;
  const [subscribers, updateSubscribers] = useState<string[]>([currentUser]);
  const [name, updateName] = useState("");

  useEffect(() => {
    dataAccess.user.getAll();
  }, []);

  const autoCompleteOptions = store
    .getCurrentCollectionItems<User>(Collections.User)
    .filter((user: User) => user.id !== currentUser)
    .map((user: User) => ({
      label: getFullName(user),
      value: user.id
    }));

  const onCreateThread = () => {
    createThread({
      name,
      subscribers
    });

    appControls.updateControls("drawer", {
      content: DrawerContentTypes.Chat
    });
  };

  const onUpdateSubscribers = (
    selectedUsers: { label: string; value: string }[]
  ) => {
    updateName(
      `${currentNAme} ${selectedUsers.map((su) => su.label).join(", ")}`
    );
    updateSubscribers(selectedUsers.map((selectedUser) => selectedUser.value));
  };

  return (
    <div>
      <Header text="Create Chat" size="md" />
      <Field
        value={name}
        // TODO This should be easier lol but fine
        updateState={(path, value) => updateName(value)}
        pathToState=""
        placeHolderText="Chat name"
      />
      <Autocomplete
        label="Search User"
        options={autoCompleteOptions}
        multiSelect={true}
        updateState={onUpdateSubscribers}
      />
      <Button name="Create" action={onCreateThread} />
    </div>
  );
};
