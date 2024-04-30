import { makeTestApp, TestAppAPI } from "../../../tests/makeTestApp";
import { TaskAnalysis } from "@parsimony/types";

const request = require("supertest");

describe("Program Controller Tests", () => {
  let testAppAPI: TestAppAPI;

  beforeEach(async () => {
    testAppAPI = await makeTestApp();
  });

  afterEach(async () => {
    await testAppAPI.stop();
  });

  it(`POST: /programs should create a program`, async () => {
    const program = testAppAPI.fixtures.createTestProgram(TaskAnalysis);
    const postResponse = await request(testAppAPI.app.getHttpServer())
      .post("/programs")
      .set("Authorization", testAppAPI.authorization.director)
      .send(program)
      .expect(201);

    //TODO: Fix these once migration is secured
    expect(testAppAPI.db.mockMongoId(postResponse.body)).toEqual({
      __v: 0,
      id: "MONGO_ID",
      active: true,
      description: "Program Description",
      editedBy: [],
      mastered: false,
      masteryConsecutiveTargets: 1,
      masteryTarget: 100,
      materials: "",
      subscribers: [],
      targetOptions: [],
      targets: [],
      title: "Program Title",
      trials: 3,
      type: "MAIN",
      viewType: "TASK_ANALYSIS",
      chaining: {}
    });
  });

  it(`POST: /programs should not create a program without auth token`, async () => {
    await request(testAppAPI.app.getHttpServer())
      .post("/programs")
      .send(testAppAPI.fixtures.createTestProgram(TaskAnalysis))
      .expect(403);
  });

  it(`POST: /programs should not create a program without proper program role`, async () => {
    await request(testAppAPI.app.getHttpServer())
      .post("/programs")
      .set("Authorization", testAppAPI.authorization.employee)
      .send(testAppAPI.fixtures.createTestProgram(TaskAnalysis))
      .expect(403);
  });

  it(`POST: /programs should not create a program without a correct auth token`, async () => {
    await request(testAppAPI.app.getHttpServer())
      .post("/programs")
      .set("Authorization", "Bearer I_AM_NOT_A_VALID_TOKEN")
      .send(testAppAPI.fixtures.createTestProgram(TaskAnalysis))
      .expect(403);
  });

  it(`POST: /programs/:id should update a program`, async () => {
    const postResponse = await request(testAppAPI.app.getHttpServer())
      .post("/programs")
      .set("Authorization", testAppAPI.authorization.director)
      .send(testAppAPI.fixtures.createTestProgram(TaskAnalysis))
      .expect(201);

    await request(testAppAPI.app.getHttpServer())
      .post(`/programs/${postResponse.body.id}`)
      .set("Authorization", testAppAPI.authorization.director)
      .send(
        testAppAPI.fixtures.createTestProgram<TaskAnalysis>(TaskAnalysis, {
          id: postResponse.body.id,
          title: "Test"
        })
      )
      .expect(201);

    const getResponse = await request(testAppAPI.app.getHttpServer())
      .get(`/programs/${postResponse.body.id}`)
      .set("Authorization", testAppAPI.authorization.director)
      .expect(200);

    expect(testAppAPI.db.mockMongoId(getResponse.body)).toEqual({
      __v: 0,
      active: true,
      chaining: {},
      description: "Program Description",
      editedBy: [],
      id: "MONGO_ID",
      mastered: false,
      masteryConsecutiveTargets: 1,
      masteryTarget: 100,
      materials: "",
      subscribers: [],
      targetOptions: [],
      targets: [],
      title: "Test",
      trials: 3,
      type: "MAIN",
      viewType: "TASK_ANALYSIS"
    });
  });

  it(`POST: /programs/:id should not update a program without proper program role`, async () => {
    const USER = testAppAPI.fixtures.createTestProgram(TaskAnalysis);
    const postResponse = await request(testAppAPI.app.getHttpServer())
      .post("/programs")
      .set("Authorization", testAppAPI.authorization.director)
      .send(USER)
      .expect(201);

    await request(testAppAPI.app.getHttpServer())
      .post(`/programs/${postResponse.body.id}`)
      .set("Authorization", testAppAPI.authorization.employee)
      .send({ ...USER, id: postResponse.body.id, firstName: "CHANGE" })
      .expect(403);
  });

  it(`GET: /programs should get all programs`, async () => {
    await request(testAppAPI.app.getHttpServer())
      .post("/programs")
      .set("Authorization", testAppAPI.authorization.director)
      .send(testAppAPI.fixtures.createTestProgram(TaskAnalysis))
      .expect(201);

    await request(testAppAPI.app.getHttpServer())
      .post("/programs")
      .set("Authorization", testAppAPI.authorization.director)
      .send(
        testAppAPI.fixtures.createTestProgram<TaskAnalysis>(TaskAnalysis, {
          title: "Test Program 2"
        })
      )
      .expect(201);

    await request(testAppAPI.app.getHttpServer())
      .post("/programs")
      .set("Authorization", testAppAPI.authorization.director)
      .send(
        testAppAPI.fixtures.createTestProgram<TaskAnalysis>(TaskAnalysis, {
          title: "Test Program 3"
        })
      )
      .expect(201);

    const getResponse = await request(testAppAPI.app.getHttpServer())
      .get("/programs")
      .set("Authorization", testAppAPI.authorization.director)
      .expect(200);

    expect(getResponse.body.map(testAppAPI.db.mockMongoId)).toEqual([
      {
        __v: 0,
        id: "MONGO_ID",
        masteryConsecutiveTargets: 1,
        masteryTarget: 100,
        materials: "",
        active: true,
        description: "Program Description",
        editedBy: [],
        mastered: false,
        subscribers: [],
        targetOptions: [],
        targets: [],
        title: "Program Title",
        trials: 3,
        type: "MAIN",
        viewType: "TASK_ANALYSIS"
      },
      {
        __v: 0,
        id: "MONGO_ID",
        masteryConsecutiveTargets: 1,
        masteryTarget: 100,
        materials: "",
        active: true,
        description: "Program Description",
        editedBy: [],
        mastered: false,
        subscribers: [],
        targetOptions: [],
        targets: [],
        title: "Test Program 2",
        trials: 3,
        type: "MAIN",
        viewType: "TASK_ANALYSIS"
      },
      {
        __v: 0,
        id: "MONGO_ID",
        masteryConsecutiveTargets: 1,
        masteryTarget: 100,
        materials: "",
        active: true,
        description: "Program Description",
        editedBy: [],
        mastered: false,
        subscribers: [],
        targetOptions: [],
        targets: [],
        title: "Test Program 3",
        trials: 3,
        type: "MAIN",
        viewType: "TASK_ANALYSIS"
      }
    ]);
  });

  it(`GET: /programs/id should get a program`, async () => {
    const createResponse = await request(testAppAPI.app.getHttpServer())
      .post("/programs")
      .set("Authorization", testAppAPI.authorization.director)
      .send(testAppAPI.fixtures.createTestProgram(TaskAnalysis))
      .expect(201);

    const getResponse = await request(testAppAPI.app.getHttpServer())
      .get(`/programs/${createResponse.body.id}`)
      .set("Authorization", testAppAPI.authorization.director)
      .expect(200);

    expect(testAppAPI.db.mockMongoId(getResponse.body)).toStrictEqual({
      __v: 0,
      id: "MONGO_ID",
      active: true,
      description: "Program Description",
      masteryConsecutiveTargets: 1,
      masteryTarget: 100,
      materials: "",
      editedBy: [],
      mastered: false,
      subscribers: [],
      targetOptions: [],
      targets: [],
      title: "Program Title",
      trials: 3,
      type: "MAIN",
      viewType: "TASK_ANALYSIS"
    });
  });

  it(`GET: /programs/id should get not get a program that doesn't exist`, async () => {
    await request(testAppAPI.app.getHttpServer())
      .get(`/programs/notAnId`)
      .set("Authorization", testAppAPI.authorization.director)
      .expect(500);
  });

  it(`DELETE: /programs/id should delete a program`, async () => {
    const createResponse = await request(testAppAPI.app.getHttpServer())
      .post("/programs")
      .set("Authorization", testAppAPI.authorization.director)
      .send(testAppAPI.fixtures.createTestProgram(TaskAnalysis))
      .expect(201);

    await request(testAppAPI.app.getHttpServer())
      .delete(`/programs/${createResponse.body.id}`)
      .set("Authorization", testAppAPI.authorization.director)
      .expect(200);

    await request(testAppAPI.app.getHttpServer())
      .get(`/programs/${createResponse.body.id}`)
      .set("Authorization", testAppAPI.authorization.director)
      .expect(500);
  });

  it(`DELETE: /programs/id should not delete a program that doesn't exist`, async () => {
    await request(testAppAPI.app.getHttpServer())
      .delete(`/programs/notAnId`)
      .set("Authorization", testAppAPI.authorization.director)
      .expect(500);
  });

  it(`DELETE: /programs/id should delete a program without proper program role`, async () => {
    const createResponse = await request(testAppAPI.app.getHttpServer())
      .post("/programs")
      .set("Authorization", testAppAPI.authorization.director)
      .send(testAppAPI.fixtures.createTestProgram(TaskAnalysis))
      .expect(201);

    await request(testAppAPI.app.getHttpServer())
      .delete(`/programs/${createResponse.body.id}`)
      .set("Authorization", testAppAPI.authorization.employee)
      .expect(403);

    await request(testAppAPI.app.getHttpServer())
      .get(`/programs/${createResponse.body.id}`)
      .set("Authorization", testAppAPI.authorization.director)
      .expect(200);
  });
});
