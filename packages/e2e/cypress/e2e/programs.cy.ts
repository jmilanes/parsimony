import {
  DirectoryPageMetaTestIds,
  ProgramPageMetaTestIds,
  ProgramsPageMetaTestIds
} from "@parsimony/types";

import { findText, getTableAction, login } from "../../utilities";
import { DB_ACTIONS } from "../../utilities/db.utils";
import { program1 } from "../fixtures/programs";

beforeEach(() => {
  login();
});

afterEach(() => {
  DB_ACTIONS.cleanDb();
});

describe("Directory Page Tests", () => {
  it("should add user to directory", () => {
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
