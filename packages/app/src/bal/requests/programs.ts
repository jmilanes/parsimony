import {
  Collections,
  Program,
  CreateProgramPayload,
  DeleteProgramPayload,
  UpdateProgramPayload,
  GetProgramPayload
} from "@parsimony/types";
import { createRequest } from "../../utils";
import generateCrudOperationStrings from "./operationStrings/generateCrudOperationStrings";

const fullSchema = `
  id
  mainProgramId
  clientId
  rules {
    id
    question
    description
    steps
    options {
      id
      name
      value
    }
    required
    inputType
    valueType
  }
  description
  writeAccess
  readAccess
  type
  lastEditedBy
  editedBy
  createdBy
  ruleStyle
  updated_at
  created_at
`;

const programOperationStrings = generateCrudOperationStrings(
  Collections.Program,
  fullSchema
);

export const getAllPrograms = createRequest<undefined, Program[]>(
  programOperationStrings.getAll
);

export const getProgram = createRequest<GetProgramPayload, Program>(
  programOperationStrings.get
);

export const createProgram = createRequest<CreateProgramPayload, Program>(
  programOperationStrings.create
);

export const deleteProgram = createRequest<DeleteProgramPayload, string>(
  programOperationStrings.deleteItem
);

export const updateProgram = createRequest<UpdateProgramPayload, Program>(
  programOperationStrings.edit
);

const programRequests = {
  getAll: getAllPrograms,
  get: getProgram,
  create: createProgram,
  delete: deleteProgram,
  update: updateProgram
};

export default programRequests;
