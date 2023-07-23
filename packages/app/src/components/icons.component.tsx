import React from "react";

import DeleteIcon from "@mui/icons-material/Delete";
import OpenInFullIcon from "@mui/icons-material/OpenInFull";
import CloseFullscreenIcon from "@mui/icons-material/CloseFullscreen";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import { TrackChangesRounded } from "@mui/icons-material";

export const Icon = {
  Delete: () => <DeleteIcon />,
  Expand: () => <OpenInFullIcon />,
  Collapse: () => <CloseFullscreenIcon />,
  Chat: () => <ChatBubbleOutlineIcon />,
  ProgramViewer: () => <AutoStoriesIcon />,
  BehaviorTracker: () => <TrackChangesRounded />
};
