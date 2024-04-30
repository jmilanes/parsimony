import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseInterceptors
} from "@nestjs/common";
import { BaseCrudService } from "../../../services/api/baseCrud.service";
import { modelTypes } from "../../../services/database/models";
import { AuthContext, ProtectRoute } from "../../decorators";
import {
  AddProgramsToClientPayload,
  CreateProgramPayload,
  GetAllProgramsByRelationshipPayload,
  Program,
  UpdateProgramPayload,
  User
} from "@parsimony/types";
import { ALLOWED_MUTATION_ROLES } from "../../../const/api.const";
import { ProgramApiService } from "../../../services/api/prgrams/program.api.service";
import { TransformIdInterceptor } from "../../interceptors/response.interceptor";

@UseInterceptors(new TransformIdInterceptor())
@Controller("programs")
export class ProgramsControllers {
  #bcs: BaseCrudService;
  #pas: ProgramApiService;
  #model: modelTypes = modelTypes.program;

  constructor(bcs: BaseCrudService, pas: ProgramApiService) {
    this.#bcs = bcs;
    this.#pas = pas;
  }

  @Get("/")
  @ProtectRoute()
  async getAll(@AuthContext() authCtx: AuthContext): Promise<Program[]> {
    return await this.#bcs.getAll(this.#model, authCtx);
  }

  @Post("/")
  @ProtectRoute(ALLOWED_MUTATION_ROLES)
  async create(
    @Body() payload: CreateProgramPayload,
    @AuthContext() authCtx: AuthContext
  ): Promise<Program> {
    return await this.#bcs.create(this.#model, payload, authCtx);
  }

  @Post("/:id")
  @ProtectRoute(ALLOWED_MUTATION_ROLES)
  async update(
    @Body() payload: UpdateProgramPayload,
    @AuthContext() authCtx: AuthContext
  ): Promise<Program> {
    return await this.#bcs.update(this.#model, payload, authCtx);
  }

  @Get("/:id")
  @ProtectRoute()
  async get(
    @Param("id") id: string,
    @AuthContext() authCtx: AuthContext
  ): Promise<Program> {
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
