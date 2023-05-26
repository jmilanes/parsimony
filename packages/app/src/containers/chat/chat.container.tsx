import React, { useEffect, useState } from "react";
import { ThreadDomain } from "../../services/chat.service";
import { ChatMetaTestIds, Domains, Thread } from "@parsimony/types";
import { useServices } from "../../context";
import { DrawerContentTypes } from "../../services/appStateService";
import { Button, Col, List, Row } from "../../components";
import { ChatMessager } from "../index";
import { getThreadName } from "../../utils";

import { Container } from "typedi";
import UIApi from "../../domains/uiApi/uiApi.Service";

export const Chat = () => {
  const API = Container.get(UIApi);
  const { authService } = useServices();
  const [currentThread, setCurrentThread] = useState<string>();
  const threads = API.getItemsFromStore(Domains.Thread);

  const showCreateChat = async () => {
    await API.updateAppState("drawer", {
      content: DrawerContentTypes.CreateChat
    });
  };

  const ChatList = ({ threads }: { threads: Thread[] }) => {
    const threadListItems = threads.map((thread) => {
      const value = getThreadName(thread, authService.currentUser);
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
            action={showCreateChat}
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
