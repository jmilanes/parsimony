import { Body, Controller, Get, Post } from "@nestjs/common";
import { CreateUserPayload, User } from "@parsimony/types";
import { BaseCrudService } from "../../services/baseCrud.service";
import { modelTypes } from "../../../app/models";

@Controller("users")
export class UsersController {
  #bcs: BaseCrudService;

  constructor(bcs: BaseCrudService) {
    this.#bcs = bcs;
  }

  @Get("/")
  async getAll(): Promise<User[]> {
    return await this.#bcs.getAll(modelTypes.user, {
      //@ts-ignore
      currentUser: { schoolId: "mockSchoolId" }
    });
  }

  @Post("/")
  async create(@Body() payload: CreateUserPayload): Promise<void> {
    return await this.#bcs.create(
      modelTypes.user,
      { payload },
      //@ts-ignore
      { currentUser: { schoolId: "mockSchoolId" } }
    );
  }
}

// Get the auth context and authorization and test
