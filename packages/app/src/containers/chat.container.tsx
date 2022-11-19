import React, { useEffect, useState } from "react";
import { addMessage, deleteMessage, deleteThread, editMessage } from "../bal";
import { ThreadCollection } from "../services/chat.service";
import { Thread } from "@parsimony/types";
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

  useEffect(() => dataAccess.thread$.subscribe(setThreads), []);

  const onDelete = (id: string) => deleteThread({ id });

  const onDeleteMessage = (threadId: string, messageId: string) =>
    deleteMessage({ threadId, messageId });

  const onEditMessage = (e: any, threadId: string, messageId: string) =>
    editMessage({ value: e.target.value, threadId, messageId });

  const onAddMessage = (threadId: string) => (value: string) => {
    addMessage({
      message: {
        userId: authService.currentUser?.id,
        dataType: "string",
        value
      },
      threadId
    });
  };

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
          <Button name="Create Chat" action={showCreateChat}></Button>
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
