import React, { useEffect, useRef, useState } from "react";

// TODO: THis is what is breaking the pattern. This is the next thing to be fixed
import { addMessage, deleteThread, editMessage } from "@parsimony/bal/dist";
import { Menu, Row, Col, Header, Icon } from "../../components";
import { ChatMessage, ChatMessageInput } from "../index";
import { ChatMetaTestIds, Message, Thread } from "@parsimony/types";
import { useServices } from "../../context";
import { getThreadName } from "../../utils";

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

  const [selectedMessage, setSelectedMessage] = useState<Message | null>();

  const { authService } = useServices();

  const onEditMessage = async (value: string) => {
    if (!selectedMessage || !thread) return;
    await editMessage({
      value,
      threadId: thread?.id,
      messageId: selectedMessage?.id
    });
    setSelectedMessage(null);
  };

  const currentUser = authService.currentUser;

  const onDelete = (id: string) => deleteThread({ id });

  const onAddMessage = (threadId: string) => async (value: string) => {
    await addMessage({
      message: {
        userId: currentUser?.id,
        dataType: "string",
        value
      },
      threadId
    });
  };

  const onCancel = () => {
    setSelectedMessage(null);
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
      action: () => onDelete(thread.id),
      metaTestId: ChatMetaTestIds.chatDeleteBtn
    }
  ];
  const threadName = getThreadName(thread, currentUser);

  const SendMessageInput = () => (
    <ChatMessageInput
      action={(value: string) => sendMessage(value)}
      placeholder={`Message ${threadName}`}
      buttonText="Send"
    />
  );

  const EditMessageInput = () => (
    <ChatMessageInput
      action={(value: string) => onEditMessage(value)}
      placeholder={`Message ${threadName}`}
      defaultValue={selectedMessage?.value}
      buttonText="Edit"
      onCancel={onCancel}
    />
  );

  return (
    <div className="messager">
      <Row>
        <Col xs={10}>
          <Header text={threadName} size="md" />
        </Col>
        <Col xs={2}>
          <Menu
            options={menuOptions}
            metaTestId={ChatMetaTestIds.chatOptionsBtn}
          ></Menu>
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
              setSelectedMessage={setSelectedMessage}
            />
          ))}
        </div>
      </div>
      {selectedMessage ? <EditMessageInput /> : <SendMessageInput />}
    </div>
  );
};
