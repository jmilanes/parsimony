import { Body, Controller, Delete, Get, Param, Post } from "@nestjs/common";
import {
  AddProgramsToClientPayload,
  Collection,
  CreateCollectionPayload,
  GetAllCollectionsByRelationshipPayload,
  UpdateCollectionPayload
} from "@parsimony/types";
import { BaseCrudService } from "../../services/baseCrud.service";
import { modelTypes } from "../../../app/models";
import { AuthContext, ProtectRoute } from "../../decorators";
import { ALLOWED_MUTATION_ROLES } from "../../const/api.const";
import { ProgramApiService } from "../../services/api/prgrams/program.api.service";

@Controller("operations")
export class OperationsController {
  #bcs: BaseCrudService;
  #pas: ProgramApiService;

  constructor(bcs: BaseCrudService, pas: ProgramApiService) {
    this.#bcs = bcs;
    this.#pas = pas;
  }

  @Post("/byRelationship")
  @ProtectRoute(ALLOWED_MUTATION_ROLES)
  async byRelationShip(
    @Body() payload: GetAllCollectionsByRelationshipPayload,
    @AuthContext() authCtx: AuthContext
  ): Promise<Collection[]> {
    return await this.#bcs.getAllByRelationship(
      payload.model as modelTypes,
      payload,
      authCtx
    );
  }

  @Post("/addProgramsToClient")
  @ProtectRoute(ALLOWED_MUTATION_ROLES)
  async addProgramsToClient(
    @Body() payload: AddProgramsToClientPayload,
    @AuthContext() authCtx: AuthContext
  ): Promise<void> {
    await this.#pas.addProgramsToClient(payload, authCtx);
  }
}
