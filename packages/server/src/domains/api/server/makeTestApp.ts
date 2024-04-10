import TokenService from "../../database/token.service";
import { User, UserRoles } from "@parsimony/types";
import { INestApplication } from "@nestjs/common";
import { Test } from "@nestjs/testing";
import { APP_STRUCTURES } from "./app.api.module";
import { MongoMemoryServer } from "mongodb-memory-server";
import { SchoolService } from "../../school/school.service";
import { AppDataGateway } from "../../app/app.data.gateway";
import ServerService from "../../server/server.service";
import * as mongoose from "mongoose";

const createTokenWithUser =
  (ts: TokenService) =>
  (user: Partial<User> = {}) => {
    return ts.generateAccessToken({
      id: "mockUserId",
      schoolId: "mockSchoolId",
      firstName: "Test",
      lastName: "User",
      phone: "",
      contacts: [],
      clients: [],
      programs: [],
      actionItems: [],
      roles: [UserRoles.Admin],
      type: UserRoles.Admin,
      email: "",
      serviceProvider: "",
      ...user
    });
  };

export type TestAppAPI = {
  app: INestApplication;
  defaultAuthorization: string;
  defaultInvalidAuthorization: string;
  createTokenWrappedUser: (user: Partial<User>) => string;
  stop: () => void;
};

export const makeTestApp = async (): Promise<TestAppAPI> => {
  const moduleRef = await Test.createTestingModule(APP_STRUCTURES).compile();
  const APP = moduleRef.createNestApplication();
  await APP.init();

  const mockMongo = await MongoMemoryServer.create();

  const ss = APP.get(SchoolService);
  const adg = APP.get(AppDataGateway);
  const server = APP.get(ServerService);
  const tokenService = APP.get(TokenService);

  const createTokenWrappedUser = createTokenWithUser(tokenService);

  const mockUri = mockMongo.getUri();

  await server.start({
    uri: mockUri,
    encryptionMethod: (pw: string) => pw,
    mockAuthContext: true,
    port: 4444
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

  return {
    app: APP,
    defaultAuthorization: `Bearer ${createTokenWrappedUser()}`,
    defaultInvalidAuthorization: `Bearer ${createTokenWrappedUser({
      type: UserRoles.Employee
    })}`,
    createTokenWrappedUser,
    stop: async () => {
      await APP.close();
      await mockMongo.stop();
      await mongoose.disconnect();
    }
  };
};
