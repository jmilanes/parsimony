import React, { useEffect, useState } from "react";
import { ThreadCollection } from "../services/chat.service";
import { ChatMetaTestIds, Thread } from "@parsimony/types";
import { useServices } from "../context";
import { DrawerContentTypes } from "../services/appControls.service";
import { Button, List, Row, Col } from "../components";
import { ChatMessager } from "../containers";
import { getThreadName } from "../utils";

export const Chat = () => {
  const { dataAccess, authService, appControls } = useServices();
  const [threads, setThreads] = useState<ThreadCollection>(
    {} as ThreadCollection
  );

  const [currentThread, setCurrentThread] = useState<string>();

  useEffect(() => dataAccess.thread.subscribe(setThreads), []);

  const showCreateChat = () => {
    appControls.updateControls("drawer", {
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
          <ChatMessager
            thread={currentThread ? threads[currentThread] : undefined}
          />
        </Col>
      </Row>
    </div>
  );
};
