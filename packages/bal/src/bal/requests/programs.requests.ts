import {
  Domains,
  CreateProgramPayload,
  DeleteProgramPayload,
  GetAllProgramsByRelationshipPayload,
  GetProgramPayload,
  Program,
  UpdateProgramPayload,
  AddProgramsToClientPayload
} from "@parsimony/types";
import { createRequest } from "../../utils";
import generateCrudOperationStrings from "./operationStrings/generateCrudOperationStrings";

const fullSchema = `
  id
  active
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
  mastered
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
  masteryTarget
  masteryConsecutiveTargets
  subscribers
  collectionId
  behavior {
    type
    alertTime
    active
    operationalDefinition
    precursorBehaviors
    proactiveStrategies
    reactiveStrategies
  }
  chaining {
    type 
    targetCompleteness 
  }
`;

const addProgramsToClientString = `mutation AddProgramsToClient($payload: AddProgramsToClientPayload) {
  addProgramsToClient(payload: $payload) {
    ${fullSchema}
  }
}`;

export const programOperationStrings = generateCrudOperationStrings(
  Domains.Program,
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

export const addProgramsToClient = createRequest<
  AddProgramsToClientPayload,
  Program[]
>(addProgramsToClientString);

export const programRequests = {
  getAll: getAllPrograms,
  get: getProgram,
  getAllByRelationship: getAllProgramsByRelationship,
  create: createProgram,
  delete: deleteProgram,
  update: updateProgram,
  addProgramsToClient: addProgramsToClient
};
