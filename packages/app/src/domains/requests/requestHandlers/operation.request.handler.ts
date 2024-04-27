import { Service } from "typedi";
import { createRestRequest } from "../request.utils";
import {
  AddProgramsToClientPayload,
  ByRelationshipPayload,
  Result
} from "@parsimony/types";
import { arrayToObj } from "../../../utils";
import Store from "../../state/store/store";

@Service()
export class OperationRequestHandler {
  #store: Store;

  constructor(s: Store) {
    this.#store = s;
  }

  async getAllByRelationship<T>(payload: ByRelationshipPayload) {
    const request = createRestRequest<ByRelationshipPayload, T>(
      "POST",
      "operations/byRelationship"
    );

    try {
      const items = await await request(payload);
      //@ts-ignore TODO: Handle in NEST
      const withId = items.map((x) => ({ ...x, id: x._id }));
      if (items) {
        //@ts-ignore
        this.#store.addItemsByDomain(payload.model, arrayToObj(withId));
      }
    } catch (e) {
      console.error(e);
    }
  }

  async addProgramsToClient(payload: AddProgramsToClientPayload) {
    const request = createRestRequest<AddProgramsToClientPayload, Result>(
      "POST",
      "operations/addProgramsToClient"
    );
    await request(payload);
  }
}
