import { ProgramsPageMetaTestIds } from "@parsimony/types";

import { getTableRowAction, getTableRowItem, login } from "../../utilities";
import { DB_ACTIONS } from "../../utilities/db.utils";
import { program1, program2 } from "../fixtures";

beforeEach(() => {
  login();
});

afterEach(() => {
  DB_ACTIONS.cleanDb();
});

describe("Programs Page Tests", () => {
  it("should add program to programs", () => {
    DB_ACTIONS.createProgram(program1).then((id) => {
      getTableRowAction(ProgramsPageMetaTestIds.table, id, "view").should(
        "exist"
      );
      getTableRowAction(ProgramsPageMetaTestIds.table, id, "delete").should(
        "exist"
      );
      getTableRowItem(ProgramsPageMetaTestIds.table, id, "title").should(
        "have.text",
        "Brushing Teeth"
      );
      getTableRowItem(ProgramsPageMetaTestIds.table, id, "type").should(
        "have.text",
        "MAIN"
      );
      getTableRowItem(ProgramsPageMetaTestIds.table, id, "description").should(
        "have.text",
        "Client needs to brush their teeth"
      );
      getTableRowItem(ProgramsPageMetaTestIds.table, id, "rules").should(
        "have.text",
        "1"
      );
    });
  });
  it("should add multiple program to programs", () => {
    DB_ACTIONS.createProgram(program1).then((id) => {
      getTableRowAction(ProgramsPageMetaTestIds.table, id, "view").should(
        "exist"
      );
      getTableRowAction(ProgramsPageMetaTestIds.table, id, "delete").should(
        "exist"
      );
      getTableRowItem(ProgramsPageMetaTestIds.table, id, "title").should(
        "have.text",
        "Brushing Teeth"
      );
      getTableRowItem(ProgramsPageMetaTestIds.table, id, "type").should(
        "have.text",
        "MAIN"
      );
      getTableRowItem(ProgramsPageMetaTestIds.table, id, "description").should(
        "have.text",
        "Client needs to brush their teeth"
      );
      getTableRowItem(ProgramsPageMetaTestIds.table, id, "rules").should(
        "have.text",
        "1"
      );
    });

    DB_ACTIONS.createProgram(program2).then((id) => {
      getTableRowAction(ProgramsPageMetaTestIds.table, id, "view").should(
        "exist"
      );
      getTableRowAction(ProgramsPageMetaTestIds.table, id, "delete").should(
        "exist"
      );
      getTableRowItem(ProgramsPageMetaTestIds.table, id, "title").should(
        "have.text",
        "Eat Breakfast"
      );
      getTableRowItem(ProgramsPageMetaTestIds.table, id, "type").should(
        "have.text",
        "MAIN"
      );
      getTableRowItem(ProgramsPageMetaTestIds.table, id, "description").should(
        "have.text",
        "Client needs to eat breakfast"
      );
      getTableRowItem(ProgramsPageMetaTestIds.table, id, "rules").should(
        "have.text",
        "3"
      );
    });
  });
});
