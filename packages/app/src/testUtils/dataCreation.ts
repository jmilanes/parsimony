import {
  Collection,
  CollectionCategories,
  CollectionTypes,
  Program,
  ProgramCategories,
  ProgramTypes,
  Result,
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
    type: UserRoles.Client,
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

// TODO: This pattern can be replaced once we have class typings with good defaults
export const createResultPayload = (
  result: Partial<Result>
): Omit<Result, "id"> => {
  return {
    programCompleteness: 0,
    data: [],
    notes: "",
    updated_at: "2024-03-09T16:27:19.966Z",
    created_at: "2024-03-09T16:27:19.966Z",
    ...result
  };
};
