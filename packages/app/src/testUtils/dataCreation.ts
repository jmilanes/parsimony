import {
  Collection,
  CollectionCategories,
  CollectionTypes,
  Program,
  User,
  UserRoles
} from "@parsimony/types";
import { ObjectId } from "mongodb";

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

export const creatProgramPayload = (program?: Partial<Program>) => {};
