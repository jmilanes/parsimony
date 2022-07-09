import React, { useEffect, useState } from "react";
import { addMessage, createThread, deleteThread } from "../bal";
import ChatServiceObservable from "../services/chat/chatObs";
import { IThread, IThreads } from "@parsimony/types";
import { uuid } from "../utils";

export const chatService = new ChatServiceObservable();

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
          <h1>{thread.id}</h1>
          <input
            type="text"
            name=""
            id=""
            onBlur={(e) => onAddMessage(e, thread.id)}
          />
          {thread.messages.map((message) => (
            <p key={uuid()}>{message?.value}</p>
          ))}
          <button onClick={() => onDelete(thread.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
};

export default Chat;
