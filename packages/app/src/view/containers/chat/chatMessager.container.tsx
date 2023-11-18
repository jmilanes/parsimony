import React, { useEffect, useRef, useState } from "react";

import { Col, Header, Icon, Menu, Row } from "../../components";
import { ChatMessage, ChatMessageInput } from "../index";
import { ChatMetaTestIds, Message, Domains, Thread } from "@parsimony/types";

import { getThreadName } from "../../../utils";
import { Container } from "typedi";

import UIApi from "../../../domains/accessApis/uiApi/uiApi.Service";

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
  const API = Container.get(UIApi);
  const messageContainer = useRef<HTMLInputElement>(null);
  const [initialLoad, setInitialLoad] = useState(false);

  const [selectedMessage, setSelectedMessage] = useState<Message | null>();

  const authService = API.system.Auth;

  const onEditMessage = async (value: string) => {
    if (!selectedMessage || !thread) return;
    await API.system.makeRequest({
      domain: Domains.Thread,
      requestType: "editMessage",
      payload: {
        value,
        threadId: thread?.id,
        messageId: selectedMessage?.id
      }
    });
    setSelectedMessage(null);
  };

  const currentUser = authService.getCurrentUser();

  const onDelete = async (id: string) => {
    await API.system.makeRequest({
      domain: Domains.Thread,
      requestType: "delete",
      payload: {
        id
      }
    });
  };

  const onAddMessage = async (threadId: string) => async (value: string) => {
    await API.system.makeRequest({
      domain: Domains.Thread,
      requestType: "addMessage",
      payload: {
        message: {
          userId: currentUser?.id,
          dataType: "string",
          value
        },
        threadId
      }
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
      action={async (value: string) => {
        const send = await onAddMessage(thread?.id);
        await send(value);
      }}
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
