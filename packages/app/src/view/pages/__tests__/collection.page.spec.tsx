import React from "react";
import { render, waitFor } from "@testing-library/react";

import {
  BehaviorType,
  CollectionMetaTestIds,
  Domains,
  CollectionPageMetaTestIds,
  AddModalControls
} from "@parsimony/types";
import { makeTestApp } from "../../../testUtils/makeTestApp";
import {
  checkNotInDocument,
  checkSelectorTextContent,
  checkVisibility,
  clickTarget,
  typeRichTextEditior,
  typeValueToTarget
} from "../../../testUtils/actions.spec";
import { Container } from "typedi";
import {
  createTargetUuidKey,
  MockDBService
} from "../../../testUtils/mockDBService";
import { initialCollectionPageData } from "../fixtures/collection.page.fixtures";
import { getTableAction, getTableData } from "../../../testUtils/selectors";

describe("Parsimony Collection Page Tests", () => {
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
      await checkVisibility(CollectionPageMetaTestIds.addProgramBtn);
      await checkVisibility(CollectionPageMetaTestIds.addBehaviorBtn);
      await checkVisibility(CollectionPageMetaTestIds.addCollectionBtn);
      await checkVisibility(CollectionPageMetaTestIds.addProgramToClientBtn);
      await checkVisibility(CollectionPageMetaTestIds.addProgramToClientBtn);

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
          tableName: CollectionPageMetaTestIds.table,
          rowIndex: 0,
          colName: "title"
        }),
        "Forward Program 1"
      );
    });
    await checkSelectorTextContent(
      getTableData({
        tableName: CollectionPageMetaTestIds.table,
        rowIndex: 1,
        colName: "title"
      }),
      "Backward Program 1"
    );
    await checkSelectorTextContent(
      getTableData({
        tableName: CollectionPageMetaTestIds.table,
        rowIndex: 2,
        colName: "title"
      }),
      "Total Program 1"
    );
    await checkSelectorTextContent(
      getTableData({
        tableName: CollectionPageMetaTestIds.table,
        rowIndex: 3,
        colName: "title"
      }),
      "Discrete Trial Program 1"
    );

    // Check initial Behavior data loads
    await checkSelectorTextContent(
      getTableData({
        tableName: CollectionPageMetaTestIds.behaviorTable,
        rowIndex: 0,
        colName: "title"
      }),
      "Behavior Interval 1"
    );
    await checkSelectorTextContent(
      getTableData({
        tableName: CollectionPageMetaTestIds.behaviorTable,
        rowIndex: 0,
        //TODO: Make this better should be a "-"
        colName: "behavior.type"
      }),
      BehaviorType.Interval
    );

    await checkSelectorTextContent(
      getTableData({
        tableName: CollectionPageMetaTestIds.behaviorTable,
        rowIndex: 1,
        colName: "title"
      }),
      "Behavior Frequency 1"
    );
    await checkSelectorTextContent(
      getTableData({
        tableName: CollectionPageMetaTestIds.behaviorTable,
        rowIndex: 1,
        //TODO: Make this better should be a "-"
        colName: "behavior.type"
      }),
      BehaviorType.Frequency
    );

    await checkSelectorTextContent(
      getTableData({
        tableName: CollectionPageMetaTestIds.behaviorTable,
        rowIndex: 2,
        colName: "title"
      }),
      "Behavior Duration 1"
    );
    await checkSelectorTextContent(
      getTableData({
        tableName: CollectionPageMetaTestIds.behaviorTable,
        rowIndex: 2,
        //TODO: Make this better should be a "-"
        colName: "behavior.type"
      }),
      BehaviorType.Duration
    );
  });

  test("Should add/delete a Discrete Trial", async () => {
    const id = mockDbService.getUuidByKey(
      createTargetUuidKey(Domains.Collection, 1)
    );
    const { app } = await makeTestApp({ initialRoute: `/books/${id}` });

    render(app);

    // Check Buttons are visible
    await waitFor(async () => {
      await checkVisibility(CollectionPageMetaTestIds.addProgramBtn);
    });

    await clickTarget(CollectionPageMetaTestIds.addProgramBtn);

    await typeValueToTarget(
      CollectionPageMetaTestIds.addProgramFormTitleField,
      "This is a test program"
    );
    await typeRichTextEditior(
      CollectionPageMetaTestIds.addProgramFormDescriptionField,
      "I am a description"
    );

    await clickTarget(AddModalControls.createBtn);

    await waitFor(async () => {
      await checkSelectorTextContent(
        getTableData({
          tableName: CollectionPageMetaTestIds.table,
          rowIndex: 4,
          colName: "title"
        }),
        "This is a test program"
      );
      await checkSelectorTextContent(
        getTableData({
          tableName: CollectionPageMetaTestIds.table,
          rowIndex: 4,
          colName: "description"
        }),
        "I am a description"
      );
    });

    await clickTarget(
      getTableAction({
        tableName: CollectionPageMetaTestIds.table,
        rowIndex: 4,
        action: "delete"
      })
    );

    await waitFor(async () => {
      await checkNotInDocument(
        getTableData({
          tableName: CollectionPageMetaTestIds.table,
          rowIndex: 4,
          colName: "title"
        })
      );
    });
  });
});
