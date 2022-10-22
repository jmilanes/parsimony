import React, { useEffect, useState } from "react";
import {
  addMessage,
  createThread,
  deleteMessage,
  deleteThread,
  editMessage
} from "../bal";
import { ThreadCollection } from "../services/chat.service";
import { Collections, Thread } from "@parsimony/types";
import { uuid } from "../utils";
import { useServices } from "../context";

const Chat = () => {
  const { dataAccess, authService, appControls, store } = useServices();
  const [threads, setThreads] = useState<ThreadCollection>(
    {} as ThreadCollection
  );

  const controls = store.getCollectionValue(Collections.AppControls)?.drawer;

  useEffect(() => dataAccess.thread$.subscribe(setThreads), []);

  const onCreateThread = () =>
    createThread({
      name: "New Thread Joey and Molly User ID",
      subscribers: ["62e9ee2370d1d288df4c8e8b", "630ab6b82e68791506f3ec5e"]
    });

  const onDelete = (id: string) => deleteThread({ id });

  const onDeleteMessage = (threadId: string, messageId: string) =>
    deleteMessage({ threadId, messageId });

  const onEditMessage = (e: any, threadId: string, messageId: string) =>
    editMessage({ value: e.target.value, threadId, messageId });

  const onAddMessage = (e: any, threadId: string) => {
    addMessage({
      message: {
        userId: authService.currentUser?.id,
        dataType: "string",
        value: e.target.value
      },
      threadId
    });
  };

  const showDrawer = () => {
    appControls.updateControls({
      drawer: {
        ...controls,
        active: true
      }
    });
  };

  return (
    <div>
      <button onClick={showDrawer}>SHOW DRAWER</button>
      <button onClick={() => onCreateThread()}>Crete Thread</button>
      {Object.values(threads).map((thread: Thread) => (
        <div key={thread.id}>
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
                onBlur={(e) => onEditMessage(e, thread.id, message?.id || "")}
              />
              <button
                onClick={() => onDeleteMessage(thread.id, message?.id || "")}
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
