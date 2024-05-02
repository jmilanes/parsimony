import { Service } from "typedi";
import { RequestCreatorService } from "../requestCreator.service";
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
  #rcs: RequestCreatorService;

  constructor(s: Store, rcs: RequestCreatorService) {
    this.#store = s;
    this.#rcs = rcs;
  }

  async getAllByRelationship<T>(payload: ByRelationshipPayload) {
    const request = this.#rcs.createPostRequest<ByRelationshipPayload, T>(
      "operations/byRelationship"
    );

    try {
      const items = await request(payload);
      if (items) {
        //@ts-ignore
        this.#store.addItemsByDomain(payload.model, arrayToObj(items));
      }
    } catch (e) {
      console.error(e);
    }
  }

  async addProgramsToClient(payload: AddProgramsToClientPayload) {
    const request = this.#rcs.createPostRequest<
      AddProgramsToClientPayload,
      Result
    >("operations/addProgramsToClient");
    await request(payload);
  }
}
