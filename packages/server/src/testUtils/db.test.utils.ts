import { Container } from "typedi";
import ServerService from "../domains/server/server.service";
import { MongoMemoryServer } from "mongodb-memory-server";
import { AppDataGateway } from "../domains/app/app.data.gateway";
import { SchoolService } from "../domains/school/school.service";
import { DBConnectionService } from "../domains/database/dbConnecitonService.service";
import { SchoolDB } from "../domains/school/school.db";

export const setupAppDBForMockSchool = async () => {
  const server = Container.get(ServerService);
  const ss = Container.get(SchoolService);
  const adg = Container.get(AppDataGateway);
  const cs = Container.get(DBConnectionService);

  const mockMongo = await MongoMemoryServer.create();
  const MEMORY_SERVER_CONNECTION_STRING = mockMongo.getUri();

  cs.connection = MEMORY_SERVER_CONNECTION_STRING;
  ss.connectionPath = "mock";

  await server.start(MEMORY_SERVER_CONNECTION_STRING);
  ss.map = {
    mockSchoolId: {
      dbConnection: "appDataUri",
      name: "mockSchool",
      _id: "mockSchoolId",
      accessToken: "fake",
      refreshToken: "fake_refresh",
      clientSeats: 10,
      primaryEmail: "test@parsimony.app"
    }
  };
  await adg.init();
  const mockDB = adg.dbBySchoolId("mockSchoolId");
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

export const setupSchoolDB = async () => {
  const mockDB = Container.get(SchoolDB);
  const dbcs = Container.get(DBConnectionService);
  const schoolService = Container.get(SchoolService);

  const mockMongo = await MongoMemoryServer.create();
  const MEMORY_SERVER_CONNECTION_STRING = mockMongo.getUri();

  dbcs.connection = MEMORY_SERVER_CONNECTION_STRING;
  schoolService.connectionPath = "mockSchoolConnectionPath";

  await schoolService.init();

  return { mockDB, mockMongo, schoolService };
};
