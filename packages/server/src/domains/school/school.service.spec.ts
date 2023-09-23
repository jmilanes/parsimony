import "reflect-metadata";

import { MongoMemoryServer } from "mongodb-memory-server";
import { Container } from "typedi";
import {
  cleanCollections,
  disconnectFromDB
} from "../../testUtils/db.test.utils";
import { SchoolDB } from "./school.db";

import { SchoolService } from "./school.service";
import { TEST_MEMORY_SERVER_TOKEN } from "../database";
import {
  school1Data,
  school2Data
} from "../../testUtils/fixtures/school.fixture";

export const setupDB = async () => {
  const mockDB = Container.get(SchoolDB);
  const mockMongo = await MongoMemoryServer.create();
  const MEMORY_SERVER_CONNECTION_STRING = mockMongo.getUri();
  // Container.set(TEST_MEMORY_SERVER_TOKEN, MEMORY_SERVER_CONNECTION_STRING);
  const schoolService = Container.get(SchoolService);
  await schoolService.init();
  return { mockDB, mockMongo, schoolService };
};

describe("School Service Test", () => {
  let db: SchoolDB;
  let mongo: MongoMemoryServer;
  let ss: SchoolService;

  beforeAll(async () => {
    const { mockMongo, mockDB, schoolService } = await setupDB();
    db = mockDB;
    mongo = mockMongo;
    ss = schoolService;
  });

  afterEach(async () => cleanCollections(db));
  afterAll(async () => disconnectFromDB(db, mongo));

  it("Should add two schools to DB and school map", async () => {
    await ss.addSchool();
    await ss.addSchool();
    await ss.refreshSchools();
    expect(Object.keys(ss.map).length).toBe(2);
  });

  it("Should add return proper school by _id", async () => {
    const school1 = await ss.addSchool(school1Data);
    const school2 = await ss.addSchool(school2Data);
    await ss.refreshSchools();
    const s1 = school1.toJSON();
    const s2 = school2.toJSON();

    expect(ss.getSchoolById(s1._id)).toStrictEqual({
      ...school1Data,
      _id: s1._id,
      __v: 0
    });

    expect(ss.getSchoolById(s2._id)).toStrictEqual({
      ...school2Data,
      _id: s2._id,
      __v: 0
    });
  });
});
