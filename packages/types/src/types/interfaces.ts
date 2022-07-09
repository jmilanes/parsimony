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
