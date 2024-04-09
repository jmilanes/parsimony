import { Body, Controller, Get, Post, UseGuards } from "@nestjs/common";
import { CreateUserPayload, User, UserRoles } from "@parsimony/types";
import { BaseCrudService } from "../../services/baseCrud.service";
import { modelTypes } from "../../../app/models";
import {
  AllowedRoles,
  AuthContext,
  AuthGuard,
  RolesGuard
} from "../../decorators";

@Controller("users")
export class UsersController {
  #bcs: BaseCrudService;

  constructor(bcs: BaseCrudService) {
    this.#bcs = bcs;
  }

  @Get("/")
  @UseGuards(AuthGuard)
  async getAll(@AuthContext() authCtx: AuthContext): Promise<User[]> {
    return await this.#bcs.getAll(modelTypes.user, authCtx);
  }

  @Post("/")
  @AllowedRoles([UserRoles.Admin, UserRoles.Director])
  @UseGuards(AuthGuard, RolesGuard)
  async create(
    @Body() payload: CreateUserPayload,
    @AuthContext() authCtx: AuthContext
  ): Promise<void> {
    return await this.#bcs.create(modelTypes.user, payload, authCtx);
  }
}
