import {
  Collections,
  CreateSchoolPayload,
  DeleteSchoolPayload,
  GetAllSchoolByRelationshipPayload,
  GetSchoolPayload,
  School,
  UpdateSchoolPayload
} from "@parsimony/types";
import { AsyncDataHandlerInterface } from "../asyncDataHandler.interface";
import { schoolRequests } from "@parsimony/bal";
import { Service } from "typedi";

@Service()
export class SchoolAsyncDataHandler extends AsyncDataHandlerInterface<
  School,
  CreateSchoolPayload,
  DeleteSchoolPayload,
  UpdateSchoolPayload,
  GetSchoolPayload,
  GetAllSchoolByRelationshipPayload
> {
  collectionName = Collections.School;
  requests = schoolRequests;
}
