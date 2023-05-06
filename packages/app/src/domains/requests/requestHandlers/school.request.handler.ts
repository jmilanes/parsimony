import {
  Domains,
  CreateSchoolPayload,
  DeleteSchoolPayload,
  GetAllSchoolByRelationshipPayload,
  GetSchoolPayload,
  School,
  UpdateSchoolPayload
} from "@parsimony/types";
import { IRequestHandler } from "../IRequestHandler";
import { schoolRequests } from "@parsimony/bal";
import { Service } from "typedi";

@Service()
export class SchoolRequestHandler extends IRequestHandler<
  School,
  CreateSchoolPayload,
  DeleteSchoolPayload,
  UpdateSchoolPayload,
  GetSchoolPayload,
  GetAllSchoolByRelationshipPayload
> {
  domainName = Domains.School;
  requests = schoolRequests;
}
