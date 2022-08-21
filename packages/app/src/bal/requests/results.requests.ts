import {
  Collections,
  CreateResultPayload,
  DeleteResultPayload,
  UpdateResultPayload,
  GetProgramPayload,
  Result
} from "@parsimony/types";
import { createRequest } from "../../utils";
import generateCrudOperationStrings from "./operationStrings/generateCrudOperationStrings";

const fullSchema = `
  id
  programId
  clientId
  programCompleteness
  data {
    ruleId
    ruleCompleteness
    ruleResults {
      step
      targetId
      completed
      option {
          name
      }
    }
  }
  updated_at
  created_at
`;

const resultOperationStrings = generateCrudOperationStrings(
  Collections.Result,
  fullSchema
);

export const getAllResults = createRequest<undefined, Result[]>(
  resultOperationStrings.getAll
);

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
  create: createResult,
  delete: deleteResult,
  update: updateResult
};
