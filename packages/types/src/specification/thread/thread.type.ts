// TODO: Refactor all of this!
export class Message {
  dataType: string;
  id: string;
  timeStamp: Date;
  userId: string;
  value: string;
}

export class Subscriber {
  displayName?: string;
  id: string;
}

export class Thread {
  id: string;
  isTyping: string[];
  messages: Message[];
  name: string;
  subscribers: Subscriber[];
}
