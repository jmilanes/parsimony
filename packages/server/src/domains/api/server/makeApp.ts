import { NestFactory } from "@nestjs/core";
import { APP_STRUCTURES, AppModule } from "./app.api.module";
import { Test } from "@nestjs/testing";
import ServerService from "../../server/server.service";
import { encrypt } from "@parsimony/utilities/dist";
import { MongoMemoryServer } from "mongodb-memory-server";
import { SchoolService } from "../../school/school.service";
import { AppDataGateway } from "../../app/app.data.gateway";

export async function makeApp() {
  const app = await NestFactory.create(AppModule);
  const MONGO_SERVER = app.get(ServerService);
  await MONGO_SERVER.start({
    uri: `mongodb://127.0.0.1:27017/`,
    encryptionMethod: encrypt
  });
  const adg = app.get(AppDataGateway);
  await adg.init();

  await app.listen(4000);
}

export async function makeTestApp() {
  const moduleRef = await Test.createTestingModule(APP_STRUCTURES).compile();
  const APP = moduleRef.createNestApplication();
  await APP.init();

  const mockMongo = await MongoMemoryServer.create();

  const ss = APP.get(SchoolService);
  const adg = APP.get(AppDataGateway);
  const server = APP.get(ServerService);

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

  return APP;
}
