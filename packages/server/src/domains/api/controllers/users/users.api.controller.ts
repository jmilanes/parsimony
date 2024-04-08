import { Body, Controller, Get, Post, UseGuards } from "@nestjs/common";
import { CreateUserPayload, User } from "@parsimony/types";
import { BaseCrudService } from "../../services/baseCrud.service";
import { modelTypes } from "../../../app/models";
import { AuthGuard } from "../../decorators";
import { AuthContext } from "../../decorators";

@Controller("users")
export class UsersController {
  #bcs: BaseCrudService;

  constructor(bcs: BaseCrudService) {
    this.#bcs = bcs;
  }

  @Get("/")
  async getAll(@AuthContext() authCtx: AuthContext): Promise<User[]> {
    return await this.#bcs.getAll(modelTypes.user, authCtx);
  }

  @Post("/")
  @UseGuards(AuthGuard)
  async create(
    @Body() payload: CreateUserPayload,
    @AuthContext() authCtx: AuthContext
  ): Promise<void> {
    return await this.#bcs.create(modelTypes.user, payload, authCtx);
  }
}

// Get the auth context and authorization and test
