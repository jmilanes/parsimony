import { INestApplication } from "@nestjs/common";
import { makeTestApp } from "../../server/makeApp";
import { User } from "@parsimony/types";

const request = require("supertest");

const mockMongoId = (obj: any) => {
  obj._id = "MONGO_ID";
  return obj;
};

describe("User Controller Tests", () => {
  let app: INestApplication;
  let auth: string;

  beforeEach(async () => {
    const { testApp, mockAuthToken } = await makeTestApp();
    app = testApp;
    auth = `Bearer ${mockAuthToken}`;
  });

  afterEach(async () => {
    await app.close();
  });

  it(`POST: /users should create a user`, async () => {
    const user = new User();
    user.schoolId = "mockSchoolId";
    user.firstName = "Test";
    user.lastName = "User";

    const postResponse = await request(app.getHttpServer())
      .post("/users")
      .set("Authorization", auth)
      .send(user)
      .expect(201);

    expect(mockMongoId(postResponse.body)).toEqual({
      __v: 0,
      _id: "MONGO_ID",
      actionItems: [],
      avatar: "",
      clients: [],
      color: "",
      contacts: [],
      documents: [],
      email: "",
      firstName: "Test",
      lastName: "User",
      password: "",
      phone: "",
      programs: [],
      roles: [],
      schoolId: "mockSchoolId",
      serviceProvider: "",
      threadDisplayName: "",
      type: "CLIENT"
    });
  });

  it(`POST: /users should not create a user without auth token`, async () => {
    const user = new User();
    user.schoolId = "mockSchoolId";
    user.firstName = "Test";
    user.lastName = "User";

    await request(app.getHttpServer()).post("/users").send(user).expect(403);
  });

  it(`POST: /users should not create a user without a correct auth token `, async () => {
    const user = new User();
    user.schoolId = "mockSchoolId";
    user.firstName = "Test";
    user.lastName = "User";

    await request(app.getHttpServer())
      .post("/users")
      .set("Authorization", "Bearer I_AM_NOT_A_VALID_TOKEN")
      .send(user)
      .expect(403);
  });

  it(`GET: /users should get all users`, async () => {
    const user = new User();
    user.schoolId = "mockSchoolId";
    user.firstName = "Test";
    user.lastName = "User";

    await request(app.getHttpServer())
      .post("/users")
      .set("Authorization", auth)
      .send({ ...user })
      .expect(201);

    user.firstName = "Test2";
    user.lastName = "User2";

    await request(app.getHttpServer())
      .post("/users")
      .set("Authorization", auth)
      .send({ ...user })
      .expect(201);

    user.firstName = "Test2";
    user.lastName = "User2";
    await request(app.getHttpServer())
      .post("/users")
      .set("Authorization", auth)
      .send({ ...user })
      .expect(201);

    const getResponse = await request(app.getHttpServer())
      .get("/users")
      .set("Authorization", auth)
      .expect(200);

    expect(getResponse.body.map(mockMongoId)).toEqual([
      {
        __v: 0,
        _id: "MONGO_ID",
        actionItems: [],
        avatar: "",
        clients: [],
        color: "",
        contacts: [],
        documents: [],
        email: "",
        firstName: "Test",
        lastName: "User",
        password: "",
        phone: "",
        programs: [],
        roles: [],
        schoolId: "mockSchoolId",
        serviceProvider: "",
        threadDisplayName: "",
        type: "CLIENT"
      },
      {
        __v: 0,
        _id: "MONGO_ID",
        actionItems: [],
        avatar: "",
        clients: [],
        color: "",
        contacts: [],
        documents: [],
        email: "",
        firstName: "Test2",
        lastName: "User2",
        password: "",
        phone: "",
        programs: [],
        roles: [],
        schoolId: "mockSchoolId",
        serviceProvider: "",
        threadDisplayName: "",
        type: "CLIENT"
      },
      {
        __v: 0,
        _id: "MONGO_ID",
        actionItems: [],
        avatar: "",
        clients: [],
        color: "",
        contacts: [],
        documents: [],
        email: "",
        firstName: "Test2",
        lastName: "User2",
        password: "",
        phone: "",
        programs: [],
        roles: [],
        schoolId: "mockSchoolId",
        serviceProvider: "",
        threadDisplayName: "",
        type: "CLIENT"
      }
    ]);
  });
});
