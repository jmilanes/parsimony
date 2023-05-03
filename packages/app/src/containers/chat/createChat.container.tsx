import { ChatMetaTestIds, Domains, Subscriber, User } from "@parsimony/types";
import React, { useEffect, useState } from "react";

import {
  Autocomplete,
  Button,
  Col,
  Field,
  Header,
  Row
} from "../../components";

import { useServices } from "../../context";
import { DrawerContentTypes } from "../../services/appControls.service";
import { getFullName } from "../../utils";
import { Container } from "typedi";
import { CommandService } from "../../domains/commands/command.service";

export const CreateChat = () => {
  const CS = Container.get(CommandService);
  const { authService } = useServices();
  const currentUserId = authService.currentUser?.id as string;
  // TODO Change to display name once those are added to USER
  const currentName = getFullName(authService.currentUser);

  const currentUserSubscriber = { id: currentUserId, displayName: currentName };
  const [subscribers, updateSubscribers] = useState<Subscriber[]>([
    currentUserSubscriber
  ]);
  const [name, updateName] = useState("");

  useEffect(() => {
    CS.api.setStoreValue({
      path: "drawer",
      update: {
        content: DrawerContentTypes.CreateChat
      }
    });

    CS.api.makeRequest({
      domain: Domains.User,
      requestType: "getAll"
    });
  }, []);

  const autoCompleteOptions = CS.api
    .getItems<User[]>({ domain: Domains.User })
    .filter((user: User) => user.id !== currentUserId)
    .map((user: User) => ({
      // TODO Change to display name once those are added to USER
      label: getFullName(user),
      value: user.id
    }));

  const setToChatDrawer = () => {
    CS.api.setStoreValue({
      path: "drawer",
      update: {
        content: DrawerContentTypes.Chat
      }
    });
  };

  const onCreateThread = () => {
    CS.api.makeRequest({
      domain: Domains.Thread,
      requestType: "create",
      payload: {
        name,
        subscribers
      }
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
          <Button
            name="Cancel"
            action={setToChatDrawer}
            metaTestId={ChatMetaTestIds.cancelCreateChatBtn}
          />
        </Col>
      </Row>
      <Field
        value={name}
        // TODO This should be easier lol but fine
        updateState={(path, value) => updateName(value)}
        pathToState=""
        placeHolderText="Chat name"
        metaTestId={ChatMetaTestIds.createChatNameField}
      />
      <Autocomplete
        label="Search User"
        options={autoCompleteOptions}
        multiSelect={true}
        updateState={onUpdateSubscribers}
        metaTestId={ChatMetaTestIds.createChatNameField}
      />
      <Button
        name="Create"
        action={onCreateThread}
        metaTestId={ChatMetaTestIds.createChatSubmitBtn}
      />
    </div>
  );
};
