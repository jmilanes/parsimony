import React from "react";
import { render, waitFor } from "@testing-library/react";

import {
  BehaviorType,
  CollectionMetaTestIds,
  Domains,
  ProgramsPageMetaTestIds
} from "@parsimony/types";
import { makeTestApp } from "../../../testUtils/makeTestApp";
import {
  checkSelectorTextContent,
  checkVisibility
} from "../../../testUtils/actions.spec";
import { Container } from "typedi";
import {
  createTargetUuidKey,
  MockDBService
} from "../../../testUtils/mockDBService";
import { initialCollectionPageData } from "../fixtures/collection.page.fixtures";
import { getTableData } from "../../../testUtils/selectors";

describe("Parsimony Navigation Tests", () => {
  const mockDbService = Container.get(MockDBService);
  beforeEach(async () => {
    await mockDbService.cleanUp();
    await mockDbService.setUpData(initialCollectionPageData);
  });

  afterEach(async () => {
    await mockDbService.cleanUp();
  });

  test("Should render Collections Page with initial data", async () => {
    const id = mockDbService.getUuidByKey(
      createTargetUuidKey(Domains.Collection, 1)
    );
    const { app } = await makeTestApp({ initialRoute: `/books/${id}` });
    render(app);
    await waitFor(async () => {
      // Check Buttons are visible
      await checkVisibility(ProgramsPageMetaTestIds.addBtn);
      await checkVisibility(ProgramsPageMetaTestIds.addBehaviror);
      await checkVisibility(ProgramsPageMetaTestIds.addCollection);
      await checkVisibility(ProgramsPageMetaTestIds.addProgramToClient);
      await checkVisibility(ProgramsPageMetaTestIds.addProgramToClient);

      // Check initial Collection data loads
      await checkSelectorTextContent(
        getTableData({
          tableName: CollectionMetaTestIds.table,
          rowIndex: 0,
          colName: "title"
        }),
        "Sub Collection 1"
      );

      // Check initial Program data loads
      await checkSelectorTextContent(
        getTableData({
          tableName: ProgramsPageMetaTestIds.table,
          rowIndex: 0,
          colName: "title"
        }),
        "Forward Program 1"
      );
    });
    await checkSelectorTextContent(
      getTableData({
        tableName: ProgramsPageMetaTestIds.table,
        rowIndex: 1,
        colName: "title"
      }),
      "Backward Program 1"
    );
    await checkSelectorTextContent(
      getTableData({
        tableName: ProgramsPageMetaTestIds.table,
        rowIndex: 2,
        colName: "title"
      }),
      "Total Program 1"
    );
    await checkSelectorTextContent(
      getTableData({
        tableName: ProgramsPageMetaTestIds.table,
        rowIndex: 3,
        colName: "title"
      }),
      "Discrete Trial Program 1"
    );

    // Check initial Behavior data loads
    await checkSelectorTextContent(
      getTableData({
        tableName: ProgramsPageMetaTestIds.behaviorTable,
        rowIndex: 0,
        colName: "title"
      }),
      "Behavior Interval 1"
    );
    await checkSelectorTextContent(
      getTableData({
        tableName: ProgramsPageMetaTestIds.behaviorTable,
        rowIndex: 0,
        //TODO: Make this better should be a "-"
        colName: "behavior.type"
      }),
      BehaviorType.Interval
    );

    await checkSelectorTextContent(
      getTableData({
        tableName: ProgramsPageMetaTestIds.behaviorTable,
        rowIndex: 1,
        colName: "title"
      }),
      "Behavior Frequency 1"
    );
    await checkSelectorTextContent(
      getTableData({
        tableName: ProgramsPageMetaTestIds.behaviorTable,
        rowIndex: 1,
        //TODO: Make this better should be a "-"
        colName: "behavior.type"
      }),
      BehaviorType.Frequency
    );

    await checkSelectorTextContent(
      getTableData({
        tableName: ProgramsPageMetaTestIds.behaviorTable,
        rowIndex: 2,
        colName: "title"
      }),
      "Behavior Duration 1"
    );
    await checkSelectorTextContent(
      getTableData({
        tableName: ProgramsPageMetaTestIds.behaviorTable,
        rowIndex: 2,
        //TODO: Make this better should be a "-"
        colName: "behavior.type"
      }),
      BehaviorType.Duration
    );
  });
});
