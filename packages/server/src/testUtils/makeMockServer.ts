import { MongoMemoryServer } from "mongodb-memory-server";
import { Container } from "typedi";
import ServerService from "../domains/server/server.service";
import { SchoolService } from "../domains/school/school.service";
import { AppDataGateway } from "../domains/app/app.data.gateway";

import { UserRoles } from "@parsimony/types";

export const MOCK_USER = {
  id: "11111",
  schoolId: "mockSchoolId",
  timeZone: "",
  roles: [UserRoles.Director],
  // TODO: Reduce this to one thing
  type: UserRoles.Director,
  documents: [],
  password: "hello",
  email: "test@test.com",
  firstName: "Test",
  lastName: `User ${0}`,
  dateOfBirth: new Date(),
  phone: "1111111111",
  contacts: [],
  actionItems: [],
  programs: [],
  clients: [],
  threadDisplayName: "Test User",
  avatar: "",
  color: "red",
  serviceProvider: ""
};

export const makeMockServer = async () => {
  const mockMongo = await MongoMemoryServer.create();
  const ss = Container.get(SchoolService);
  const adg = Container.get(AppDataGateway);
  const mockUri = mockMongo.getUri();
  const server = Container.get(ServerService);
  await server.start({
    uri: mockUri,
    encryptionMethod: (pw: string) => pw,
    mockAuthContext: true,
    port: 4444,
    broadCastPort: 9090
  });

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
};
