import React from "react";

import { Menu } from "../../components";
import { ChatMetaTestIds, Message, Domains } from "@parsimony/types";

import { Container } from "typedi";

import UIApi from "../../../domains/accessApis/uiApi/uiApi.Service";

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
  const API = Container.get(UIApi);
  const authService = API.system.Auth;

  // TODO: ADD This to store / clientside domains
  const currentUserId = authService.getCurrentUser()?.id;
  const onDeleteMessage = async (threadId: string, messageId: string) => {
    // await API.system.makeRequest({
    //   domain: Domains.Thread,
    //   requestType: "deleteMessage",
    //   payload: { threadId, messageId }
    // });
  };

  const menuOptions = [
    {
      label: "Delete",
      action: () => onDeleteMessage(threadId, message?.id || ""),
      metaTestId: ChatMetaTestIds.deleteMessageBtn
    },
    {
      label: "Edit Message",
      action: () => {
        setSelectedMessage(message);
      },
      metaTestId: ChatMetaTestIds.editMessageBtn
    }
  ];

  return (
    <div
      className={`message-container ${
        currentUserId === message?.userId ? "sent-by-current-user" : ""
      }`}
    >
      <div className="message-bubble">
        <div className="message">
          <p>{message?.value}</p>
        </div>
        <div className="menu">
          <Menu
            options={menuOptions}
            metaTestId={ChatMetaTestIds.messageOptionsBtn}
          />
        </div>
      </div>
    </div>
  );
};
