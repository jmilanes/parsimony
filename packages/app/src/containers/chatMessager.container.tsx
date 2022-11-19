import React, { useState } from "react";

// TODO: THis is what is breaking the pattern. This is the next thing to be fixed
import { addMessage, deleteThread } from "../bal";
import { Menu, Row, Col, InputWithAction, Header, Icon } from "../components";
import { ChatMessage, ChatMessageInput } from "../containers";
import { Message, Thread } from "@parsimony/types";
import { useServices } from "../context";
import { getThreadName } from "../utils";

type IChatMessageRProps = {
  thread?: Thread;
};

export const ChatMessager = ({ thread }: IChatMessageRProps) => {
  const { authService } = useServices();

  const currentUser = authService.currentUser;

  const onDelete = (id: string) => deleteThread({ id });

  const onAddMessage = (threadId: string) => (value: string) => {
    addMessage({
      message: {
        userId: currentUser?.id,
        dataType: "string",
        value
      },
      threadId
    });
  };

  if (!thread) return <Header text="No Thread Selected" size="md" />;
  const sendMessage = onAddMessage(thread?.id);
  const menuOptions = [
    {
      label: "Delete",
      icon: <Icon.Delete />,
      action: () => onDelete(thread.id)
    }
  ];
  const threadName = getThreadName(thread, currentUser);
  return (
    <div className="messager">
      <Row>
        <Col xs={10}>
          <Header text={threadName} size="md" />
        </Col>
        <Col xs={2}>
          <Menu options={menuOptions}></Menu>
        </Col>
      </Row>
      <hr />
      <div className="messages-container">
        <div className="overflow-container">
          {thread.messages.map((message) => (
            <ChatMessage
              key={message?.id}
              threadId={thread.id}
              message={message as Message}
            />
          ))}
        </div>
      </div>
      <ChatMessageInput
        action={(value: string) => sendMessage(value)}
        placeholder={`Message ${threadName}`}
        buttonText="Send"
      />
    </div>
  );
};
