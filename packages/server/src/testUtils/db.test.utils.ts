import { Container } from "typedi";
import ServerService from "../domains/server/server.service";
import { MongoMemoryServer } from "mongodb-memory-server";
import { AppDB } from "../database/app.database";

export const setupDB = async () => {
  const server = Container.get(ServerService);
  const mockDB = Container.get(AppDB);
  const mockMongo = await MongoMemoryServer.create();
  const MEMORY_SERVER_CONNECTION_STRING = mockMongo.getUri();
  await server.start(MEMORY_SERVER_CONNECTION_STRING);
  return { mockDB, mockMongo, server };
};

export const disconnectFromDB = async (db: any, mongo: any) => {
  await db.dataBase.connections[0].dropDatabase();
  await db.dataBase.connections[0].close();
  await mongo.stop();
};

export const cleanCollections = async (db: any, server: ServerService) => {
  const collections = await db.dataBase.connections[0].db.collections();
  for (let collection of collections) {
    await collection.deleteMany({});
  }
  await server.close();
};
