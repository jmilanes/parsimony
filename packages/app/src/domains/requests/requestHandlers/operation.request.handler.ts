import { Service } from "typedi";
import { createRestRequest } from "../request.utils";
import {
  AddProgramsToClientPayload,
  ByRelationshipPayload,
  Result
} from "@parsimony/types";

@Service()
export class OperationRequestHandler {
  async getAllByRelationship<T>(payload: ByRelationshipPayload) {
    const request = createRestRequest<ByRelationshipPayload, T>(
      "POST",
      "operations/byRelationship"
    );

    return await request(payload);
  }

  async addProgramsToClient(payload: AddProgramsToClientPayload) {
    const request = createRestRequest<AddProgramsToClientPayload, Result>(
      "POST",
      "operations/addProgramsToClient"
    );
    await request(payload);
  }
}
