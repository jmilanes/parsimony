import React, { useState } from "react";

// TODO: THis is what is breaking the pattern. This is the next thing to be fixed
import { deleteMessage, editMessage } from "../bal";
import { Menu, Row, Col, InputWithAction } from "../components";
import { Message } from "@parsimony/types";
import { useServices } from "../context";

type IChatMessageProps = {
  message: Message;
  threadId: string;
};

export const ChatMessage = ({ message, threadId }: IChatMessageProps) => {
  const [editMode, setEditMode] = useState(false);
  const { authService } = useServices();

  const currentUserId = authService.getCurrentUser()?.id;
  const onDeleteMessage = (threadId: string, messageId: string) =>
    deleteMessage({ threadId, messageId });

  const onEditMessage = (
    value: string,
    threadId: string,
    messageId: string
  ) => {
    editMessage({ value, threadId, messageId });
    setEditMode(false);
  };

  const menuOptions = [
    {
      label: "Delete",
      action: () => onDeleteMessage(threadId, message?.id || "")
    },
    {
      label: "Edit Message",
      action: () => setEditMode(true)
    }
  ];

  return (
    <div
      className={`message ${
        currentUserId === message.userId ? "sent-by-current-user" : ""
      }`}
    >
      <Row>
        <Col xs={10}>
          {!editMode ? (
            <p>{message?.value}</p>
          ) : (
            <InputWithAction
              action={(value: string) => {
                onEditMessage(value, threadId, message?.id || "");
              }}
              defaultValue={message.value}
              buttonText="Confirm Edit"
            />
          )}
        </Col>
        <Col xs={2}>
          <Menu options={menuOptions} />
        </Col>
      </Row>
    </div>
  );
};
