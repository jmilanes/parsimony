export type ICrudRequests<Schema, CreatePayload, UploadPayload> = {
  getAll: () => Promise<Schema[]>;
  get: (id: string) => Promise<Schema>;
  delete: (id: string) => Promise<{ id: string }>;
  create: (payload: CreatePayload) => Promise<Schema>;
  update: (id: string, payload: UploadPayload) => Promise<Schema>;
};
