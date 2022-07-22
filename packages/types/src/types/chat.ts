import { ChatActionTypes } from "@parsimony/types";
import { IId } from "./";

export type IUpdateIsTypingPayload = {
  threadId: IId;
  user: string;
  value: boolean;
};
