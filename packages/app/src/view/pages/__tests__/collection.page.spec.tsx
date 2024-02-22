import React from "react";
import { render, waitFor } from "@testing-library/react";

import {
  AddModalControls,
  BehaviorAddFormMetaTestIds,
  BehaviorType,
  BookPageMetaTestIds,
  CollectionPageMetaTestIds,
  Domains,
  TargetStyle,
  TrialChainingDirections
} from "@parsimony/types";
import { makeTestApp } from "../../../testUtils/makeTestApp";
import {
  checkNotInDocument,
  checkSelectorTextContent,
  checkVisibility,
  clickTarget,
  selectOption,
  typeValueToTarget
} from "../../../testUtils/actions.spec";
import { Container } from "typedi";
import {
  createTargetUuidKey,
  MockDBService
} from "../../../testUtils/mockDBService";
import { initialCollectionPageData } from "../fixtures/collection.page.fixtures";
import { getTableAction, getTableData } from "../../../testUtils/selectors";
import {
  checkBehaviorAddButton,
  checkProgramAddButton,
  deleteCreatedProgram,
  updateBehaviorAddFormWithDefaults,
  updateProgramAddFormWithDefaultValues
} from "../../../testUtils/domains/collections/collectionPage.actions.spec";
import {
  CheckTableValueArgs,
  checkTableValues
} from "../../../testUtils/domains/tables/table.actions.spec";

const INITIAL_TABLE_VALUES: CheckTableValueArgs[] = [
  {
    tableName: CollectionPageMetaTestIds.collectionTable,
    rowIndex: 0,
    colName: "title",
    expectedValue: "Sub Collection 1"
  },
  {
    tableName: CollectionPageMetaTestIds.table,
    rowIndex: 0,
    colName: "title",
    expectedValue: "Forward Program 1"
  },
  {
    tableName: CollectionPageMetaTestIds.table,
    rowIndex: 1,
    colName: "title",
    expectedValue: "Backward Program 1"
  },
  {
    tableName: CollectionPageMetaTestIds.table,
    rowIndex: 2,
    colName: "title",
    expectedValue: "Total Program 1"
  },
  {
    tableName: CollectionPageMetaTestIds.table,
    rowIndex: 3,
    colName: "title",
    expectedValue: "Discrete Trial Program 1"
  },
  {
    tableName: CollectionPageMetaTestIds.behaviorTable,
    rowIndex: 0,
    colName: "title",
    expectedValue: "Behavior Interval 1"
  },
  {
    tableName: CollectionPageMetaTestIds.behaviorTable,
    rowIndex: 0,
    colName: "behavior.type",
    expectedValue: BehaviorType.Interval
  },
  {
    tableName: CollectionPageMetaTestIds.behaviorTable,
    rowIndex: 1,
    colName: "title",
    expectedValue: "Behavior Frequency 1"
  },
  {
    tableName: CollectionPageMetaTestIds.behaviorTable,
    rowIndex: 1,
    colName: "behavior.type",
    expectedValue: BehaviorType.Frequency
  },
  {
    tableName: CollectionPageMetaTestIds.behaviorTable,
    rowIndex: 2,
    colName: "title",
    expectedValue: "Behavior Duration 1"
  },
  {
    tableName: CollectionPageMetaTestIds.behaviorTable,
    rowIndex: 2,
    colName: "behavior.type",
    expectedValue: BehaviorType.Duration
  }
];

const DEFAULT_UPDATE_VALUES = {
  title: "This is a test program",
  description: "I am a description"
};

const DEFAULT_TABLE_AFTER_UPDATES = [
  {
    tableName: CollectionPageMetaTestIds.table,
    rowIndex: 4,
    colName: "title",
    expectedValue: "This is a test program"
  },
  {
    tableName: CollectionPageMetaTestIds.table,
    rowIndex: 4,
    colName: "description",
    expectedValue: "I am a description"
  }
];

