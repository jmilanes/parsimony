import { MongoMemoryServer } from "mongodb-memory-server";
import { Container } from "typedi";

import { modelTypes } from "../../models";
import { ProgramResolvers } from "./program.resolvers";

import {
  cleanCollections,
  closeServer,
  disconnectFromDB,
  setupAppDBForMockSchool
} from "../../../../testUtils/db.test.utils";

import {
  createCurrentUser,
  createUser,
  generateBehaviorJSON,
  generateCollection,
  generateProgramJSON
} from "../../../../testUtils/creators.test.utils";
import { DataBaseService } from "../../../database";

const setUpBulkProgramAdditions = async (db: DataBaseService<modelTypes>) => {
  const book = await db.createEntry(
    modelTypes.collection,
    generateCollection("Book")
  );

  const collection = await db.createEntry(
    modelTypes.collection,
    generateCollection("Collection", book._id, [book._id])
  );

  const program1 = await db.createEntry(
    modelTypes.program,
    generateProgramJSON("Test Program 1", collection._id)
  );
  const program2 = await db.createEntry(
    modelTypes.program,
    generateProgramJSON("Test Program 2", collection._id)
  );
  const program3 = await db.createEntry(
    modelTypes.program,
    generateProgramJSON("Test Program 3", collection._id)
  );

  const behavior = await db.createEntry(
    modelTypes.program,
    generateBehaviorJSON("Test Behavior", collection._id)
  );

  return { program1, program2, program3, book, collection, behavior };
};

const setUpBulkProgramMultiLevelCategoryAdditions = async (
  db: DataBaseService<modelTypes>
) => {
  const book = await db.createEntry(
    modelTypes.collection,
    generateCollection("Book")
  );

  const collectionL1 = await db.createEntry(
    modelTypes.collection,
    generateCollection("Collection", book._id, [book._id])
  );

  const collectionL2 = await db.createEntry(
    modelTypes.collection,
    generateCollection("Collection", collectionL1._id, [
      book._id,
      collectionL1._id
    ])
  );

  return { book, collectionL1, collectionL2 };
};

