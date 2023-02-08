import { IId } from "./index";

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
  UploadPayload,
  GetAllByRelationshipPayload
> {
  create: (payload: CreatePayload) => Promise<Schema>;
  init: () => void;
  delete: (payload: DeleteThreadPayload) => Promise<string>;
  update: (payload: UploadPayload) => Promise<Schema>;
  get: (id: string) => Promise<void>;
  getAll: () => Promise<void>;
  getAllByRelationship: (
    relationshipProperty: keyof Schema,
    id: string
  ) => Promise<void>;
}

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
