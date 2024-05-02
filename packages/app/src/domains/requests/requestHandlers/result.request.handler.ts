import {
  Domains,
  CreateResultPayload,
  Result,
  UpdateResultPayload
} from "@parsimony/types";
import { CrudRequestHandler } from "../CrudRequestHandler";
import { Service } from "typedi";
import { RequestCreatorService } from "../requestCreator.service";
import Store from "../../state/store/store";

@Service()
export class ResultRequestHandler extends CrudRequestHandler<
  Result,
  CreateResultPayload,
  UpdateResultPayload
> {
  domainName = Domains.Result;
  #rcs: RequestCreatorService;

  constructor(s: Store, rcs: RequestCreatorService) {
    super(s);
    this.#rcs = rcs;
    this.requests = {
      get: this.#rcs.createGetRequest<Result>("results"),
      getAll: this.#rcs.createGetAllRequest<Result[]>("results"),
      delete: this.#rcs.createDeleteRequest<{ id: string }>("results"),
      create: this.#rcs.createPostRequest<CreateResultPayload, Result>(
        "results"
      ),
      update: this.#rcs.createPatchRequest<UpdateResultPayload, Result>(
        "results"
      )
    };
  }
}
