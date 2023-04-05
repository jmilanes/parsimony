import {
  CreateSchoolPayload,
  DeleteSchoolPayload,
  GetAllSchoolByRelationshipPayload,
  GetSchoolPayload,
  School,
  UpdateSchoolPayload
} from "@parsimony/types";
import { AsyncDataHandlerInterface } from "../asyncDataHandler.interface";

export class SchoolAsyncDataHandler extends AsyncDataHandlerInterface<
  School,
  CreateSchoolPayload,
  DeleteSchoolPayload,
  UpdateSchoolPayload,
  GetSchoolPayload,
  GetAllSchoolByRelationshipPayload
> {}
