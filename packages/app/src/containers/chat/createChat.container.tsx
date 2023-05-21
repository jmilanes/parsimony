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
import { DrawerContentTypes } from "../../services/appStateService";
import { getFullName } from "../../utils";
import { Container } from "typedi";
import UIApi from "../../domains/uiApi/uiApi.Service";

export const CreateChat = () => {
  const API = Container.get(UIApi);
  const { authService } = useServices();
  const currentUserId = authService.currentUser?.id as string;
  // TODO Change to display name once those are added to USER
  const currentName = getFullName(authService.currentUser);

  const currentUserSubscriber = { id: currentUserId, displayName: currentName };
  const [subscribers, updateSubscribers] = useState<Subscriber[]>([
    currentUserSubscriber
  ]);
  const [name, updateName] = useState("");
  const clients = API.getItemsFromStore(Domains.User);

  useEffect(() => {}, []);

  const autoCompleteOptions = clients
    .filter((user: User) => user.id !== currentUserId)
    .map((user: User) => ({
      // TODO Change to display name once those are added to USER
      label: getFullName(user),
      value: user.id
    }));

  const setToChatDrawer = async () => {
    await API.updateAppControls("drawer", {
      content: DrawerContentTypes.Chat
    });
  };

  const onCreateThread = async () => {
    await API.makeRequest({
      domain: Domains.Thread,
      requestType: "create",
      payload: {
        name,
        subscribers
      }
    });

    await setToChatDrawer();
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
