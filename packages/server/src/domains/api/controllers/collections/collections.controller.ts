import { Body, Controller, Delete, Get, Param, Post } from "@nestjs/common";
import {
  Collection,
  CreateCollectionPayload,
  GetAllCollectionsByRelationshipPayload,
  UpdateCollectionPayload
} from "@parsimony/types";
import { BaseCrudService } from "../../services/baseCrud.service";
import { modelTypes } from "../../../app/models";
import { AuthContext, ProtectRoute } from "../../decorators";
import { ALLOWED_MUTATION_ROLES } from "../../const/api.const";

@Controller("collections")
export class CollectionsController {
  #bcs: BaseCrudService;
  #model: modelTypes = modelTypes.collection;

  constructor(bcs: BaseCrudService) {
    this.#bcs = bcs;
  }

  @Get("/")
  @ProtectRoute()
  async getAll(@AuthContext() authCtx: AuthContext): Promise<Collection[]> {
    return await this.#bcs.getAll(this.#model, authCtx);
  }

  @Post("/")
  @ProtectRoute(ALLOWED_MUTATION_ROLES)
  async create(
    @Body() payload: CreateCollectionPayload,
    @AuthContext() authCtx: AuthContext
  ): Promise<Collection> {
    return await this.#bcs.create(this.#model, payload, authCtx);
  }

  @Post("/:id")
  @ProtectRoute(ALLOWED_MUTATION_ROLES)
  async update(
    @Body() payload: UpdateCollectionPayload,
    @AuthContext() authCtx: AuthContext
  ): Promise<Collection> {
    return await this.#bcs.update(this.#model, payload, authCtx);
  }

  @Get("/:id")
  @ProtectRoute()
  async get(
    @Param("id") id: string,
    @AuthContext() authCtx: AuthContext
  ): Promise<Collection> {
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
}
