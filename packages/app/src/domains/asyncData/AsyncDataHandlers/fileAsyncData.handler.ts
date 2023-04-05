import {
  CreateFilePayload,
  DeleteFilePayload,
  File,
  GetAllFilesByRelationshipPayload,
  GetFilePayload,
  UpdateFilePayload
} from "@parsimony/types";
import { AsyncDataHandlerInterface } from "../asyncDataHandler.interface";

export class FileAsyncDataHandler extends AsyncDataHandlerInterface<
  File,
  CreateFilePayload,
  DeleteFilePayload,
  UpdateFilePayload,
  GetFilePayload,
  GetAllFilesByRelationshipPayload
> {}
