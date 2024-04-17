import { makeTestApp, TestAppAPI } from "../../../tests/makeTestApp";

const request = require("supertest");

describe("Result Controller Tests", () => {
  let testAppAPI: TestAppAPI;

  beforeEach(async () => {
    testAppAPI = await makeTestApp();
  });

  afterEach(async () => {
    await testAppAPI.stop();
  });

  it(`POST: /results should create a result`, async () => {
    const postResponse = await request(testAppAPI.app.getHttpServer())
      .post("/results")
      .set("Authorization", testAppAPI.authorization.director)
      .send(testAppAPI.fixtures.createTestResult())
      .expect(201);

    expect(testAppAPI.db.mockMongoId(postResponse.body)).toEqual({
      __v: 0,
      _id: "MONGO_ID",
      data: [],
      notes: "",
      programCompleteness: 0,
      result: 0,
      type: "TRIAL"
    });
  });

  it(`POST: /results should not create a result without auth token`, async () => {
    await request(testAppAPI.app.getHttpServer())
      .post("/results")
      .send(testAppAPI.fixtures.createTestResult())
      .expect(403);
  });

  it(`POST: /results should create a result without employee result role`, async () => {
    await request(testAppAPI.app.getHttpServer())
      .post("/results")
      .set("Authorization", testAppAPI.authorization.employee)
      .send(testAppAPI.fixtures.createTestResult())
      .expect(201);
  });

  it(`POST: /results should not create a result without a correct auth token`, async () => {
    await request(testAppAPI.app.getHttpServer())
      .post("/results")
      .set("Authorization", "Bearer I_AM_NOT_A_VALID_TOKEN")
      .send(testAppAPI.fixtures.createTestResult())
      .expect(403);
  });

  it(`POST: /results/:id should update a result`, async () => {
    const postResponse = await request(testAppAPI.app.getHttpServer())
      .post("/results")
      .set("Authorization", testAppAPI.authorization.director)
      .send(testAppAPI.fixtures.createTestResult())
      .expect(201);

    await request(testAppAPI.app.getHttpServer())
      .post(`/results/${postResponse.body._id}`)
      .set("Authorization", testAppAPI.authorization.director)
      .send(
        testAppAPI.fixtures.createTestResult({
          id: postResponse.body._id,
          programCompleteness: 100
        })
      )
      .expect(201);

    const getResponse = await request(testAppAPI.app.getHttpServer())
      .get(`/results/${postResponse.body._id}`)
      .set("Authorization", testAppAPI.authorization.director)
      .expect(200);

    expect(testAppAPI.db.mockMongoId(getResponse.body)).toEqual({
      __v: 0,
      _id: "MONGO_ID",
      data: [],
      notes: "",
      programCompleteness: 100,
      result: 0,
      type: "TRIAL"
    });
  });

  it(`POST: /results/:id should not update a result without proper result role`, async () => {
    const RESULT = testAppAPI.fixtures.createTestResult();

    const postResponse = await request(testAppAPI.app.getHttpServer())
      .post("/results")
      .set("Authorization", testAppAPI.authorization.director)
      .send(RESULT)
      .expect(201);

    await request(testAppAPI.app.getHttpServer())
      .post(`/results/${postResponse.body._id}`)
      .set("Authorization", testAppAPI.authorization.employee)
      .send({ ...RESULT, id: postResponse.body._id, firstName: "CHANGE" })
      .expect(403);
  });

  it(`GET: /results should get all results`, async () => {
    await request(testAppAPI.app.getHttpServer())
      .post("/results")
      .set("Authorization", testAppAPI.authorization.director)
      .send(testAppAPI.fixtures.createTestResult({}))
      .expect(201);

    await request(testAppAPI.app.getHttpServer())
      .post("/results")
      .set("Authorization", testAppAPI.authorization.director)
      .send(testAppAPI.fixtures.createTestResult())
      .expect(201);

    await request(testAppAPI.app.getHttpServer())
      .post("/results")
      .set("Authorization", testAppAPI.authorization.director)
      .send(testAppAPI.fixtures.createTestResult())
      .expect(201);

    const getResponse = await request(testAppAPI.app.getHttpServer())
      .get("/results")
      .set("Authorization", testAppAPI.authorization.director)
      .expect(200);

    expect(getResponse.body.map(testAppAPI.db.mockMongoId)).toEqual([
      {
        __v: 0,
        _id: "MONGO_ID",
        data: [],
        notes: "",
        programCompleteness: 0,
        result: 0,
        type: "TRIAL"
      },
      {
        __v: 0,
        _id: "MONGO_ID",
        data: [],
        notes: "",
        programCompleteness: 0,
        result: 0,
        type: "TRIAL"
      },
      {
        __v: 0,
        _id: "MONGO_ID",
        data: [],
        notes: "",
        programCompleteness: 0,
        result: 0,
        type: "TRIAL"
      }
    ]);
  });

  it(`GET: /results/id should get a result`, async () => {
    const createResponse = await request(testAppAPI.app.getHttpServer())
      .post("/results")
      .set("Authorization", testAppAPI.authorization.director)
      .send(testAppAPI.fixtures.createTestResult())
      .expect(201);

    const getResponse = await request(testAppAPI.app.getHttpServer())
      .get(`/results/${createResponse.body._id}`)
      .set("Authorization", testAppAPI.authorization.director)
      .expect(200);

    expect(testAppAPI.db.mockMongoId(getResponse.body)).toStrictEqual({
      __v: 0,
      _id: "MONGO_ID",
      data: [],
      notes: "",
      programCompleteness: 0,
      result: 0,
      type: "TRIAL"
    });
  });

  it(`GET: /results/id should get not get a result that doesn't exist`, async () => {
    await request(testAppAPI.app.getHttpServer())
      .get(`/results/notAnId`)
      .set("Authorization", testAppAPI.authorization.director)
      .expect(500);
  });

  it(`DELETE: /results/id should delete a result`, async () => {
    const createResponse = await request(testAppAPI.app.getHttpServer())
      .post("/results")
      .set("Authorization", testAppAPI.authorization.director)
      .send(testAppAPI.fixtures.createTestResult())
      .expect(201);

    await request(testAppAPI.app.getHttpServer())
      .delete(`/results/${createResponse.body._id}`)
      .set("Authorization", testAppAPI.authorization.director)
      .expect(200);

    await request(testAppAPI.app.getHttpServer())
      .get(`/results/${createResponse.body._id}`)
      .set("Authorization", testAppAPI.authorization.director)
      .expect(500);
  });

  it(`DELETE: /results/id should not delete a result that doesn't exist`, async () => {
    await request(testAppAPI.app.getHttpServer())
      .delete(`/results/notAnId`)
      .set("Authorization", testAppAPI.authorization.director)
      .expect(500);
  });

  it(`DELETE: /results/id should delete a result without proper result role`, async () => {
    const createResponse = await request(testAppAPI.app.getHttpServer())
      .post("/results")
      .set("Authorization", testAppAPI.authorization.director)
      .send(testAppAPI.fixtures.createTestResult())
      .expect(201);

    await request(testAppAPI.app.getHttpServer())
      .delete(`/results/${createResponse.body._id}`)
      .set("Authorization", testAppAPI.authorization.employee)
      .expect(403);

    await request(testAppAPI.app.getHttpServer())
      .get(`/results/${createResponse.body._id}`)
      .set("Authorization", testAppAPI.authorization.director)
      .expect(200);
  });
});
