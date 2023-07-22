import {
  Domains,
  CreateResultPayload,
  DeleteResultPayload,
  UpdateResultPayload,
  GetProgramPayload,
  Result,
  GetAllProgramsByRelationshipPayload
} from "@parsimony/types";
import { createRequest } from "../../utils";
import generateCrudOperationStrings from "./operationStrings/generateCrudOperationStrings";

const fullSchema = `
  id
  programId
  clientId
  programCompleteness
  type
  data {
    targetId
    targetCompleteness
    targetResults {
      trial
      targetOptionId
      completed
      option {
          name
      }
    }
  }
  behavior {
    type
    tally
    duration
    intervalPassed
  }
  updated_at
  created_at
`;

const resultOperationStrings = generateCrudOperationStrings(
  Domains.Result,
  fullSchema
);

export const getAllResults = createRequest<undefined, Result[]>(
  resultOperationStrings.getAll
);

export const getAllResultsByRelationship = createRequest<
  GetAllProgramsByRelationshipPayload,
  Result[]
>(resultOperationStrings.getAllByRelationship);

export const getResult = createRequest<GetProgramPayload, Result>(
  resultOperationStrings.get
);

export const createResult = createRequest<CreateResultPayload, Result>(
  resultOperationStrings.create
);

export const deleteResult = createRequest<DeleteResultPayload, string>(
  resultOperationStrings.deleteItem
);

export const updateResult = createRequest<UpdateResultPayload, Result>(
  resultOperationStrings.edit
);

export const resultRequests = {
  getAll: getAllResults,
  get: getResult,
  getAllByRelationship: getAllResultsByRelationship,
  create: createResult,
  delete: deleteResult,
  update: updateResult
};
