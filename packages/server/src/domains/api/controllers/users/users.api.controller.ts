import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards
} from "@nestjs/common";
import {
  CreateUserPayload,
  DeleteUserPayload,
  GetAllUsersByRelationshipPayload,
  GetUserPayload,
  User,
  UserRoles
} from "@parsimony/types";
import { BaseCrudService } from "../../services/baseCrud.service";
import { modelTypes } from "../../../app/models";
import {
  AllowedRoles,
  AuthContext,
  AuthGuardDecorator,
  ProtectRoute,
  RolesGuard
} from "../../decorators";

@Controller("users")
export class UsersController {
  #bcs: BaseCrudService;

  constructor(bcs: BaseCrudService) {
    this.#bcs = bcs;
  }

  @Get("/")
  @ProtectRoute()
  async getAll(@AuthContext() authCtx: AuthContext): Promise<User[]> {
    return await this.#bcs.getAll(modelTypes.user, authCtx);
  }

  @Post("/")
  @ProtectRoute(UserRoles.Admin, UserRoles.Director)
  async create(
    @Body() payload: CreateUserPayload,
    @AuthContext() authCtx: AuthContext
  ): Promise<void> {
    return await this.#bcs.create(modelTypes.user, payload, authCtx);
  }

  @Get("/:id")
  @ProtectRoute()
  async get(
    @Param("id") id: string,
    @AuthContext() authCtx: AuthContext
  ): Promise<void> {
    return await this.#bcs.get(modelTypes.user, { id }, authCtx);
  }

  @Delete("/:id")
  @ProtectRoute(UserRoles.Admin, UserRoles.Director)
  async delete(
    @Param("id") id: string,
    @AuthContext() authCtx: AuthContext
  ): Promise<void> {
    return await this.#bcs.delete(modelTypes.user, { id }, authCtx);
  }

  @Post("/byRelationShip")
  @ProtectRoute(UserRoles.Admin, UserRoles.Director)
  async byRelationShip(
    @Body() payload: GetAllUsersByRelationshipPayload,
    @AuthContext() authCtx: AuthContext
  ): Promise<void> {
    return await this.#bcs.getAllByRelationship(
      modelTypes.user,
      payload,
      authCtx
    );
  }
}
