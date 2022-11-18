import React, { useEffect, useState } from "react";
import { addMessage, deleteMessage, deleteThread, editMessage } from "../bal";
import { ThreadCollection } from "../services/chat.service";
import { Message, Thread } from "@parsimony/types";
import { useServices } from "../context";
import { DrawerContentTypes } from "../services/appControls.service";
import {
  Button,
  InputWithAction,
  List,
  Icon,
  Row,
  Col,
  Menu,
  Header
} from "../components";
import { ChatMessage } from "../containers";

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
      return {
        value: thread.name,
        action: () => setCurrentThread(thread.id)
      };
    });

    return <List listItems={threadListItems} />;
  };

  // TODO: dot selection menu thread (delete), Message (edit, delete), message sides/color/avatar, fix typing bar on bottom, and get the  effect correct, limit how many chat per set of subscribers if someone tries put them in the current char, should be a text area...

  const SelectedThread = ({ thread }: { thread?: Thread }) => {
    if (!thread) return <h1>No Thread Selected</h1>;
    const sendMessage = onAddMessage(thread?.id);
    const menuOptions = [
      {
        label: "Delete",
        icon: <Icon.Delete />,
        action: () => onDelete(thread.id)
      }
    ];
    return (
      <div>
        <Row>
          <Col xs={10}>
            <Header text={thread.name} size="md" />
          </Col>
          <Col xs={2}>
            <Menu options={menuOptions}></Menu>
          </Col>
        </Row>
        {thread.messages.map((message) => (
          <ChatMessage
            key={message?.id}
            threadId={thread.id}
            message={message as Message}
          />
        ))}
        <InputWithAction
          action={(value: string) => sendMessage(value)}
          placeholder={`Message ${thread.name}`}
          buttonText="Send"
        />
      </div>
    );
  };

  return (
    <div>
      <Button name="Create Chat" action={showCreateChat}></Button>
      <Row>
        <Col xs={4}>
          <ChatList threads={Object.values(threads)} />
        </Col>
        <Col xs={8}>
          <SelectedThread
            thread={currentThread ? threads[currentThread] : undefined}
          />
        </Col>
      </Row>
    </div>
  );
};
