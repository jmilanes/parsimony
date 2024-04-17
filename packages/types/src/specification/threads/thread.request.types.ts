import { Subscriber } from "./thread.type";

export class AddMessagePayload {
  message: MessagePayload;
  threadId: string;
}

export class CreateThreadPayload {
  name: string;
  subscribers: Subscriber[];
}

export class DeleteMessagePayload {
  messageId: string;
  threadId: string;
}

export class DeleteThreadPayload {
  id: string;
}

export class EditMessagePayload {
  messageId: string;
  threadId: string;
  value: string;
}

export class GetAllThreadsByRelationshipPayload {
  id: string;
  relationshipProperty: string;
}

export class GetThreadPayload {
  id: string;
}

export class MessagePayload {
  dataType?: string;
  id?: string;
  timeStamp?: Date;
  userId?: string;
  value?: string;
}

export class UpdateThreadPayload {
  id: string;
  name: string;
  subscribers: Subscriber[];
}
