import { ProgramsPageMetaTestIds } from "@parsimony/types";

import { findText, getTableAction, login } from "../../utilities";
import { DB_ACTIONS } from "../../utilities/db.utils";
import { program1 } from "../fixtures";

beforeEach(() => {
  login();
});

afterEach(() => {
  DB_ACTIONS.cleanDb();
});

describe("Programs Page Tests", () => {
  it("should add program to programs", () => {
    DB_ACTIONS.createProgram(program1).then((id) => {
      getTableAction(ProgramsPageMetaTestIds.tableActionDelete, id).should(
        "exist"
      );
      getTableAction(ProgramsPageMetaTestIds.tableActionView, id).should(
        "exist"
      );
      findText("Brushing teeth").should("exist");
      findText("MAIN").should("exist");
    });
  });
});
