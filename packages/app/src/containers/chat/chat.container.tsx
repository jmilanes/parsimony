import React, { useEffect, useState } from "react";
import { ThreadDomain } from "../../services/chat.service";
import { ChatMetaTestIds, Domains, Thread } from "@parsimony/types";
import { useServices } from "../../context";
import { DrawerContentTypes } from "../../services/appControls.service";
import { Button, List, Row, Col } from "../../components";
import { ChatMessager } from "../index";
import { getThreadName } from "../../utils";
import { CommandService } from "../../domains/commands/command.service";
import { Container } from "typedi";

export const Chat = () => {
  const CS = Container.get(CommandService);
  const { authService, store } = useServices();
  const [threads, setThreads] = useState<ThreadDomain>({} as ThreadDomain);

  const [currentThread, setCurrentThread] = useState<string>();

  useEffect(
    //TODO: Make a Command
    () => store.subscribeToStoreDomain(Domains.Thread, setThreads),
    []
  );

  const showCreateChat = () => {
    CS.api.setStoreValue({
      path: "drawer",
      update: {
        content: DrawerContentTypes.CreateChat
      }
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
          <ChatMessager
            thread={currentThread ? threads[currentThread] : undefined}
          />
        </Col>
      </Row>
    </div>
  );
};
