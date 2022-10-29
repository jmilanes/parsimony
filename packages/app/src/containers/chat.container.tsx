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
import { DrawerContentTypes } from "../services/appControls.service";
import { Button } from "../components";

const Chat = () => {
  const { dataAccess, authService, appControls } = useServices();
  const [threads, setThreads] = useState<ThreadCollection>(
    {} as ThreadCollection
  );

  useEffect(() => dataAccess.thread$.subscribe(setThreads), []);

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

  const showCreateChat = () => {
    appControls.updateControls("drawer", {
      content: DrawerContentTypes.CreateChat
    });
  };

  return (
    <div>
      <Button name="Create Chat" action={showCreateChat}></Button>
      {Object.values(threads).map((thread: Thread) => (
        <div key={thread.id}>
          <h1>{thread.name}</h1>
          <p>{thread.id}</p>
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
