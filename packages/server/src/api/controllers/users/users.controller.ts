import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseInterceptors
} from "@nestjs/common";
import {
  CreateUserPayload,
  GetAllUsersByRelationshipPayload,
  UpdateUserPayload,
  User
} from "@parsimony/types";
import { BaseCrudService } from "../../../services/api/baseCrud.service";
import { modelTypes } from "../../../services/database/models";
import { AuthContext, ProtectRoute } from "../../decorators";
import { ALLOWED_MUTATION_ROLES } from "../../../const/api.const";
import { TransformIdInterceptor } from "../../interceptors/response.interceptor";

@UseInterceptors(new TransformIdInterceptor())
@Controller("users")
export class UsersController {
  #bcs: BaseCrudService;
  #model: modelTypes = modelTypes.user;

  constructor(bcs: BaseCrudService) {
    this.#bcs = bcs;
  }

  @Get("/")
  @ProtectRoute()
  async getAll(@AuthContext() authCtx: AuthContext): Promise<User[]> {
    return await this.#bcs.getAll(this.#model, authCtx);
  }

  @Post("/")
  @ProtectRoute(ALLOWED_MUTATION_ROLES)
  async create(
    @Body() payload: CreateUserPayload,
    @AuthContext() authCtx: AuthContext
  ): Promise<User> {
    return await this.#bcs.create(this.#model, payload, authCtx);
  }

  @Post("/:id")
  @ProtectRoute(ALLOWED_MUTATION_ROLES)
  async update(
    @Body() payload: UpdateUserPayload,
    @AuthContext() authCtx: AuthContext
  ): Promise<User> {
    return await this.#bcs.update(this.#model, payload, authCtx);
  }

  @Get("/:id")
  @ProtectRoute()
  async get(
    @Param("id") id: string,
    @AuthContext() authCtx: AuthContext
  ): Promise<User> {
    return await this.#bcs.get(this.#model, { id }, authCtx);
  }

  @Delete("/:id")
  @ProtectRoute(ALLOWED_MUTATION_ROLES)
  async delete(
    @Param("id") id: string,
    @AuthContext() authCtx: AuthContext
  ): Promise<{ id: string }> {
    return await this.#bcs.delete(this.#model, { id }, authCtx);
  }

  @Post("byRelationShip")
  @ProtectRoute(ALLOWED_MUTATION_ROLES)
  async byRelationShip(
    @Body() payload: GetAllUsersByRelationshipPayload,
    @AuthContext() authCtx: AuthContext
  ): Promise<User[]> {
    return await this.#bcs.getAllByRelationship(this.#model, payload, authCtx);
  }
}
