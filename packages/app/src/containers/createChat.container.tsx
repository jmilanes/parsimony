import { Collections } from "@parsimony/types/src";
import React from "react";

import { createThread } from "../bal";

import { useServices } from "../context";
import { DrawerContentTypes } from "../services/appControls.service";

const CreateChat = () => {
  const { appControls } = useServices();

  const onCreateThread = () => {
    createThread({
      name: "New Thread Joey and Molly User ID",
      subscribers: ["62e9ee2370d1d288df4c8e8b", "630ab6b82e68791506f3ec5e"]
    });

    appControls.updateControls("drawer", {
      content: DrawerContentTypes.Chat
    });
  };

  return (
    <div>
      <h1>Create Chat</h1>
      <button onClick={onCreateThread}>create</button>
    </div>
  );
};

export default CreateChat;