const DEFAULT_PROGRAM_ADD_DATA = {
  title: "This is a test program",
  description: "I am a description",
  operationalDefinition: "Operational Definition!",
  proactiveStrategies: "Proactive Strategies Definition",
  precursorBehaviors: "Precursor Behaviors!",
  reactiveStrategies: "Reactive Strategies!"
};

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
      await checkTableValues(INITIAL_TABLE_VALUES);
    });
  });

  test("Should add/delete a Discrete Trial", async () => {
    const id = mockDbService.getUuidByKey(
      createTargetUuidKey(Domains.Collection, 1)
    );
    const { app } = await makeTestApp({ initialRoute: `/books/${id}` });
    render(app);
    // Check Buttons are visible
    await checkProgramAddButton();
    await clickTarget(CollectionPageMetaTestIds.addProgramBtn);
    await updateProgramAddFormWithDefaultValues(DEFAULT_UPDATE_VALUES);
    await clickTarget(AddModalControls.createBtn);
    await checkTableValues(DEFAULT_TABLE_AFTER_UPDATES);
    await deleteCreatedProgram(CollectionPageMetaTestIds.table, 4);
  });

  test("Should add/delete a Task Analysis with Total Chaining", async () => {
    const id = mockDbService.getUuidByKey(
      createTargetUuidKey(Domains.Collection, 1)
    );
    const { app } = await makeTestApp({ initialRoute: `/books/${id}` });

    render(app);
    await checkProgramAddButton();
    await clickTarget(CollectionPageMetaTestIds.addProgramBtn);
    await updateProgramAddFormWithDefaultValues({
      ...DEFAULT_UPDATE_VALUES,
      targetStyle: TargetStyle.TaskAnalysis
    });
    await clickTarget(AddModalControls.createBtn);
    await checkTableValues([
      ...DEFAULT_TABLE_AFTER_UPDATES,
      {
        tableName: CollectionPageMetaTestIds.table,
        rowIndex: 4,
        colName: "chaining.type",
        expectedValue: TrialChainingDirections.Total
      }
    ]);
    await deleteCreatedProgram(CollectionPageMetaTestIds.table, 4);
  });

  test("Should add/delete a Task Analysis with Total Backward Chaining", async () => {
    const id = mockDbService.getUuidByKey(
      createTargetUuidKey(Domains.Collection, 1)
    );
    const { app } = await makeTestApp({ initialRoute: `/books/${id}` });
    render(app);
    await checkProgramAddButton();
    await clickTarget(CollectionPageMetaTestIds.addProgramBtn);
    await updateProgramAddFormWithDefaultValues({
      ...DEFAULT_UPDATE_VALUES,
      targetStyle: TargetStyle.TaskAnalysis,
      chaining: { type: TrialChainingDirections.Backward }
    });
    await clickTarget(AddModalControls.createBtn);
    await checkTableValues([
      ...DEFAULT_TABLE_AFTER_UPDATES,
      {
        tableName: CollectionPageMetaTestIds.table,
        rowIndex: 4,
        colName: "chaining.type",
        expectedValue: TrialChainingDirections.Backward
      }
    ]);
    await deleteCreatedProgram(CollectionPageMetaTestIds.table, 4);
  });

  test("Should add/delete a Task Analysis with Total Forward Chaining", async () => {
    const id = mockDbService.getUuidByKey(
      createTargetUuidKey(Domains.Collection, 1)
    );
    const { app } = await makeTestApp({ initialRoute: `/books/${id}` });

    render(app);

    await checkProgramAddButton();
    await clickTarget(CollectionPageMetaTestIds.addProgramBtn);
    await updateProgramAddFormWithDefaultValues({
      ...DEFAULT_UPDATE_VALUES,
      targetStyle: TargetStyle.TaskAnalysis,
      chaining: {
        type: TrialChainingDirections.Forward
      }
    });
    await clickTarget(AddModalControls.createBtn);

    await checkTableValues([
      ...DEFAULT_TABLE_AFTER_UPDATES,
      {
        tableName: CollectionPageMetaTestIds.table,
        rowIndex: 4,
        colName: "chaining.type",
        expectedValue: TrialChainingDirections.Forward
      }
    ]);
    await deleteCreatedProgram(CollectionPageMetaTestIds.table, 4);
  });

  test("Should add/delete a Collection", async () => {
    const id = mockDbService.getUuidByKey(
      createTargetUuidKey(Domains.Collection, 1)
    );
    const { app } = await makeTestApp({ initialRoute: `/books/${id}` });

    render(app);

    // Check Buttons are visible
    await waitFor(async () => {
      await checkVisibility(CollectionPageMetaTestIds.addCollectionBtn);
    });

    await clickTarget(CollectionPageMetaTestIds.addCollectionBtn);

    await typeValueToTarget(
      BookPageMetaTestIds.nameField,
      "This is a test collection"
    );

    await clickTarget(AddModalControls.createBtn);

    await waitFor(async () => {
      await checkSelectorTextContent(
        getTableData({
          tableName: CollectionPageMetaTestIds.collectionTable,
          rowIndex: 1,
          colName: "title"
        }),
        "This is a test collection"
      );
    });

    await clickTarget(
      getTableAction({
        tableName: CollectionPageMetaTestIds.collectionTable,
        rowIndex: 1,
        action: "delete"
      })
    );

    await waitFor(async () => {
      await checkNotInDocument(
        getTableData({
          tableName: CollectionPageMetaTestIds.collectionTable,
          rowIndex: 1,
          colName: "title"
        })
      );
    });
  });

  test("Should add/delete a Frequency Behavior", async () => {
    const id = mockDbService.getUuidByKey(
      createTargetUuidKey(Domains.Collection, 1)
    );
    const { app } = await makeTestApp({ initialRoute: `/books/${id}` });

    render(app);

    // Check Buttons are visible
    await checkBehaviorAddButton();
    await clickTarget(CollectionPageMetaTestIds.addBehaviorBtn);
    await updateBehaviorAddFormWithDefaults(DEFAULT_PROGRAM_ADD_DATA);
    await clickTarget(AddModalControls.createBtn);

    await waitFor(async () => {
      await checkSelectorTextContent(
        getTableData({
          tableName: CollectionPageMetaTestIds.behaviorTable,
          rowIndex: 3,
          colName: "behavior.type"
        }),
        BehaviorType.Frequency
      );
    });

    await deleteCreatedProgram(CollectionPageMetaTestIds.behaviorTable, 3);
  });

  test("Should add/delete a Duration Behavior", async () => {
    const id = mockDbService.getUuidByKey(
      createTargetUuidKey(Domains.Collection, 1)
    );
    const { app } = await makeTestApp({ initialRoute: `/books/${id}` });

    render(app);

    await checkBehaviorAddButton();
    await clickTarget(CollectionPageMetaTestIds.addBehaviorBtn);
    await updateBehaviorAddFormWithDefaults(DEFAULT_PROGRAM_ADD_DATA);
    await waitFor(async () => {
      await selectOption({
        target: BehaviorAddFormMetaTestIds.behaviorTypeSelector,
        selectedOption: BehaviorType.Duration,
        currentValue: BehaviorType.Frequency
      });
    });
    await clickTarget(AddModalControls.createBtn);
    await waitFor(async () => {
      await checkSelectorTextContent(
        getTableData({
          tableName: CollectionPageMetaTestIds.behaviorTable,
          rowIndex: 3,
          colName: "behavior.type"
        }),
        BehaviorType.Duration
      );
    });
    await deleteCreatedProgram(CollectionPageMetaTestIds.behaviorTable, 3);
  });

  test("Should add/delete a Interval Behavior", async () => {
    const id = mockDbService.getUuidByKey(
      createTargetUuidKey(Domains.Collection, 1)
    );
    const { app } = await makeTestApp({ initialRoute: `/books/${id}` });

    render(app);

    await checkBehaviorAddButton();
    await clickTarget(CollectionPageMetaTestIds.addBehaviorBtn);
    await updateBehaviorAddFormWithDefaults(DEFAULT_PROGRAM_ADD_DATA);
    await waitFor(async () => {
      await selectOption({
        target: BehaviorAddFormMetaTestIds.behaviorTypeSelector,
        selectedOption: BehaviorType.Interval,
        currentValue: BehaviorType.Frequency
      });
      await typeValueToTarget(
        BehaviorAddFormMetaTestIds.alertDurationField,
        "10000"
      );
    });

    await clickTarget(AddModalControls.createBtn);

    await waitFor(async () => {
      await checkSelectorTextContent(
        getTableData({
          tableName: CollectionPageMetaTestIds.behaviorTable,
          rowIndex: 3,
          colName: "behavior.type"
        }),
        BehaviorType.Interval
      );
    });
    await deleteCreatedProgram(CollectionPageMetaTestIds.behaviorTable, 3);
  });
});
