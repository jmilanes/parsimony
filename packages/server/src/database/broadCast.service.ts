const WS = require("ws");

// type INotifyUsersPayLoad = {
//   subscribers: string[];
//   type: "THREAD" | "CALENDAR";
// };

export class BroadcastService {
  port: number;
  webSocket: Record<string, any>;
  webSocketServer: Record<string, any>;
  constructor(port: number) {
    this.port = port;
    this.webSocket = {};
    this.webSocketServer = new WS.Server({ port: port });
  }

  public init = () => {
    this.webSocketServer.on("connection", (socket: any) => {
      console.log(`${new Date()} Connection accepted.`);
      socket.on("message", (payload: string) =>
        this._broadcastPayloadToClients(this.webSocketServer.clients, payload)
      );
      socket.on("close", () => console.log(`Connection Closed.`));
    });

    // this.webSocket = new WS(`ws://localhost:${this.port}`);
    this.webSocket = new WS.server({ port: this.port });
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
