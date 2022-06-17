const WS = require("ws");

// type INotifyUsersPayLoad = {
//   subscribers: string[];
//   type: "THREAD" | "CALENDAR";
// };

export class BroadcastController {
  port: number;
  webSocket: Record<string, any>;
  webSocketServer: Record<string, any>;
  constructor(port: number) {
    this.port = port;
    this.webSocket = {};
    this.webSocketServer = new WS.Server({ port: port });
  }

  init = () => {
    this.webSocketServer.on("connection", (socket: any) => {
      console.log(`${new Date()} Connection accepted.`);
      socket.on("message", (payload: string) =>
        this.broadcastPayloadToClients(this.webSocketServer.clients, payload)
      );
      socket.on("close", () => console.log(`Connection Closed.`));
    });

    this.webSocket = new WS(`ws://localhost:${this.port}`);
  };

  broadcastPayloadToClients = (clients: any[], payload: any) => {
    clients.forEach((client) => {
      if (client.readyState === WS.OPEN) {
        client.send(JSON.stringify(JSON.parse(payload)));
      }
    });
  };

  broadcast = (payload: string) => this.webSocket.send(payload);
}
