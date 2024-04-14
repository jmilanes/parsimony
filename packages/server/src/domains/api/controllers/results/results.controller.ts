import { Body, Controller, Delete, Get, Param, Post } from "@nestjs/common";
import {
  CreateResultPayload,
  GetAllResultsByRelationshipPayload,
  Result,
  UpdateResultPayload,
  UserRoles
} from "@parsimony/types";
import { BaseCrudService } from "../../services/baseCrud.service";
import { modelTypes } from "../../../app/models";
import { AuthContext, ProtectRoute } from "../../decorators";
import { ALLOWED_MUTATION_ROLES } from "../../const/api.const";

@Controller("results")
export class ResultsController {
  #bcs: BaseCrudService;
  #model: modelTypes = modelTypes.result;

  constructor(bcs: BaseCrudService) {
    this.#bcs = bcs;
  }

  @Get("/")
  @ProtectRoute()
  async getAll(@AuthContext() authCtx: AuthContext): Promise<Result[]> {
    return await this.#bcs.getAll(this.#model, authCtx);
  }

  @Post("/")
  @ProtectRoute([...ALLOWED_MUTATION_ROLES, UserRoles.Employee])
  async create(
    @Body() payload: CreateResultPayload,
    @AuthContext() authCtx: AuthContext
  ): Promise<Result> {
    return await this.#bcs.create(this.#model, payload, authCtx);
  }

  @Post("/:id")
  @ProtectRoute(ALLOWED_MUTATION_ROLES)
  async update(
    @Body() payload: UpdateResultPayload,
    @AuthContext() authCtx: AuthContext
  ): Promise<Result> {
    return await this.#bcs.update(this.#model, payload, authCtx);
  }

  @Get("/:id")
  @ProtectRoute()
  async get(
    @Param("id") id: string,
    @AuthContext() authCtx: AuthContext
  ): Promise<Result> {
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

  @Get("/byRelationship")
  @ProtectRoute(ALLOWED_MUTATION_ROLES)
  async byRelationShip(
    @Body() payload: GetAllResultsByRelationshipPayload,
    @AuthContext() authCtx: AuthContext
  ): Promise<Result[]> {
    return await this.#bcs.getAllByRelationship(this.#model, payload, authCtx);
  }
}
