import {
  Collection,
  CollectionCategories,
  CollectionTypes,
  Program,
  Result,
  User
} from "@parsimony/types";
import { DeepPartial } from "chart.js/types/utils";
import { mergeDeep } from "@tiptap/core";

export const createUserPayload = (
  overrides?: Partial<Omit<User, "id">>
): Omit<User, "id"> => {
  const user = new User();
  return {
    ...user,
    ...overrides
  };
};

export const creatCollectionPayload = (collection?: Partial<Collection>) => {
  return {
    title: "Test1",
    ancestors: [],
    type: CollectionTypes.Main,
    category: CollectionCategories.Book,
    ...collection
  };
};

export const createProgramPayload = <T extends Program>(
  definition: any,
  overrides: DeepPartial<T>
) => {
  const program = new definition();
  return mergeDeep(program, {
    ...overrides
  });
};

export const createResultPayload = (
  overRides: Partial<Result>
): Omit<Result, "id"> => {
  const initialResult = new Result();
  return {
    ...initialResult,
    ...overRides
  };
};
