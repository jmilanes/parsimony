import {
  createUser,
  deleteUser,
  createProgram,
  deleteProgram
} from "@parsimony/bal";
import { TestEntryTypes, Program, User } from "@parsimony/types";
import { API_URL } from "../cypress/fixtures";

const deleteEntity = {
  [TestEntryTypes.DIRECTORY]: (id: string) => deleteUser({ id }),
  [TestEntryTypes.PROGRAM]: (id: string) => deleteProgram({ id })
};

type ITestEntry = {
  id: string;
  type: TestEntryTypes;
};

class DBManager {
  entities: ITestEntry[];
  constructor() {
    this.entities = [];
  }

  public addEntity(id: string, type: TestEntryTypes) {
    this.entities.push({ id, type });
  }

  public async cleanEntities() {
    await Promise.all(
      this.entities.map(({ type, id }: ITestEntry) => deleteEntity[type](id))
    );
    this.entities = [];
  }

  public createUserRequest(user: Partial<User>) {
    cy.intercept(API_URL).as("apiRequest");
    createUser(user);
    return cy.wait("@apiRequest").then((interception) => {
      let id = interception.response.body.data.createUser.id;
      this.addEntity(id, TestEntryTypes.DIRECTORY);
      return id;
    });
  }

  public createProgramRequest(program: Partial<Program>) {
    cy.intercept(API_URL).as("apiRequest");
    createProgram(program);
    return cy.wait("@apiRequest").then((interception) => {
      let id = interception.response.body.data.createProgram.id;
      this.addEntity(id, TestEntryTypes.PROGRAM);
      return id;
    });
  }
}

export const DB_ACTIONS = new DBManager();
