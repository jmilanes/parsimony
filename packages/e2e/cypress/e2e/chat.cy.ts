import { ChatMetaTestIds, NavMetaTestIds, User } from "@parsimony/types";

import {
  getButton,
  getField,
  login,
  selectOption,
  getSelect,
  readOnlyLocator,
  logOut,
  loginUser
} from "../../utilities";
import { DB_ACTIONS } from "../../utilities/db.utils";
import { chatUser1, chatUser2, chatUser3, ROUTES, user1 } from "../fixtures";

const createUsers = (users: Partial<User>[]) =>
  users.forEach((user) => DB_ACTIONS.createUserRequest(user));

beforeEach(() => {
  login();
});

afterEach(() => {
  DB_ACTIONS.cleanEntities();
});

describe("Chat Tests", () => {
  it("chat navigation toggle should work", () => {
    getButton(NavMetaTestIds.chatBtn).click();
    getButton(ChatMetaTestIds.createChatBtn).should("exist");
    cy.get(`[aria-label="Close"]`).click();
    getButton(ChatMetaTestIds.createChatBtn).should("not.be.visible");
  });

  it("should create chat", () => {
    createUsers([chatUser1, chatUser2, chatUser3]);
    logOut();
    loginUser(chatUser1.email, chatUser1.password);
    getButton(NavMetaTestIds.chatBtn).click();
    getButton(ChatMetaTestIds.createChatBtn).should("exist");
    cy.get(`[aria-label="Close"]`).click();
  });
});
