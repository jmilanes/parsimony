import TokenService from "../services/database/token.service";
import { User, UserRoles } from "@parsimony/types";
import { INestApplication } from "@nestjs/common";
import { Test } from "@nestjs/testing";
import { APP_STRUCTURES } from "../server/app.api.module";
import { MongoMemoryServer } from "mongodb-memory-server";
import { SchoolService } from "../services/school/school.service";
import { AppDataGateway } from "../services/database/app.data.gateway";
import ServerService from "../services/server/server.service";
import * as mongoose from "mongoose";
import {
  createTestCollection,
  createTestProgram,
  createTestResult,
  createTestUser,
  createTokenWithUser,
  mockMongoId
} from "./utilties";

export type TestAppAPI = {
  app: INestApplication;
  authorization: {
    director: string;
    employee: string;
  };
  createTokenWrappedUser: (user: Partial<User>) => string;
  stop: () => void;
  fixtures: {
    createTestUser: typeof createTestUser;
    createTestResult: typeof createTestResult;
    createTestCollection: typeof createTestCollection;
    createTestProgram: typeof createTestProgram;
  };
  db: {
    mockMongoId: typeof mockMongoId;
  };
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
    authorization: {
      director: `Bearer ${createTokenWrappedUser()}`,
      employee: `Bearer ${createTokenWrappedUser({
        type: UserRoles.Employee
      })}`
    },
    createTokenWrappedUser,
    stop: async () => {
      await APP.close();
      await mockMongo.stop();
      await mongoose.disconnect();
    },
    fixtures: {
      createTestUser,
      createTestResult,
      createTestCollection,
      createTestProgram
    },
    db: {
      mockMongoId
    }
  };
};
