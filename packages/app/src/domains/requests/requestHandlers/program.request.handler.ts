import {
  Domains,
  CreateProgramPayload,
  DeleteProgramPayload,
  GetAllProgramsByRelationshipPayload,
  GetProgramPayload,
  Program,
  UpdateProgramPayload
} from "@parsimony/types";
import { CrudRequestHandler } from "../CrudRequestHandler";

import { Service } from "typedi";
import { createRestRequest } from "../request.utils";

@Service()
export class ProgramRequestHandler extends CrudRequestHandler<
  Program,
  CreateProgramPayload,
  DeleteProgramPayload,
  UpdateProgramPayload,
  GetProgramPayload,
  GetAllProgramsByRelationshipPayload
> {
  domainName = Domains.Program;
  requests = {
    get: createRestRequest<GetProgramPayload, Program>("GET", "programs"),
    getAll: createRestRequest<undefined, Program[]>("GET", "programs"),
    delete: createRestRequest<DeleteProgramPayload, string>(
      "DELETE",
      "programs"
    ),
    create: createRestRequest<CreateProgramPayload, Program>(
      "POST",
      "programs"
    ),
    update: createRestRequest<UpdateProgramPayload, Program>("POST", "programs")
  };
}
