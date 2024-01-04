import { MongoMemoryServer } from "mongodb-memory-server";
import { Container } from "typedi";
import ServerService from "../domains/server/server.service";
import { SchoolService } from "../domains/school/school.service";
import { AppDataGateway } from "../domains/app/app.data.gateway";
import { modelTypes } from "../domains/app/models";
import { generateUserPayload } from "./creators.test.utils";
import { DataBaseService } from "../domains/database";

const initialMockCollections = {
  users: {
    model: modelTypes.user,
    data: [
      generateUserPayload({
        firstName: "Tom",
        lastName: "Smith",
        email: "ts@g.com",
        password: "12345"
      }),
      generateUserPayload({
        firstName: "John",
        lastName: "Smith",
        email: "js@g.com",
        password: "12345"
      })
    ]
  }
};

const generateMockData = async (db: DataBaseService<modelTypes>) => {
  const mockCollections = Object.values(initialMockCollections) || [];
  for (const mockCollection of mockCollections) {
    for (const d of mockCollection.data) {
      await db.createEntry(mockCollection.model, d);
    }
  }
};

export const makeMockServer = async () => {
  const mockMongo = await MongoMemoryServer.create();
  const ss = Container.get(SchoolService);
  const adg = Container.get(AppDataGateway);
  const mockUri = mockMongo.getUri();
  const server = Container.get(ServerService);
  await server.start({ uri: mockUri, encryptionMethod: (pw: string) => pw });

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
  await generateMockData(mockDB);
};
