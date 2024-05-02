import {
  Domains,
  CreateUserPayload,
  UpdateUserPayload,
  User
} from "@parsimony/types";
import { CrudRequestHandler } from "../CrudRequestHandler";

import { Service } from "typedi";
import { RequestCreatorService } from "../requestCreator.service";
import Store from "../../state/store/store";

@Service()
export class UserRequestHandler extends CrudRequestHandler<
  User,
  CreateUserPayload,
  UpdateUserPayload
> {
  domainName = Domains.User;
  #rcs: RequestCreatorService;

  constructor(s: Store, rcs: RequestCreatorService) {
    super(s);
    this.#rcs = rcs;
    this.requests = {
      get: this.#rcs.createGetRequest<User>("users"),
      getAll: this.#rcs.createGetAllRequest<User[]>("users"),
      delete: this.#rcs.createDeleteRequest<{ id: string }>("users"),
      create: this.#rcs.createPostRequest<CreateUserPayload, User>("users"),
      update: this.#rcs.createPatchRequest<UpdateUserPayload, User>("users")
    };
  }
}
