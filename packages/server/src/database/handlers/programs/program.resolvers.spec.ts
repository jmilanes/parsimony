import "reflect-metadata";

import { MongoMemoryServer } from "mongodb-memory-server";
import { Container } from "typedi";

import { DataBaseService } from "../../dataBase.service";
import { modelTypes } from "../../models";
import { ProgramResolvers } from "./program.resolvers";
import {
  BehaviorType,
  CollectionCategories,
  CollectionTypes,
  ProgramCategories,
  ProgramTypes,
  TargetStyle,
  TrialChainingDirections,
  UserRoles
} from "@parsimony/types";
import { ObjectId } from "mongodb";
import {
  cleanCollections,
  disconnectFromDB,
  setupDB
} from "../../../testUtils/db.test.utils";

const generateProgramJSON = (title: string, collectionId?: String) => {
  return {
    title,
    collectionId,
    description: "",
    materials: "",
    writeAccess: [],
    readAccess: [],
    type: ProgramTypes.Main,
    lastEditedBy: new ObjectId(1),
    editedBy: [new ObjectId(1)],
    createdBy: new ObjectId(1),
    trials: 1,
    targets: [],
    mastered: false,
    category: ProgramCategories.Aba,
    targetOptions: [],
    chainingDirection: TrialChainingDirections.Forward,
    currentChainTarget: null,
    masteryTarget: 100,
    masteryConsecutiveTargets: 3,
    subscribers: [new ObjectId(1)]
  };
};

const generateBehaviorJSON = (title: string, collectionId?: String) => {
  return {
    title,
    collectionId,
    description: "",
    materials: "",
    writeAccess: [],
    readAccess: [],
    type: ProgramTypes.Main,
    lastEditedBy: new ObjectId(1),
    editedBy: [new ObjectId(1)],
    createdBy: new ObjectId(1),
    trials: 1,
    mastered: false,
    targetOptions: [],
    currentChainTarget: null,
    targetStyle: TargetStyle.Behavior,
    masteryTarget: 100,
    masteryConsecutiveTargets: 3,
    subscribers: [new ObjectId(1)],
    behavior: {
      alertTime: 0,
      type: BehaviorType.Tally,
      active: true
    }
  };
};

const generateUserPayload = (user: string) => {
  return {
    schoolId: "",
    timeZone: "",
    roles: [UserRoles.Client],
    type: "",
    documents: [],
    password: "hello",
    email: "test@",
    firstName: "Test",
    lastName: `User ${0}`,
    dateOfBirth: new Date(),
    phone: "test phone",
    contacts: [],
    actionItems: [],
    programs: [],
    clients: [],
    threadDisplayNameName: "Test User",
    avatar: "",
    color: "red",
    serviceProvider: ""
  };
};

const generateCollection = (
  title: string,
  collectionId?: string,
  ancestors: string[] = []
) => {
  return {
    title: title,
    parentCollectionId: collectionId,
    ancestors: ancestors,
    created_by: new ObjectId(1),
    type: CollectionTypes.Main,
    category: collectionId
      ? CollectionCategories.Sub
      : CollectionCategories.Book
  };
};

const setUpBulkProgramAdditions = async (db: DataBaseService) => {
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
  db: DataBaseService
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

const createUser = async (db: DataBaseService, name: string) =>
  await db.createEntry(modelTypes.user, generateUserPayload(name));

describe("Program Resolver Tests", () => {
  let db: DataBaseService;
  let mongo: MongoMemoryServer;
  let programResolver: ProgramResolvers;
  let s: any;

  beforeAll(async () => {
    const { mockMongo, mockDB, server } = await setupDB();
    db = mockDB;
    mongo = mockMongo;
    s = server;
    programResolver = Container.get(ProgramResolvers);
  });

  afterEach(async () => cleanCollections(db, s));
  afterAll(async () => disconnectFromDB(db, mongo));

  it("Should work with the Create Program Resolver", async () => {
    const program = await programResolver.create(
      {},
      {
        payload: generateProgramJSON("Test Program")
      }
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
      }
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
      }
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
      }
    );

    const programs = await db.findEntries(modelTypes.program, {
      clientId: client.id
    });

    expect(programs.length).toBe(3);
  });

  it("Should preform bulk with excludes", async () => {
    const { book, program1 } = await setUpBulkProgramAdditions(db);

    const client = await createUser(db, "Joey");

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
      }
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
      }
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
      }
    );

    const collections = await db.findEntries(modelTypes.collection, {
      clientId: client.id
    });

    expect(collections.length).toBe(3);
  });

  it("Should work with nested collection in reverse order", async () => {
    const { book, collectionL1, collectionL2 } =
      await setUpBulkProgramMultiLevelCategoryAdditions(db);

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
      }
    );

    const collections = await db.findEntries(modelTypes.collection, {
      clientId: client.id
    });

    expect(collections.length).toBe(3);
  });

  it("Should work with nested collection in mixed order", async () => {
    const { book, collectionL1, collectionL2 } =
      await setUpBulkProgramMultiLevelCategoryAdditions(db);

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
      }
    );

    const collections = await db.findEntries(modelTypes.collection, {
      clientId: client.id
    });

    expect(collections.length).toBe(3);
  });
});
