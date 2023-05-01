import {
  Domains,
  CreateFilePayload,
  DeleteFilePayload,
  File,
  GetAllFilesByRelationshipPayload,
  GetFilePayload,
  UpdateFilePayload
} from "@parsimony/types";
import { AsyncDataHandlerInterface } from "../asyncDataHandler.interface";
import { fileRequests } from "@parsimony/bal";
import { Service } from "typedi";

@Service()
export class FileAsyncDataHandler extends AsyncDataHandlerInterface<
  File,
  CreateFilePayload,
  DeleteFilePayload,
  UpdateFilePayload,
  GetFilePayload,
  GetAllFilesByRelationshipPayload
> {
  domainName = Domains.File;
  requests = fileRequests;
}
