import {
  Domains,
  CreateProgramPayload,
  Program,
  UpdateProgramPayload
} from "@parsimony/types";
import { CrudRequestHandler } from "../CrudRequestHandler";

import { Service } from "typedi";
import { RequestCreatorService } from "../requestCreator.service";
import Store from "../../state/store/store";

@Service()
export class ProgramRequestHandler extends CrudRequestHandler<
  Program,
  CreateProgramPayload,
  UpdateProgramPayload
> {
  domainName = Domains.Program;
  #rcs: RequestCreatorService;

  constructor(s: Store, rcs: RequestCreatorService) {
    super(s);
    this.#rcs = rcs;
    this.requests = {
      get: this.#rcs.createGetRequest<Program>("programs"),
      getAll: this.#rcs.createGetAllRequest<Program[]>("programs"),
      delete: this.#rcs.createDeleteRequest<{ id: string }>("programs"),
      create: this.#rcs.createPostRequest<CreateProgramPayload, Program>(
        "programs"
      ),
      update: this.#rcs.createPatchRequest<UpdateProgramPayload, Program>(
        "programs"
      )
    };
  }
}
