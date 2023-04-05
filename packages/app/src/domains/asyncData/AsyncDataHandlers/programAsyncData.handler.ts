import {
  CreateProgramPayload,
  DeleteProgramPayload,
  GetAllProgramsByRelationshipPayload,
  GetProgramPayload,
  Program,
  UpdateProgramPayload
} from "@parsimony/types";
import { AsyncDataHandlerInterface } from "../asyncDataHandler.interface";

export class ProgramAsyncDataHandler extends AsyncDataHandlerInterface<
  Program,
  CreateProgramPayload,
  DeleteProgramPayload,
  UpdateProgramPayload,
  GetProgramPayload,
  GetAllProgramsByRelationshipPayload
> {}
