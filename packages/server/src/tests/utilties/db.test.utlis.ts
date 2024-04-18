export const mockMongoId = <T extends { _id?: string; id?: string }>(
  obj: T
): T => {
  obj._id && (obj._id = "MONGO_ID");
  obj.id && (obj.id = "MONGO_ID");
  return obj;
};
