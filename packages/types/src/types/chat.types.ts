import { IId } from ".";

export type IUpdateIsTypingPayload = {
  threadId: IId;
  user: string;
  value: boolean;
};
