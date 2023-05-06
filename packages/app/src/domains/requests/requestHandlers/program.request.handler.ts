import {
  Domains,
  CreateProgramPayload,
  DeleteProgramPayload,
  GetAllProgramsByRelationshipPayload,
  GetProgramPayload,
  Program,
  UpdateProgramPayload
} from "@parsimony/types";
import { IRequestHandler } from "../IRequestHandler";
import { programRequests } from "@parsimony/bal";
import { Service } from "typedi";

@Service()
export class ProgramRequestHandler extends IRequestHandler<
  Program,
  CreateProgramPayload,
  DeleteProgramPayload,
  UpdateProgramPayload,
  GetProgramPayload,
  GetAllProgramsByRelationshipPayload
> {
  domainName = Domains.Program;
  requests = programRequests;
}
