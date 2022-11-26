import React, { useEffect, useRef, useState } from "react";

// TODO: THis is what is breaking the pattern. This is the next thing to be fixed
import { addMessage, deleteThread, editMessage } from "../bal";
import { Menu, Row, Col, InputWithAction, Header, Icon } from "../components";
import { ChatMessage, ChatMessageInput } from "../containers";
import { Message, Thread } from "@parsimony/types";
import { useServices } from "../context";
import { getThreadName } from "../utils";

type IChatMessageRProps = {
  thread?: Thread;
};

const scrollToBottomOfRef = (
  elm: HTMLInputElement | null,
  smooth?: boolean
) => {
  elm?.scroll({
    top: elm.scrollHeight,
    behavior: smooth ? "smooth" : undefined
  });
};

export const ChatMessager = ({ thread }: IChatMessageRProps) => {
  const messageContainer = useRef<HTMLInputElement>(null);
  const [initialLoad, setInitialLoad] = useState(false);
  const [editMessageMode, setEditMessageMode] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState<Message>();
  const { authService } = useServices();

  const onEditMessage = (value: string) => {
    if (!selectedMessage || !thread) return;
    editMessage({
      value,
      threadId: thread?.id,
      messageId: selectedMessage?.id
    });
    setEditMessageMode(false);
  };

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

  useEffect(() => {
    scrollToBottomOfRef(messageContainer.current, initialLoad);
    if (!initialLoad && thread) {
      setInitialLoad(true);
    }
  }, [thread?.messages]);

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
        <div ref={messageContainer} className="overflow-container">
          {thread.messages.map((message) => (
            <ChatMessage
              key={message?.id}
              threadId={thread.id}
              message={message as Message}
              setEditMode={setEditMessageMode}
              setSelectedMessage={setSelectedMessage}
            />
          ))}
        </div>
      </div>
      <ChatMessageInput
        action={(value: string) =>
          editMessageMode ? onEditMessage(value) : sendMessage(value)
        }
        placeholder={`Message ${threadName}`}
        defaultValue={editMessageMode ? selectedMessage?.value : undefined}
        buttonText={editMessageMode ? "Edit" : "Send"}
      />
    </div>
  );
};
