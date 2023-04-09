import {
  StoreCollections,
  CreateProgramPayload,
  DeleteProgramPayload,
  GetAllProgramsByRelationshipPayload,
  GetProgramPayload,
  Program,
  UpdateProgramPayload
} from "@parsimony/types";
import { createRequest } from "../../utils";
import generateCrudOperationStrings from "./operationStrings/generateCrudOperationStrings";

const fullSchema = `
  id
  mainProgramId
  clientId
  targets {
    id
    title
    description
    required
    inputType
    valueType
    currentMasterCount
    mastered
  }
  description
  materials
  writeAccess
  readAccess
  type
  title
  trials
  lastEditedBy
  editedBy
  createdBy
  targetStyle
  updated_at
  created_at
  category
  targetOptions {
      id
      name
      target
    }
  chainingDirection
  currentChainTarget
  masterTargetPercent
  masterTargetCount
  subscribers
`;

export const programOperationStrings = generateCrudOperationStrings(
  StoreCollections.Program,
  fullSchema
);

export const getAllPrograms = createRequest<undefined, Program[]>(
  programOperationStrings.getAll
);

export const getProgram = createRequest<GetProgramPayload, Program>(
  programOperationStrings.get
);

export const getAllProgramsByRelationship = createRequest<
  GetAllProgramsByRelationshipPayload,
  Program[]
>(programOperationStrings.getAllByRelationship);

export const createProgram = createRequest<CreateProgramPayload, Program>(
  programOperationStrings.create
);

export const deleteProgram = createRequest<DeleteProgramPayload, string>(
  programOperationStrings.deleteItem
);

export const updateProgram = createRequest<UpdateProgramPayload, Program>(
  programOperationStrings.edit
);

export const programRequests = {
  getAll: getAllPrograms,
  get: getProgram,
  getAllByRelationship: getAllProgramsByRelationship,
  create: createProgram,
  delete: deleteProgram,
  update: updateProgram
};
