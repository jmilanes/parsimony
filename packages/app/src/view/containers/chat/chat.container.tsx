import React, { useState } from "react";
import { ChatMetaTestIds, Domains, Thread } from "@parsimony/types";
import { DrawerContentTypes } from "../../../domains/state/appState/appState.types";
import { Button, Col, List, Row } from "../../components";
import { ChatMessager } from "../index";
import { getThreadName } from "../../../utils";

import { Container } from "typedi";
import UIApi from "../../../domains/accessApis/uiApi/uiApi.Service";

export const Chat = () => {
  const API = Container.get(UIApi);
  const authService = API.system.Auth;
  const [currentThread, setCurrentThread] = useState<string>();
  const threads = [new Thread()];

  const showCreateChat = async () => {
    await API.system.updateAppState("drawer", {
      content: DrawerContentTypes.CreateChat
    });
  };

  const ChatList = ({ threads }: { threads: Thread[] }) => {
    const threadListItems = threads.map((thread) => {
      //@ts-ignore
      const value = getThreadName(thread, authService.getCurrentUser());
      return {
        value,
        action: () => setCurrentThread(thread.id)
      };
    });

    return <List listItems={threadListItems} />;
  };

  // TODO: edit should be done by bottom bar, message sides/color/avatar, fix typing bar on bottom, and get the  effect correct, limit how many chat per set of subscribers if someone tries put them in the current char, should be a text area...

  return (
    <div className="chat-container">
      <Row className="full-height">
        <Col xs={4}>
          <Button
            name="Create Chat"
            onClick={showCreateChat}
            metaTestId={ChatMetaTestIds.createChatBtn}
          />
          <ChatList threads={Object.values(threads)} />
        </Col>
        <Col xs={8}>
          <ChatMessager thread={threads.find((t) => t.id === currentThread)} />
        </Col>
      </Row>
    </div>
  );
};
