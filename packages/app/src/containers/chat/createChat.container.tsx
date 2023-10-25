import { ChatMetaTestIds, Domains, Subscriber, User } from "@parsimony/types";
import React, { useState } from "react";

import { Button, Col, Field, Header, Row } from "../../components";

import { DrawerContentTypes } from "../../services/appStateService";
import { getFullName } from "../../utils";
import { Container } from "typedi";
import UIApi from "../../domains/uiApi/uiApi.Service";
import { ClientSelector } from "../clientSelector";

export const CreateChat = () => {
  const API = Container.get(UIApi);

  const authService = API.system.Auth;
  const currentUserId = authService.getCurrentUser()?.id as string;
  const currentName = getFullName(authService.getCurrentUser());

  const currentUserSubscriber = { id: currentUserId, displayName: currentName };
  const [subscribers, updateSubscribers] = useState<Subscriber[]>([
    currentUserSubscriber
  ]);
  const [name, updateName] = useState("");

  const setToChatDrawer = async () => {
    await API.system.updateAppState("drawer", {
      content: DrawerContentTypes.Chat
    });
  };

  const onCreateThread = async () => {
    await API.system.makeRequest({
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
      <ClientSelector multiSelect={true} onChange={onUpdateSubscribers} />
      <Button
        name="Create"
        action={onCreateThread}
        metaTestId={ChatMetaTestIds.createChatSubmitBtn}
      />
    </div>
  );
};
