import { User } from "@parsimony/types";
import { makeTestApp, TestAppAPI } from "../../tests/makeTestApp";

const request = require("supertest");

describe("User Controller Tests", () => {
  let testAppAPI: TestAppAPI;

  beforeEach(async () => {
    testAppAPI = await makeTestApp();
  });

  afterEach(async () => {
    await testAppAPI.stop();
  });

  it(`POST: /users should create a user`, async () => {
    const postResponse = await request(testAppAPI.app.getHttpServer())
      .post("/users")
      .set("Authorization", testAppAPI.authorization.director)
      .send(
        testAppAPI.fixtures.createTestUser({
          firstName: "Test",
          lastName: "User"
        })
      )
      .expect(201);

    expect(testAppAPI.db.mockMongoId(postResponse.body)).toEqual({
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
    await request(testAppAPI.app.getHttpServer())
      .post("/users")
      .send(
        testAppAPI.fixtures.createTestUser({
          firstName: "Test",
          lastName: "User"
        })
      )
      .expect(403);
  });

  it(`POST: /users should not create a user without proper user role`, async () => {
    await request(testAppAPI.app.getHttpServer())
      .post("/users")
      .set("Authorization", testAppAPI.authorization.employee)
      .send(
        testAppAPI.fixtures.createTestUser({
          firstName: "Test",
          lastName: "User"
        })
      )
      .expect(403);
  });

  it(`POST: /users should not create a user without a correct auth token`, async () => {
    await request(testAppAPI.app.getHttpServer())
      .post("/users")
      .set("Authorization", "Bearer I_AM_NOT_A_VALID_TOKEN")
      .send(
        testAppAPI.fixtures.createTestUser({
          firstName: "Test",
          lastName: "User"
        })
      )
      .expect(403);
  });

  it(`POST: /users/:id should update a user`, async () => {
    const postResponse = await request(testAppAPI.app.getHttpServer())
      .post("/users")
      .set("Authorization", testAppAPI.authorization.director)
      .send(
        testAppAPI.fixtures.createTestUser({
          firstName: "Test"
        })
      )
      .expect(201);

    const updateResponse = await request(testAppAPI.app.getHttpServer())
      .post(`/users/${postResponse.body._id}`)
      .set("Authorization", testAppAPI.authorization.director)
      .send(
        testAppAPI.fixtures.createTestUser({
          id: postResponse.body._id,
          firstName: "CHANGE"
        })
      )
      .expect(201);

    expect(testAppAPI.db.mockMongoId(updateResponse.body)).toEqual({
      __v: 0,
      _id: "MONGO_ID",
      actionItems: [],
      avatar: "",
      clients: [],
      color: "",
      contacts: [],
      documents: [],
      email: "",
      firstName: "CHANGE",
      lastName: "",
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

  it(`POST: /users/:id should not update a user without proper user role`, async () => {
    const USER = testAppAPI.fixtures.createTestUser({
      firstName: "Test",
      lastName: "User"
    });
    const postResponse = await request(testAppAPI.app.getHttpServer())
      .post("/users")
      .set("Authorization", testAppAPI.authorization.director)
      .send(USER)
      .expect(201);

    await request(testAppAPI.app.getHttpServer())
      .post(`/users/${postResponse.body._id}`)
      .set("Authorization", testAppAPI.authorization.employee)
      .send({ ...USER, id: postResponse.body._id, firstName: "CHANGE" })
      .expect(403);
  });

  it(`GET: /users should get all users`, async () => {
    await request(testAppAPI.app.getHttpServer())
      .post("/users")
      .set("Authorization", testAppAPI.authorization.director)
      .send(
        testAppAPI.fixtures.createTestUser({
          firstName: "Test",
          lastName: "User"
        })
      )
      .expect(201);

    await request(testAppAPI.app.getHttpServer())
      .post("/users")
      .set("Authorization", testAppAPI.authorization.director)
      .send(
        testAppAPI.fixtures.createTestUser({
          firstName: "Test2",
          lastName: "User2"
        })
      )
      .expect(201);

    await request(testAppAPI.app.getHttpServer())
      .post("/users")
      .set("Authorization", testAppAPI.authorization.director)
      .send(
        testAppAPI.fixtures.createTestUser({
          firstName: "Test3",
          lastName: "User3"
        })
      )
      .expect(201);

    const getResponse = await request(testAppAPI.app.getHttpServer())
      .get("/users")
      .set("Authorization", testAppAPI.authorization.director)
      .expect(200);

    expect(getResponse.body.map(testAppAPI.db.mockMongoId)).toEqual([
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
        firstName: "Test3",
        lastName: "User3",
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

  it(`GET: /users/id should get a user`, async () => {
    const createResponse = await request(testAppAPI.app.getHttpServer())
      .post("/users")
      .set("Authorization", testAppAPI.authorization.director)
      .send(
        testAppAPI.fixtures.createTestUser({
          firstName: "Test",
          lastName: "User"
        })
      )
      .expect(201);

    const getResponse = await request(testAppAPI.app.getHttpServer())
      .get(`/users/${createResponse.body._id}`)
      .set("Authorization", testAppAPI.authorization.director)
      .expect(200);

    expect(testAppAPI.db.mockMongoId(getResponse.body)).toStrictEqual({
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

  it(`GET: /users/id should get not get a user that doesn't exist`, async () => {
    await request(testAppAPI.app.getHttpServer())
      .get(`/users/notAnId`)
      .set("Authorization", testAppAPI.authorization.director)
      .expect(500);
  });

  it(`DELETE: /users/id should delete a user`, async () => {
    const createResponse = await request(testAppAPI.app.getHttpServer())
      .post("/users")
      .set("Authorization", testAppAPI.authorization.director)
      .send(
        testAppAPI.fixtures.createTestUser({
          firstName: "Test",
          lastName: "User"
        })
      )
      .expect(201);

    await request(testAppAPI.app.getHttpServer())
      .delete(`/users/${createResponse.body._id}`)
      .set("Authorization", testAppAPI.authorization.director)
      .expect(200);

    await request(testAppAPI.app.getHttpServer())
      .get(`/users/${createResponse.body._id}`)
      .set("Authorization", testAppAPI.authorization.director)
      .expect(500);
  });

  it(`DELETE: /users/id should not delete a user that doesn't exist`, async () => {
    await request(testAppAPI.app.getHttpServer())
      .delete(`/users/notAnId`)
      .set("Authorization", testAppAPI.authorization.director)
      .expect(500);
  });

  it(`DELETE: /users/id should delete a user without proper user role`, async () => {
    const createResponse = await request(testAppAPI.app.getHttpServer())
      .post("/users")
      .set("Authorization", testAppAPI.authorization.director)
      .send(
        testAppAPI.fixtures.createTestUser({
          firstName: "Test",
          lastName: "User"
        })
      )
      .expect(201);

    await request(testAppAPI.app.getHttpServer())
      .delete(`/users/${createResponse.body._id}`)
      .set("Authorization", testAppAPI.authorization.employee)
      .expect(403);

    await request(testAppAPI.app.getHttpServer())
      .get(`/users/${createResponse.body._id}`)
      .set("Authorization", testAppAPI.authorization.director)
      .expect(200);
  });
});
