import React, { useEffect, useState } from "react";
import {
  addMessage,
  createThread,
  deleteMessage,
  deleteThread,
  editMessage
} from "../bal";
import { ThreadCollection } from "../services/chat.service";
import { Message, Thread } from "@parsimony/types";
import { useServices } from "../context";
import { DrawerContentTypes } from "../services/appControls.service";
import { Button, InputWithAction } from "../components";
import { ChatMessage } from "../containers";

export const Chat = () => {
  const { dataAccess, authService, appControls } = useServices();
  const [threads, setThreads] = useState<ThreadCollection>(
    {} as ThreadCollection
  );

  const [currentThread, setCurrentThread] = useState<string>();

  useEffect(() => dataAccess.thread$.subscribe(setThreads), []);

  const onDelete = (id: string) => deleteThread({ id });

  const onDeleteMessage = (threadId: string, messageId: string) =>
    deleteMessage({ threadId, messageId });

  const onEditMessage = (e: any, threadId: string, messageId: string) =>
    editMessage({ value: e.target.value, threadId, messageId });

  const onAddMessage = (threadId: string) => (value: string) => {
    addMessage({
      message: {
        userId: authService.currentUser?.id,
        dataType: "string",
        value
      },
      threadId
    });
  };

  const showCreateChat = () => {
    appControls.updateControls("drawer", {
      content: DrawerContentTypes.CreateChat
    });
  };

  const ThreadList = ({ threads }: { threads: Thread[] }) => {
    return (
      <ul>
        {threads.map((thread: Thread) => (
          <li key={thread.id} onClick={() => setCurrentThread(thread.id)}>
            <h4>{thread.name}</h4>
            <button onClick={() => onDelete(thread.id)}>Delete</button>
          </li>
        ))}
      </ul>
    );
  };

  const SelectedThread = ({ thread }: { thread?: Thread }) => {
    if (!thread) return <h1>No Thread Selected</h1>;
    const sendMessage = onAddMessage(thread?.id);
    return (
      <div>
        <h2>{thread.name}</h2>
        <button onClick={() => onDelete(thread.id)}>Delete</button>
        {thread.messages.map((message) => (
          <ChatMessage
            key={message?.id}
            threadId={thread.id}
            message={message as Message}
          />
        ))}
        <InputWithAction
          action={sendMessage}
          //TODO Subscribers should have more than just ID saved
          placeholder={`Message ${thread.name}`}
          buttonText="Send"
        ></InputWithAction>
      </div>
    );
  };

  return (
    <div>
      <Button name="Create Chat" action={showCreateChat}></Button>
      <ThreadList threads={Object.values(threads)} />
      <SelectedThread
        thread={currentThread ? threads[currentThread] : undefined}
      />
    </div>
  );
};
