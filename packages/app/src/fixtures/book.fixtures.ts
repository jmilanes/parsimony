import { Collection } from "@parsimony/types";
import { currentUserLS } from "./program.fixture";

export const initialCollectionData: Collection = {
  id: "",
  title: "",
  ancestors: [],
  collections: [],
  programs: [],
  created_by: currentUserLS
};
