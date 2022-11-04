import React from "react";

// TODO: THis is what is breaking the pattern. This is the next thing to be fixed
import { deleteMessage, editMessage } from "../bal";
import { Message } from "@parsimony/types";
import { uuid } from "../utils";

type IChatMessageProps = {
  message: Message;
  threadId: string;
};

export const ChatMessage = ({ message, threadId }: IChatMessageProps) => {
  const onDeleteMessage = (threadId: string, messageId: string) =>
    deleteMessage({ threadId, messageId });

  const onEditMessage = (e: any, threadId: string, messageId: string) =>
    editMessage({ value: e.target.value, threadId, messageId });

  return (
    <div>
      <p>{message?.value}</p>
      <input
        type="text"
        name=""
        placeholder="Edit Message"
        id=""
        onBlur={(e) => onEditMessage(e, threadId, message?.id || "")}
      />
      <button onClick={() => onDeleteMessage(threadId, message?.id || "")}>
        Delete
      </button>
    </div>
  );
};
