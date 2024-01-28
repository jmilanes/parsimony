import React from "react";
import { render, waitFor } from "@testing-library/react";

import {
  BookPageMetaTestIds,
  CollectionMetaTestIds,
  NavMetaTestIds,
  ProgramsPageMetaTestIds
} from "@parsimony/types";
import { makeTestApp } from "../../../testUtils/makeTestApp";
import { checkVisibility, clickTarget } from "../../../testUtils/actions.spec";
import { Container } from "typedi";
import { MockDBService } from "../../../testUtils/mockDBService";
import { initialCollectionPageData } from "../fixtures/collection.page.fixtures";
import { getTableAction } from "../../../testUtils/selectors";

describe("Parsimony Navigation Tests", () => {
  const mockDbService = Container.get(MockDBService);
  beforeEach(async () => {
    await mockDbService.cleanUp();
    await mockDbService.setUpData(initialCollectionPageData);
  });

  afterEach(async () => {
    await mockDbService.cleanUp();
  });
  test("Should Navigate to the Collections Page", async () => {
    const { app } = await makeTestApp();
    render(app);
    await waitFor(async () => {
      await clickTarget(NavMetaTestIds.booksBtn);
      await checkVisibility(BookPageMetaTestIds.addBtn);
      await clickTarget(
        getTableAction({
          tableName: CollectionMetaTestIds.table,
          rowIndex: 0,
          action: "open"
        })
      );

      await waitFor(async () => {
        await checkVisibility(ProgramsPageMetaTestIds.addBtn);
      });
    });
  });
});