describe("Program Resolver Tests", () => {
  let db: DataBaseService<modelTypes>;
  let mongo: MongoMemoryServer;
  let programResolver: ProgramResolvers;
  let s: any;

  beforeAll(async () => {
    const { mockMongo, mockDB, server } = await setupAppDBForMockSchool();
    db = mockDB;
    mongo = mockMongo;
    s = server;
    programResolver = Container.get(ProgramResolvers);
  });

  afterEach(async () => {
    await cleanCollections(db);
    await closeServer(s);
  });

  afterAll(async () => disconnectFromDB(db, mongo));

  it("Should work with the Create Program Resolver", async () => {
    const currentUser = await createCurrentUser(db);
    const program = await programResolver.create(
      {},
      {
        payload: generateProgramJSON("Test Program")
      },
      //@ts-ignore
      { currentUser: currentUser }
    );
    expect(program.title).toBe("Test Program");

    const programs = await db.findAllEntries(modelTypes.program);
    expect(programs.length).toBe(1);
  });

  it("Should set up a basic bulk program", async () => {
    const { program1, program2, program3, book, collection } =
      await setUpBulkProgramAdditions(db);
    const programs = await db.findAllEntries(modelTypes.program);

    const p1 = await db.findEntry(modelTypes.program, program1._id);
    const p2 = await db.findEntry(modelTypes.program, program2._id);
    const p3 = await db.findEntry(modelTypes.program, program3._id);
    const b = await db.findEntry(modelTypes.collection, book._id);
    const c = await db.findEntry(modelTypes.collection, collection._id);

    expect(p1.title).toBe("Test Program 1");
    expect(p2.title).toBe("Test Program 2");
    expect(p3.title).toBe("Test Program 3");
    expect(b.title).toBe("Book");
    expect(c.title).toBe("Collection");
    expect(programs.length).toBe(4);
  });

  it("Should preform bulk program addition from book id", async () => {
    const { book } = await setUpBulkProgramAdditions(db);
    const client = await createUser(db, "Joey");
    const currentUser = await createCurrentUser(db);

    await programResolver.addProgramsToClient(
      {},
      {
        payload: {
          collectionIds: [book.id],
          programIds: [],
          clientId: client.id,
          excludedIds: [],
          subscribers: []
        }
      },
      //@ts-ignore
      { currentUser: currentUser }
    );

    const collections = await db.findEntries(modelTypes.collection, {
      clientId: client.id
    });
    const programs = await db.findEntries(modelTypes.program, {
      clientId: client.id
    });

    const titles = collections.map((x: any) => x.toJSON().title);
    const clientIds = collections.map((x: any) => x.toJSON().clientId);

    expect(clientIds.every((id: any) => id === client.id));

    expect(titles.includes("Book") && titles.includes("Collection")).toBe(true);

    expect(collections.length).toBe(2);
    expect(programs.length).toBe(4);
  });

  it("Should preform bulk program addition from collection id", async () => {
    const { collection } = await setUpBulkProgramAdditions(db);
    const client = await createUser(db, "Joey");
    const currentUser = await createCurrentUser(db);

    await programResolver.addProgramsToClient(
      {},
      {
        payload: {
          collectionIds: [collection.id],
          programIds: [],
          clientId: client.id,
          excludedIds: [],
          subscribers: []
        }
      },
      //@ts-ignore
      { currentUser: currentUser }
    );

    const programs = await db.findEntries(modelTypes.program, {
      clientId: client.id
    });

    expect(programs.length).toBe(4);
  });

  it("Should preform bulk program addition from program Ids", async () => {
    const { program2, program3, program1 } = await setUpBulkProgramAdditions(
      db
    );
    const client = await createUser(db, "Joey");
    const currentUser = await createCurrentUser(db);

    await programResolver.addProgramsToClient(
      {},
      {
        payload: {
          collectionIds: [],
          programIds: [program2.id, program3.id, program1.id],
          clientId: client.id,
          excludedIds: [],
          subscribers: []
        }
      },
      //@ts-ignore
      { currentUser: currentUser }
    );

    const programs = await db.findEntries(modelTypes.program, {
      clientId: client.id
    });

    expect(programs.length).toBe(3);
  });

  it("Should preform bulk with excludes", async () => {
    const { book, program1 } = await setUpBulkProgramAdditions(db);

    const client = await createUser(db, "Joey");
    const currentUser = await createCurrentUser(db);

    await programResolver.addProgramsToClient(
      {},
      {
        payload: {
          collectionIds: [book.id],
          programIds: [],
          clientId: client.id,
          excludedIds: [program1.id],
          subscribers: []
        }
      },
      //@ts-ignore
      { currentUser: currentUser }
    );

    const programs = await db.findEntries(modelTypes.program, {
      clientId: client.id
    });

    const collections = await db.findEntries(modelTypes.collection, {
      clientId: client.id
    });

    expect(collections.length).toBe(2);
    expect(programs.length).toBe(3);
  });

  it("Should preform bulk with collection excludes", async () => {
    const { book, collection } = await setUpBulkProgramAdditions(db);

    const client = await createUser(db, "Joey");
    const currentUser = await createCurrentUser(db);

    await programResolver.addProgramsToClient(
      {},
      {
        payload: {
          collectionIds: [book.id],
          programIds: [],
          clientId: client.id,
          excludedIds: [collection.id],
          subscribers: []
        }
      },
      //@ts-ignore
      { currentUser: currentUser }
    );

    const programs = await db.findEntries(modelTypes.program, {
      clientId: client.id
    });

    const collections = await db.findEntries(modelTypes.collection, {
      clientId: client.id
    });

    expect(collections.length).toBe(1);
    expect(programs.length).toBe(0);
  });

  it("Should work with nested collection in order", async () => {
    const { book, collectionL1, collectionL2 } =
      await setUpBulkProgramMultiLevelCategoryAdditions(db);

    const client = await createUser(db, "Joey");
    const currentUser = await createCurrentUser(db);

    await programResolver.addProgramsToClient(
      {},
      {
        payload: {
          collectionIds: [book.id, collectionL1.id, collectionL2.id],
          programIds: [],
          clientId: client.id,
          excludedIds: [],
          subscribers: []
        }
      },
      //@ts-ignore
      { currentUser: currentUser }
    );

    const collections = await db.findEntries(modelTypes.collection, {
      clientId: client.id
    });

    expect(collections.length).toBe(3);
  });

  it("Should work with nested collection in reverse order", async () => {
    const { book, collectionL1, collectionL2 } =
      await setUpBulkProgramMultiLevelCategoryAdditions(db);
    const currentUser = await createCurrentUser(db);

    const client = await createUser(db, "Joey");

    await programResolver.addProgramsToClient(
      {},
      {
        payload: {
          collectionIds: [collectionL2.id, collectionL1.id, book.id],
          programIds: [],
          clientId: client.id,
          excludedIds: [],
          subscribers: []
        }
      },
      //@ts-ignore
      { currentUser: currentUser }
    );

    const collections = await db.findEntries(modelTypes.collection, {
      clientId: client.id
    });

    expect(collections.length).toBe(3);
  });

  it("Should work with nested collection in mixed order", async () => {
    const { book, collectionL1, collectionL2 } =
      await setUpBulkProgramMultiLevelCategoryAdditions(db);

    const currentUser = await createCurrentUser(db);

    const client = await createUser(db, "Joey");

    await programResolver.addProgramsToClient(
      {},
      {
        payload: {
          collectionIds: [collectionL2.id, book.id, collectionL1.id],
          programIds: [],
          clientId: client.id,
          excludedIds: [],
          subscribers: []
        }
      }, //@ts-ignore
      { currentUser: currentUser }
    );

    const collections = await db.findEntries(modelTypes.collection, {
      clientId: client.id
    });

    expect(collections.length).toBe(3);
  });
});
