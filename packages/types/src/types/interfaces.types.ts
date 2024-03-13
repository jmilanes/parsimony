export type ICrudRequests<
  Schema,
  CreatePayload,
  DeleteThreadPayload,
  UploadPayload,
  GetPayload,
  GetAllByRelationshipPayload
> = {
  getAll: () => Promise<Schema[]>;
  get: (payload: GetPayload) => Promise<Schema>;
  getAllByRelationship: (
    payload: GetAllByRelationshipPayload
  ) => Promise<Schema[]>;
  delete: (payload: DeleteThreadPayload) => Promise<string>;
  create: (payload: CreatePayload) => Promise<Schema>;
  update: (payload: UploadPayload) => Promise<Schema>;
};
