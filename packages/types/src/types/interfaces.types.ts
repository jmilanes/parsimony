export type ICrudRequests<
  Schema,
  CreatePayload,
  DeletePayload,
  UploadPayload,
  GetPayload
> = {
  getAll: () => Promise<Schema[]>;
  get: (payload: GetPayload) => Promise<Schema>;
  delete: (payload: DeletePayload) => Promise<{ id: string }>;
  create: (payload: CreatePayload) => Promise<Schema>;
  update: (payload: UploadPayload) => Promise<Schema>;
};
