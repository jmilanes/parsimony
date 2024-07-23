import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.api.module";
import ServerService from "../services/server/server.service";
import { encrypt } from "@parsimony/utilities";
import { AppDataGateway } from "../services/database/app.data.gateway";

export async function makeApp() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  //NEED to install something
  // app.useGlobalPipes(new ValidationPipe());
  const MONGO_SERVER = app.get(ServerService);
  await MONGO_SERVER.start({
    uri: `mongodb://127.0.0.1:27017/`,
    encryptionMethod: encrypt
  });
  const adg = app.get(AppDataGateway);
  await adg.init();

  await app.listen(4000);
}
