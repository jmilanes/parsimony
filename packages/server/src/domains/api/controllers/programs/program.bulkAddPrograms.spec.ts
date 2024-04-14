import { makeTestApp, TestAppAPI } from "../../tests/makeTestApp";
import request from "supertest";
import { UserRoles } from "@parsimony/types";
import { modelTypes } from "../../../app/models";

const setUpBulkProgramAdditions = async (api: TestAppAPI) => {
  const book = await request(api.app.getHttpServer())
    .post("/collections")
    .set("Authorization", api.authorization.director)
    .send(api.fixtures.createTestCollection({ title: "Book" }));

  const collection = await request(api.app.getHttpServer())
    .post("/collections")
    .set("Authorization", api.authorization.director)
    .send(
      api.fixtures.createTestCollection({
        title: "Collection",
        parentCollectionId: book.body?._id,
        ancestors: [book.body?._id]
      })
    );

  const program1 = await request(api.app.getHttpServer())
    .post("/programs")
    .set("Authorization", api.authorization.director)
    .send(
      api.fixtures.createTestProgram({
        view: { title: "Test Program 1" },
        collectionId: collection.body?._id
      })
    );

  const program2 = await request(api.app.getHttpServer())
    .post("/programs")
    .set("Authorization", api.authorization.director)
    .send(
      api.fixtures.createTestProgram({
        view: { title: "Test Program 2" },
        collectionId: collection.body?._id
      })
    );

  const program3 = await request(api.app.getHttpServer())
    .post("/programs")
    .set("Authorization", api.authorization.director)
    .send(
      api.fixtures.createTestProgram({
        view: { title: "Test Program 3" },
        collectionId: collection.body?._id
      })
    );

  const behavior = await request(api.app.getHttpServer())
    .post("/programs")
    .set("Authorization", api.authorization.director)
    .send(
      api.fixtures.createTestProgram({
        view: { title: "Test Behavior" },
        collectionId: collection.body?._id
      })
    );

  return {
    program1: program1.body,
    program2: program2.body,
    program3: program3.body,
    book: book.body,
    collection: collection.body,
    behavior: behavior.body
  };
};

const setUpBulkProgramMultiLevelCategoryAdditions = async (api: TestAppAPI) => {
  const book = await request(api.app.getHttpServer())
    .post("/collections")
    .set("Authorization", api.authorization.director)
    .send(api.fixtures.createTestCollection({ title: "Book" }));

  const collectionL1 = await request(api.app.getHttpServer())
    .post("/collections")
    .set("Authorization", api.authorization.director)
    .send(
      api.fixtures.createTestCollection({
        title: "Collection",
        parentCollectionId: book.body?._id,
        ancestors: [book.body?._id]
      })
    );

  const collectionL2 = await request(api.app.getHttpServer())
    .post("/collections")
    .set("Authorization", api.authorization.director)
    .send(
      api.fixtures.createTestCollection({
        title: "Collection",
        parentCollectionId: collectionL1.body?._id,
        ancestors: [book.body?._id, collectionL1.body?._id]
      })
    );

  return {
    book: book.body,
    collectionL1: collectionL1.body,
    collectionL2: collectionL2.body
  };
};

