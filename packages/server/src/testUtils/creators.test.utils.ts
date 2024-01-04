import {
  BehaviorType,
  CollectionCategories,
  CollectionTypes,
  ProgramCategories,
  ProgramTypes,
  TargetStyle,
  TrialChainingDirections,
  User,
  UserRoles
} from "@parsimony/types";
import { ObjectId } from "mongodb";
import { DataBaseService, modelTypes } from "../domains/database";

export const generateProgramJSON = (title: string, collectionId?: String) => {
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

export const generateBehaviorJSON = (title: string, collectionId?: String) => {
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
      type: BehaviorType.Frequency,
      active: true
    }
  };
};

export const generateUserPayload = (
  user?: Partial<Omit<User, "id">>
): Omit<User, "id"> => {
  return {
    schoolId: "mockSchoolId",
    timeZone: "",
    roles: [UserRoles.Client],
    type: "",
    documents: [],
    password: "hello",
    email: "test@test.com",
    firstName: "Test",
    lastName: `User ${0}`,
    dateOfBirth: new Date(),
    phone: "1111111111",
    contacts: [],
    actionItems: [],
    programs: [],
    clients: [],
    threadDisplayNameName: "Test User",
    avatar: "",
    color: "red",
    serviceProvider: "",
    ...user
  };
};

export const createUser = async (
  db: DataBaseService<modelTypes>,
  name: string
) => await db.createEntry(modelTypes.user, generateUserPayload());

export const generateCollection = (
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

export const createCurrentUser = async (db: DataBaseService<modelTypes>) => {
  const user = await db.createEntry(
    modelTypes.user,
    generateUserPayload({ roles: [UserRoles.Director] })
  );
  return user.toJSON();
};
