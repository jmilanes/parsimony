import { Container } from "typedi";
import ServerService from "./server.service";
import { encrypt } from "@parsimony/utilities/dist";

export const makeServer = async () => {
  const server = Container.get(ServerService);
  await server.start({
    uri: `mongodb://127.0.0.1:27017/`,
    encryptionMethod: encrypt
  });
};
