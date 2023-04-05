import {
  CreateResultPayload,
  DeleteResultPayload,
  GetAllResultsByRelationshipPayload,
  GetResultPayload,
  Result,
  UpdateResultPayload
} from "@parsimony/types";
import { AsyncDataHandlerInterface } from "../asyncDataHandler.interface";

export class ResultAsyncDataHandler extends AsyncDataHandlerInterface<
  Result,
  CreateResultPayload,
  DeleteResultPayload,
  UpdateResultPayload,
  GetResultPayload,
  GetAllResultsByRelationshipPayload
> {}
