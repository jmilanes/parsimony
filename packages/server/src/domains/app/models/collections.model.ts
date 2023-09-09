import { ObjectId } from "mongodb";
import { CollectionCategories, CollectionTypes } from "@parsimony/types";

export default {
  title: String,
  parentCollectionId: { type: ObjectId, ref: "Collection" },
  ancestors: [{ type: ObjectId, ref: "Collection" }],
  created_by: { type: ObjectId, ref: "User" },
  type: { type: String, enum: CollectionTypes },
  clientId: { type: ObjectId, enum: "User" },
  category: { type: String, enum: CollectionCategories }
};
