import { Collections, User, Subscriber } from "@parsimony/types/src";
import React, { useEffect, useState } from "react";

import { createThread } from "../bal";
import { Header, Field, Autocomplete, Button, Row, Col } from "../components";

import { useServices } from "../context";
import { DrawerContentTypes } from "../services/appControls.service";
import { getFullName } from "../utils";

export const CreateChat = () => {
  const { appControls, dataAccess, store, authService } = useServices();
  const currentUserId = authService.currentUser?.id as string;
  // TODO Change to display name once those are added to USER
  const currentName = getFullName(authService.currentUser);

  const currentUserSubscriber = { id: currentUserId, displayName: currentName };
  const [subscribers, updateSubscribers] = useState<Subscriber[]>([
    currentUserSubscriber
  ]);
  const [name, updateName] = useState("");

  useEffect(() => {
    dataAccess.user.getAll();
  }, []);

  const autoCompleteOptions = store
    .getCurrentCollectionItems<User>(Collections.User)
    .filter((user: User) => user.id !== currentUserId)
    .map((user: User) => ({
      // TODO Change to display name once those are added to USER
      label: getFullName(user),
      value: user.id
    }));

  const setToChatDrawer = () =>
    appControls.updateControls("drawer", {
      content: DrawerContentTypes.Chat
    });

  const onCreateThread = () => {
    createThread({
      name,
      subscribers
    });
    setToChatDrawer();
  };

  const onUpdateSubscribers = (
    selectedUsers: { label: string; value: string }[]
  ) => {
    updateName(
      `${currentName}, ${selectedUsers.map((su) => su.label).join(", ")}`
    );
    updateSubscribers([
      currentUserSubscriber,
      ...selectedUsers.map((selectedUser) => ({
        id: selectedUser.value,
        displayName: selectedUser.label
      }))
    ]);
  };

  return (
    <div>
      <Row>
        <Col xs={10}>
          <Header text="Create Chat" size="md" />
        </Col>
        <Col xs={2}>
          <Button name="Cancel" action={setToChatDrawer} />
        </Col>
      </Row>
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
