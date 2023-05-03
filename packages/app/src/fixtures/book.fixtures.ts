import {
  Collection,
  CollectionCategories,
  CollectionTypes
} from "@parsimony/types";
import { currentUserLS } from "./program.fixture";

export const initialCollectionData: Collection = {
  id: "",
  title: "",
  ancestors: [],
  created_by: currentUserLS,
  type: CollectionTypes.Main,
  category: CollectionCategories.Book
};
