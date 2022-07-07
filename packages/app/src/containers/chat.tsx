import { ChatActionTypes } from "@parsimony/types/src";
import React, { useEffect, useState } from "react";
import { socketObservable } from "..";
import { createThread, deleteThread, fetchTreads } from "../bal";
import ChatServiceObservable from "../services/chat/chatObs";
import { StateManger } from "../services/dataAccessServices";
import { IThread, IThreads } from "../types";
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

  const onDelete = (id: any) => deleteThread({ id });

  return (
    <div>
      <button onClick={() => onCreate()}>Crete Thread</button>
      {Object.values(threads).map((thread: IThread) => (
        <h1 key={uuid()} onClick={() => onDelete(thread.id)}>
          {thread.id}
        </h1>
      ))}
    </div>
  );
};

export default Chat;
