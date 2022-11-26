import React from "react";

// TODO: THis is what is breaking the pattern. This is the next thing to be fixed
import { deleteMessage } from "../bal";
import { Menu } from "../components";
import { Message } from "@parsimony/types";
import { useServices } from "../context";

type IChatMessageProps = {
  message: Message;
  threadId: string;

  setSelectedMessage: (message: Message) => void;
};

export const ChatMessage = ({
  message,
  threadId,

  setSelectedMessage
}: IChatMessageProps) => {
  const { authService } = useServices();

  const currentUserId = authService.getCurrentUser()?.id;
  const onDeleteMessage = (threadId: string, messageId: string) =>
    deleteMessage({ threadId, messageId });
  const menuOptions = [
    {
      label: "Delete",
      action: () => onDeleteMessage(threadId, message?.id || "")
    },
    {
      label: "Edit Message",
      action: () => {
        setSelectedMessage(message);
      }
    }
  ];

  return (
    <div
      className={`message-container ${
        currentUserId === message.userId ? "sent-by-current-user" : ""
      }`}
    >
      <div className="message-bubble">
        <div className="message">
          <p>{message?.value}</p>
        </div>
        <div className="menu">
          <Menu options={menuOptions} />
        </div>
      </div>
    </div>
  );
};
