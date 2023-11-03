import { Service } from "typedi";
import { envIs } from "@parsimony/utilities";
import { Observable } from "rxjs";

export type Socket$ = Observable<any>;

@Service()
export class SocketService {
  #socket$?: Socket$;
  #url: string = envIs("prod")
    ? "wss://broadcast.parsimony.app"
    : "ws://localhost:8080";

  constructor() {
    this.#init();
  }

  #init = () => {
    const webSocket = new WebSocket(this.#url);
    webSocket.onopen = () => console.log("User connection opened!");
    this.#socket$ = new Observable((subscriber) => {
      webSocket.onmessage = (message: any) => {
        const messageJSON = JSON.parse(message.data);
        console.info("Web Socket Update:", messageJSON);
        subscriber.next(messageJSON);
      };
    });
  };

  // TODO create interface for messages
  public subscribeToSocket = (next: (message: any) => void) => {
    this.#socket$?.subscribe({
      next
    });
  };
}
