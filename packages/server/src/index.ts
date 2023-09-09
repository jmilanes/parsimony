import "reflect-metadata";
import ServerService from "./domains/server/server.service";
import { Container } from "typedi";

const server = Container.get(ServerService);
server.start();