describe("Bulk Add Program Tests", () => {
  let testAppAPI: TestAppAPI;

  beforeEach(async () => {
    testAppAPI = await makeTestApp();
  });

  afterEach(async () => {
    await testAppAPI.stop();
  });

  it("Should set up a basic bulk program", async () => {
    const { program1, program2, program3, book, collection } =
      await setUpBulkProgramAdditions(testAppAPI);
    const programs = await request(testAppAPI.app.getHttpServer())
      .get("/programs")
      .set("Authorization", testAppAPI.authorization.director);

    const p1 = await request(testAppAPI.app.getHttpServer())
      .get(`/programs/${program1._id}`)
      .set("Authorization", testAppAPI.authorization.director);

    const p2 = await request(testAppAPI.app.getHttpServer())
      .get(`/programs/${program2._id}`)
      .set("Authorization", testAppAPI.authorization.director);

    const p3 = await request(testAppAPI.app.getHttpServer())
      .get(`/programs/${program3._id}`)
      .set("Authorization", testAppAPI.authorization.director);

    const b = await request(testAppAPI.app.getHttpServer())
      .get(`/collections/${book._id}`)
      .set("Authorization", testAppAPI.authorization.director);

    const c = await request(testAppAPI.app.getHttpServer())
      .get(`/collections/${collection._id}`)
      .set("Authorization", testAppAPI.authorization.director);

    expect(p1.body.view.title).toBe("Test Program 1");
    expect(p2.body.view.title).toBe("Test Program 2");
    expect(p3.body.view.title).toBe("Test Program 3");
    expect(b.body.title).toBe("Book");
    expect(c.body.title).toBe("Collection");
    expect(programs.body.length).toBe(4);
  });

  it("Should preform bulk program addition from book id", async () => {
    const { book } = await setUpBulkProgramAdditions(testAppAPI);
    const client = await request(testAppAPI.app.getHttpServer())
      .post("/users")
      .set("Authorization", testAppAPI.authorization.director)
      .send(
        testAppAPI.fixtures.createTestUser({
          type: UserRoles.Client,
          firstName: "Joey"
        })
      );

    await request(testAppAPI.app.getHttpServer())
      .post("/operations/addProgramsToClient")
      .set("Authorization", testAppAPI.authorization.director)
      .send({
        collectionIds: [book._id],
        programIds: [],
        clientId: client.body._id,
        excludedIds: [],
        subscribers: []
      });

    const collections = await request(testAppAPI.app.getHttpServer())
      .post("/operations/byRelationship")
      .set("Authorization", testAppAPI.authorization.director)
      .send({
        model: modelTypes.collection,
        id: client.body._id,
        relationshipProperty: "clientId"
      });

    const programs = await request(testAppAPI.app.getHttpServer())
      .post("/operations/byRelationship")
      .set("Authorization", testAppAPI.authorization.director)
      .send({
        model: modelTypes.program,
        id: client.body._id,
        relationshipProperty: "clientId"
      });

    const titles = collections.body.map((x: any) => x.title);
    const clientIds = collections.body.map((x: any) => x.clientId);

    expect(clientIds.every((id: any) => id === client.body._id));

    expect(titles.includes("Book") && titles.includes("Collection")).toBe(true);

    expect(collections.body.length).toBe(2);
    expect(programs.body.length).toBe(4);
  });

  it("Should preform bulk program addition from collection id", async () => {
    const { collection } = await setUpBulkProgramAdditions(testAppAPI);
    const client = await request(testAppAPI.app.getHttpServer())
      .post("/users")
      .set("Authorization", testAppAPI.authorization.director)
      .send(
        testAppAPI.fixtures.createTestUser({
          type: UserRoles.Client,
          firstName: "Joey"
        })
      );

    await request(testAppAPI.app.getHttpServer())
      .post("/operations/addProgramsToClient")
      .set("Authorization", testAppAPI.authorization.director)
      .send({
        collectionIds: [collection._id],
        programIds: [],
        clientId: client.body._id,
        excludedIds: [],
        subscribers: []
      });

    const programs = await request(testAppAPI.app.getHttpServer())
      .post("/operations/byRelationship")
      .set("Authorization", testAppAPI.authorization.director)
      .send({
        model: modelTypes.program,
        id: client.body._id,
        relationshipProperty: "clientId"
      });

    expect(programs.body.length).toBe(4);
  });

  it("Should preform bulk program addition from program Ids", async () => {
    const { program2, program3, program1 } = await setUpBulkProgramAdditions(
      testAppAPI
    );
    const client = await request(testAppAPI.app.getHttpServer())
      .post("/users")
      .set("Authorization", testAppAPI.authorization.director)
      .send(
        testAppAPI.fixtures.createTestUser({
          type: UserRoles.Client,
          firstName: "Joey"
        })
      );

    await request(testAppAPI.app.getHttpServer())
      .post("/operations/addProgramsToClient")
      .set("Authorization", testAppAPI.authorization.director)
      .send({
        collectionIds: [],
        programIds: [program2._id, program3._id, program1._id],
        clientId: client.body._id,
        excludedIds: [],
        subscribers: []
      });

    const programs = await request(testAppAPI.app.getHttpServer())
      .post("/operations/byRelationship")
      .set("Authorization", testAppAPI.authorization.director)
      .send({
        model: modelTypes.program,
        id: client.body._id,
        relationshipProperty: "clientId"
      });

    expect(programs.body.length).toBe(3);
  });

  it("Should preform bulk with excludes", async () => {
    const { book, program1 } = await setUpBulkProgramAdditions(testAppAPI);
    const client = await request(testAppAPI.app.getHttpServer())
      .post("/users")
      .set("Authorization", testAppAPI.authorization.director)
      .send(
        testAppAPI.fixtures.createTestUser({
          type: UserRoles.Client,
          firstName: "Joey"
        })
      );

    await request(testAppAPI.app.getHttpServer())
      .post("/operations/addProgramsToClient")
      .set("Authorization", testAppAPI.authorization.director)
      .send({
        collectionIds: [book._id],
        programIds: [],
        clientId: client.body._id,
        excludedIds: [program1._id],
        subscribers: []
      });

    const programs = await request(testAppAPI.app.getHttpServer())
      .post("/operations/byRelationship")
      .set("Authorization", testAppAPI.authorization.director)
      .send({
        model: modelTypes.program,
        id: client.body._id,
        relationshipProperty: "clientId"
      });

    const collections = await request(testAppAPI.app.getHttpServer())
      .post("/operations/byRelationship")
      .set("Authorization", testAppAPI.authorization.director)
      .send({
        model: modelTypes.collection,
        id: client.body._id,
        relationshipProperty: "clientId"
      });

    expect(collections.body.length).toBe(2);
    expect(programs.body.length).toBe(3);
  });

  it("Should preform bulk with collection excludes", async () => {
    const { book, collection } = await setUpBulkProgramAdditions(testAppAPI);

    const client = await request(testAppAPI.app.getHttpServer())
      .post("/users")
      .set("Authorization", testAppAPI.authorization.director)
      .send(
        testAppAPI.fixtures.createTestUser({
          type: UserRoles.Client,
          firstName: "Joey"
        })
      );

    await request(testAppAPI.app.getHttpServer())
      .post("/operations/addProgramsToClient")
      .set("Authorization", testAppAPI.authorization.director)
      .send({
        collectionIds: [book._id],
        programIds: [],
        clientId: client.body._id,
        excludedIds: [collection._id],
        subscribers: []
      });

    const programs = await request(testAppAPI.app.getHttpServer())
      .post("/operations/byRelationship")
      .set("Authorization", testAppAPI.authorization.director)
      .send({
        model: modelTypes.program,
        id: client.body._id,
        relationshipProperty: "clientId"
      });

    const collections = await request(testAppAPI.app.getHttpServer())
      .post("/operations/byRelationship")
      .set("Authorization", testAppAPI.authorization.director)
      .send({
        model: modelTypes.collection,
        id: client.body._id,
        relationshipProperty: "clientId"
      });
    expect(collections.body.length).toBe(1);
    expect(programs.body.length).toBe(0);
  });

  it("Should work with nested collection in order", async () => {
    const { book, collectionL1, collectionL2 } =
      await setUpBulkProgramMultiLevelCategoryAdditions(testAppAPI);

    const client = await request(testAppAPI.app.getHttpServer())
      .post("/users")
      .set("Authorization", testAppAPI.authorization.director)
      .send(
        testAppAPI.fixtures.createTestUser({
          type: UserRoles.Client,
          firstName: "Joey"
        })
      );

    await request(testAppAPI.app.getHttpServer())
      .post("/operations/addProgramsToClient")
      .set("Authorization", testAppAPI.authorization.director)
      .send({
        collectionIds: [book._id, collectionL1._id, collectionL2._id],
        programIds: [],
        clientId: client.body._id,
        excludedIds: [],
        subscribers: []
      });

    const collections = await request(testAppAPI.app.getHttpServer())
      .post("/operations/byRelationship")
      .set("Authorization", testAppAPI.authorization.director)
      .send({
        model: modelTypes.collection,
        id: client.body._id,
        relationshipProperty: "clientId"
      });

    expect(collections.body.length).toBe(3);
  });

  it("Should work with nested collection in reverse order", async () => {
    const { book, collectionL1, collectionL2 } =
      await setUpBulkProgramMultiLevelCategoryAdditions(testAppAPI);

    const client = await request(testAppAPI.app.getHttpServer())
      .post("/users")
      .set("Authorization", testAppAPI.authorization.director)
      .send(
        testAppAPI.fixtures.createTestUser({
          type: UserRoles.Client,
          firstName: "Joey"
        })
      );

    await request(testAppAPI.app.getHttpServer())
      .post("/operations/addProgramsToClient")
      .set("Authorization", testAppAPI.authorization.director)
      .send({
        collectionIds: [collectionL2._id, collectionL1._id, book._id],
        programIds: [],
        clientId: client.body._id,
        excludedIds: [],
        subscribers: []
      });

    const collections = await request(testAppAPI.app.getHttpServer())
      .post("/operations/byRelationship")
      .set("Authorization", testAppAPI.authorization.director)
      .send({
        model: modelTypes.collection,
        id: client.body._id,
        relationshipProperty: "clientId"
      });

    expect(collections.body.length).toBe(3);
  });

  it("Should work with nested collection in mixed order", async () => {
    const { book, collectionL1, collectionL2 } =
      await setUpBulkProgramMultiLevelCategoryAdditions(testAppAPI);

    const client = await request(testAppAPI.app.getHttpServer())
      .post("/users")
      .set("Authorization", testAppAPI.authorization.director)
      .send(
        testAppAPI.fixtures.createTestUser({
          type: UserRoles.Client,
          firstName: "Joey"
        })
      );

    await request(testAppAPI.app.getHttpServer())
      .post("/operations/addProgramsToClient")
      .set("Authorization", testAppAPI.authorization.director)
      .send({
        collectionIds: [collectionL2._id, book._id, collectionL1._id],
        programIds: [],
        clientId: client.body._id,
        excludedIds: [],
        subscribers: []
      });

    const collections = await request(testAppAPI.app.getHttpServer())
      .post("/operations/byRelationship")
      .set("Authorization", testAppAPI.authorization.director)
      .send({
        model: modelTypes.collection,
        id: client.body._id,
        relationshipProperty: "clientId"
      });
    expect(collections.body.length).toBe(3);
  });
});
