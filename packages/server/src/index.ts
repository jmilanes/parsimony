import "reflect-metadata";
import ServerService from "./domains/server/server.service";
import { Container } from "typedi";
import { CONNECTION_STRING } from "./database";

const server = Container.get(ServerService);
server.start(CONNECTION_STRING);
