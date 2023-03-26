import { IId } from "./index";

export type IUpdateIsTypingPayload = {
  threadId: IId;
  user: string;
  value: boolean;
};
