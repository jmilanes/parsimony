export const mockMongoId = <T extends { _id: string }>(obj: T): T => {
  obj._id = "MONGO_ID";
  return obj;
};
