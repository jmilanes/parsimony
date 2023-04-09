import {
  Collections,
  CreateResultPayload,
  DeleteResultPayload,
  GetAllResultsByRelationshipPayload,
  GetResultPayload,
  Result,
  UpdateResultPayload
} from "@parsimony/types";
import { AsyncDataHandlerInterface } from "../asyncDataHandler.interface";
import { resultRequests } from "@parsimony/bal";
import { Service } from "typedi";

@Service()
export class ResultAsyncDataHandler extends AsyncDataHandlerInterface<
  Result,
  CreateResultPayload,
  DeleteResultPayload,
  UpdateResultPayload,
  GetResultPayload,
  GetAllResultsByRelationshipPayload
> {
  collectionName = Collections.Result;
  requests = resultRequests;
}
