import { Container } from "typedi";
import ServerService from "../domains/server/server.service";
import { MongoMemoryServer } from "mongodb-memory-server";
import { AppDataGateway } from "../domains/app/app.data.gateway";

export const setupDB = async () => {
  const server = Container.get(ServerService);
  const mockDB = Container.get(AppDataGateway);
  const mockMongo = await MongoMemoryServer.create();
  // TODO need to fix this
  const MEMORY_SERVER_CONNECTION_STRING = mockMongo.getUri();
  await server.start();
  return { mockDB, mockMongo, server };
};

export const disconnectFromDB = async (db: any, mongo: any) => {
  await db.dataBase.close();
  await mongo.stop();
};

export const cleanCollections = async (db: any) => {
  await db.dataBase.dropDatabase();
};

export const closeServer = async (server: ServerService) => {
  await server.close();
};
