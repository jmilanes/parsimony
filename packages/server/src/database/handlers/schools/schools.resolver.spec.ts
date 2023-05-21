import "reflect-metadata";

import { MongoMemoryServer } from "mongodb-memory-server";
import { Container } from "typedi";
import ServerService from "../../../domains/server/server.service";
import { DataBaseService } from "../../dataBase.service";
import { modelTypes } from "../../models";
import {
  cleanCollections,
  disconnectFromDB,
  setupDB
} from "../../../testUtils/db.test.utils";

describe("School Resolver Tests", () => {
  let db: DataBaseService;
  let mongo: MongoMemoryServer;
  let s: any;

  beforeAll(async () => {
    const { mockMongo, mockDB, server } = await setupDB();
    db = mockDB;
    mongo = mockMongo;
    s = server;
  });

  afterEach(async () => await cleanCollections(db, s));
  afterAll(async () => await disconnectFromDB(db, mongo));

  it("Should work add school", async () => {
    const school = await db.createEntry(modelTypes.school, {
      name: "The First School of Parsimony",
      userCount: 0,
      accessTokens: []
    });
    expect(school.name).toBe("The First School of Parsimony");
  });

  it("After each should work", async () => {
    const schools = await db.findAllEntries(modelTypes.school);
    expect(schools.length).toBe(0);
  });
});
