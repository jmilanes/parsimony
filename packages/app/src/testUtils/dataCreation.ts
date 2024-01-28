import {
  Collection,
  CollectionCategories,
  CollectionTypes,
  Program,
  ProgramCategories,
  ProgramTypes,
  User,
  UserRoles
} from "@parsimony/types";

export const createUserPayload = (
  user?: Partial<Omit<User, "id">>
): Omit<User, "id"> => {
  return {
    schoolId: "mockSchoolId",
    timeZone: "",
    roles: [UserRoles.Client],
    type: "",
    documents: [],
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

export const creatCollectionPayload = (colelction?: Partial<Collection>) => {
  return {
    title: "Test1",
    ancestors: [],
    type: CollectionTypes.Main,
    category: CollectionCategories.Book,
    ...colelction
  };
};

export const createProgramPayload = (
  program:
    | Required<Pick<Program, "title" | "collectionId" | "targetStyle">> &
        Partial<Omit<Program, "title" | "collectionId" | "targetStyle">>
): Omit<Program, "id"> => {
  return {
    description: "",
    materials: "",
    writeAccess: [],
    readAccess: [],
    type: ProgramTypes.Main,
    lastEditedBy: "",
    editedBy: [],
    createdBy: "",
    trials: 1,
    targets: [],
    mastered: false,
    category: ProgramCategories.Aba,
    targetOptions: [],
    chaining: {},
    behavior: {},
    masteryTarget: 100,
    masteryConsecutiveTargets: 3,
    subscribers: [],
    ...program
  };
};
