import React, { useEffect, useState } from "react";
import {
  addMessage,
  createThread,
  deleteMessage,
  deleteThread,
  editMessage
} from "../bal";
import ChatServiceObservable from "../services/chat/chatObs";
import { IThread, IThreads } from "@parsimony/types";
import { uuid } from "../utils";

const chatService = new ChatServiceObservable();
const Chat = () => {
  const [threads, setThreads] = useState<IThreads>({} as IThreads);

  useEffect(() => {
    chatService.init();
    chatService.threads$.subscribe({
      next: setThreads
    });
  }, []);

  const onCreate = () =>
    createThread({
      name: "New Thread",
      subscribers: ["joey", "molly"]
    });

  const onDelete = (id: string) => deleteThread({ id });
  const onDeleteMessage = (threadId: string, messageId: string) =>
    deleteMessage({ threadId, messageId });
  const onEditMessage = (e: any, threadId: string, messageId: string) =>
    editMessage({ value: e.target.value, threadId, messageId });
  const onAddMessage = (e: any, threadId: string) =>
    addMessage({
      message: {
        userId: "joey",
        dataType: "string",
        value: e.target.value
      },
      threadId
    });

  return (
    <div>
      <button onClick={() => onCreate()}>Crete Thread</button>
      {Object.values(threads).map((thread: IThread) => (
        <div key={uuid()}>
          <h1>{thread.name}</h1>
          <p>{thread.id}</p>
          <input
            type="text"
            name=""
            placeholder="Add Message"
            id=""
            onBlur={(e) => onAddMessage(e, thread.id)}
          />
          {thread.messages.map((message) => (
            <div key={uuid()}>
              <p>{message?.value}</p>
              <input
                type="text"
                name=""
                placeholder="Edit Message"
                id=""
                onBlur={(e) => onEditMessage(e, thread.id, message.id || "")}
              />
              <button
                onClick={() => onDeleteMessage(thread.id, message.id || "")}
              >
                Delete
              </button>
            </div>
          ))}
          <button onClick={() => onDelete(thread.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
};

export default Chat;
