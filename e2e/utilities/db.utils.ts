require("dotenv").config();
import {
  createUser,
  createProgram,
  createRequestOptions,
  userOperationStrings,
  programOperationStrings
} from "@parsimony/bal";
import { TestEntryTypes, Program, User } from "@parsimony/types";
import { API_URL } from "../cypress/fixtures";

const deleteEntityRequest =
  (mutation: string) => (id: string, accessToken: string) => {
    const options = createRequestOptions(mutation, {
      id
    });

    cy.request({
      url: API_URL,
      ...options,
      headers: {
        ...options.headers,
        Authorization: `Bearer ${accessToken}`
      }
    });
  };

const deleteEntity = {
  [TestEntryTypes.DIRECTORY]: deleteEntityRequest(
    userOperationStrings.deleteItem
  ),
  [TestEntryTypes.PROGRAM]: deleteEntityRequest(
    programOperationStrings.deleteItem
  )
};

type ITestEntry = {
  id: string;
  type: TestEntryTypes;
};

class DBManager {
  entities: ITestEntry[];
  accessToken: string;
  constructor() {
    this.entities = [];
    this.accessToken = null;
  }

  public addEntity(id: string, type: TestEntryTypes) {
    this.entities.push({ id, type });
  }

  public setAccessToken(accessToken: string) {
    this.accessToken = accessToken;
  }

  public async cleanEntities() {
    this.entities.map(({ type, id }: ITestEntry) =>
      deleteEntity[type](id, this.accessToken)
    );
    this.entities = [];
    this.accessToken = null;
  }

  public createUserRequest(user: Partial<User>) {
    const requestKey = `apiRequest-for-${user.email}`;
    cy.intercept(API_URL).as(requestKey);
    return cy.window().then((win) => {
      //@ts-ignore
      createUser({ ...user, password: win.testEncrypt(user.password) });
      return cy.wait(`@${requestKey}`).then((interception) => {
        let id = interception.response.body.data.createUser.id;

        this.addEntity(id, TestEntryTypes.DIRECTORY);
        return id;
      });
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
