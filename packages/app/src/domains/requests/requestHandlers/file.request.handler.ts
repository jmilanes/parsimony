import {
  Domains,
  CreateFilePayload,
  DeleteFilePayload,
  File,
  GetAllFilesByRelationshipPayload,
  GetFilePayload,
  UpdateFilePayload
} from "@parsimony/types";
import { IRequestHandler } from "../IRequestHandler";
import { fileRequests } from "@parsimony/bal";
import { Service } from "typedi";

@Service()
export class FileRequestHandler extends IRequestHandler<
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
