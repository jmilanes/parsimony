import {
  StoreCollections,
  CreateProgramPayload,
  DeleteProgramPayload,
  GetAllProgramsByRelationshipPayload,
  GetProgramPayload,
  Program,
  UpdateProgramPayload
} from "@parsimony/types";
import { AsyncDataHandlerInterface } from "../asyncDataHandler.interface";
import { programRequests } from "@parsimony/bal";
import { Service } from "typedi";

@Service()
export class ProgramAsyncDataHandler extends AsyncDataHandlerInterface<
  Program,
  CreateProgramPayload,
  DeleteProgramPayload,
  UpdateProgramPayload,
  GetProgramPayload,
  GetAllProgramsByRelationshipPayload
> {
  collectionName = StoreCollections.Program;
  requests = programRequests;
}
