import { IId } from ".";

export interface ICrudGenerator<Schema> {
  collection?: Record<string, Schema>;
  count: number;
  create: (payload: Schema) => IId;
  get: (id: string) => Schema;
  getAll: () => Schema[];
  delete: (id: string) => void;
  update: (payload: Schema & { id: IId }) => void;
}

export interface IDataAccess<Schema> {
  create: (payload: Schema) => IId;
  get: (id: string) => Schema;
  getAll: () => Schema[];
  getAllBy: (key: keyof Schema, value: unknown) => Schema[];
  delete: (id: string) => void;
  update: (payload: Schema & { id: IId }) => void;
}

export interface ICrudGeneratorAsync<
  Schema,
  CreatePayload,
  DeleteThreadPayload,
  UploadPayload
> {
  create: (payload: CreatePayload) => void;
  init: () => void;
  delete: (payload: DeleteThreadPayload) => void;
  update: (payload: UploadPayload) => void;
  get: (id: string) => Schema;
  getAll: () => Schema[];
  getAllBy: (key: keyof Schema, value: unknown) => Schema[];
}

export type ICrudRequests<
  Schema,
  CreatePayload,
  DeleteThreadPayload,
  UploadPayload,
  GetPayload
> = {
  getAll: () => Promise<Schema[]>;
  get: (payload?: GetPayload) => Promise<Schema>;
  delete: (payload?: DeleteThreadPayload) => Promise<string>;
  create: (payload?: CreatePayload) => Promise<Schema>;
  update: (payload?: UploadPayload) => Promise<Schema>;
};
