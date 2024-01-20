import { Service } from "typedi";
import { envIs } from "@parsimony/utilities/dist";

const WS = require("ws");

@Service()
export class BroadcastService {
  webSocket: Record<string, any>;
  webSocketServer: Record<string, any>;

  constructor() {
    this.webSocket = {};
  }

  // TODO: See if still need is Server
  public init = (isServer?: boolean, port: number = 8080) => {
    this.webSocketServer = new WS.Server({ port });
    this.webSocketServer.on("connection", (socket: any) => {
      console.log(`${new Date()} Connection accepted.`);
      socket.on("message", (payload: string) =>
        this._broadcastPayloadToClients(this.webSocketServer.clients, payload)
      );
      socket.on("close", () => console.log(`Connection Closed.`));
    });
    this.webSocket = isServer
      ? new WS(`wss://broadcast.parsimony.app`)
      : new WS(`ws://localhost:${port}`);
  };

  private _broadcastPayloadToClients = (clients: any[], payload: any) =>
    clients.forEach(this._sendPayload(payload));

  private _sendPayload = (payload: any) => (client: any) => {
    if (client.readyState === WS.OPEN) {
      client.send(JSON.stringify(JSON.parse(payload)));
    }
  };

  public broadcast = (payload: Record<string, any>): void =>
    this.webSocket.send(JSON.stringify(payload));
}
