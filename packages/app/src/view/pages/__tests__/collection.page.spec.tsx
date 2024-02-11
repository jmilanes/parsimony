import React from "react";
import { render, waitFor } from "@testing-library/react";

import {
  BehaviorType,
  Domains,
  CollectionPageMetaTestIds,
  AddModalControls,
  BookPageMetaTestIds,
  TargetStyle,
  TrialChainingDirections,
  BehaviorAddFormMetaTestIds
} from "@parsimony/types";
import { makeTestApp } from "../../../testUtils/makeTestApp";
import {
  checkNotInDocument,
  checkSelectorTextContent,
  checkVisibility,
  clickTarget,
  selectOption,
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
          tableName: CollectionPageMetaTestIds.collectionTable,
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

  test("Should add/delete a Task Analysis with Total Chaining", async () => {
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

    await waitFor(async () => {
      await selectOption({
        target: CollectionPageMetaTestIds.addProgramFormTargetStyleSelector,
        selectedOption: TargetStyle.TaskAnalysis,
        currentValue: TargetStyle.DiscreteTrials
      });
    });

    await clickTarget(AddModalControls.createBtn);

    await waitFor(async () => {
      await checkSelectorTextContent(
        getTableData({
          tableName: CollectionPageMetaTestIds.table,
          rowIndex: 4,
          colName: "chaining.type"
        }),
        "TOTAL"
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

  test("Should add/delete a Task Analysis with Total Backward Chaining", async () => {
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

    await waitFor(async () => {
      await selectOption({
        target: CollectionPageMetaTestIds.addProgramFormTargetStyleSelector,
        selectedOption: TargetStyle.TaskAnalysis,
        currentValue: TargetStyle.DiscreteTrials
      });

      await selectOption({
        target: CollectionPageMetaTestIds.addProgramFormChainingSelector,
        selectedOption: TrialChainingDirections.Backward,
        currentValue: TrialChainingDirections.Total
      });
    });

    await clickTarget(AddModalControls.createBtn);

    await waitFor(async () => {
      await checkSelectorTextContent(
        getTableData({
          tableName: CollectionPageMetaTestIds.table,
          rowIndex: 4,
          colName: "chaining.type"
        }),
        "BACKWARD"
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

  test("Should add/delete a Task Analysis with Total Forward Chaining", async () => {
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

    await waitFor(async () => {
      await selectOption({
        target: CollectionPageMetaTestIds.addProgramFormTargetStyleSelector,
        selectedOption: TargetStyle.TaskAnalysis,
        currentValue: TargetStyle.DiscreteTrials
      });

      await selectOption({
        target: CollectionPageMetaTestIds.addProgramFormChainingSelector,
        selectedOption: TrialChainingDirections.Forward,
        currentValue: TrialChainingDirections.Total
      });
    });

    await clickTarget(AddModalControls.createBtn);

    await waitFor(async () => {
      await checkSelectorTextContent(
        getTableData({
          tableName: CollectionPageMetaTestIds.table,
          rowIndex: 4,
          colName: "chaining.type"
        }),
        "FORWARD"
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

  // test prompts and targets (multiple targets)
  // test set targets
  // Test when you save go to the page

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
    await waitFor(async () => {
      await checkVisibility(CollectionPageMetaTestIds.addBehaviorBtn);
    });

    await clickTarget(CollectionPageMetaTestIds.addBehaviorBtn);

    await typeValueToTarget(
      BehaviorAddFormMetaTestIds.titleField,
      "This is a test program"
    );
    await typeRichTextEditior(
      BehaviorAddFormMetaTestIds.descriptionField,
      "I am a description"
    );

    await typeRichTextEditior(
      BehaviorAddFormMetaTestIds.operationalDefinitionField,
      "Operational Definition!"
    );

    await typeRichTextEditior(
      BehaviorAddFormMetaTestIds.proactiveStrategiesField,
      "Proactive Strategies!"
    );

    await typeRichTextEditior(
      BehaviorAddFormMetaTestIds.precursorBehaviorField,
      "Precursor Behavior!"
    );

    await typeRichTextEditior(
      BehaviorAddFormMetaTestIds.reactiveStrategiesField,
      "Reactive Strategies!"
    );

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

    await clickTarget(
      getTableAction({
        tableName: CollectionPageMetaTestIds.behaviorTable,
        rowIndex: 3,
        action: "delete"
      })
    );

    await waitFor(async () => {
      await checkNotInDocument(
        getTableData({
          tableName: CollectionPageMetaTestIds.behaviorTable,
          rowIndex: 3,
          colName: "title"
        })
      );
    });
  });

  test("Should add/delete a Duration Behavior", async () => {
    const id = mockDbService.getUuidByKey(
      createTargetUuidKey(Domains.Collection, 1)
    );
    const { app } = await makeTestApp({ initialRoute: `/books/${id}` });

    render(app);

    // Check Buttons are visible
    await waitFor(async () => {
      await checkVisibility(CollectionPageMetaTestIds.addBehaviorBtn);
    });

    await clickTarget(CollectionPageMetaTestIds.addBehaviorBtn);

    await typeValueToTarget(
      BehaviorAddFormMetaTestIds.titleField,
      "This is a test program"
    );
    await typeRichTextEditior(
      BehaviorAddFormMetaTestIds.descriptionField,
      "I am a description"
    );

    await waitFor(async () => {
      await selectOption({
        target: BehaviorAddFormMetaTestIds.behaviorTypeSelector,
        selectedOption: BehaviorType.Duration,
        currentValue: BehaviorType.Frequency
      });
    });

    await typeRichTextEditior(
      BehaviorAddFormMetaTestIds.operationalDefinitionField,
      "Operational Definition!"
    );

    await typeRichTextEditior(
      BehaviorAddFormMetaTestIds.proactiveStrategiesField,
      "Proactive Strategies!"
    );

    await typeRichTextEditior(
      BehaviorAddFormMetaTestIds.precursorBehaviorField,
      "Precursor Behavior!"
    );

    await typeRichTextEditior(
      BehaviorAddFormMetaTestIds.reactiveStrategiesField,
      "Reactive Strategies!"
    );

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

    await clickTarget(
      getTableAction({
        tableName: CollectionPageMetaTestIds.behaviorTable,
        rowIndex: 3,
        action: "delete"
      })
    );

    await waitFor(async () => {
      await checkNotInDocument(
        getTableData({
          tableName: CollectionPageMetaTestIds.behaviorTable,
          rowIndex: 3,
          colName: "title"
        })
      );
    });
  });

  test("Should add/delete a Interval Behavior", async () => {
    const id = mockDbService.getUuidByKey(
      createTargetUuidKey(Domains.Collection, 1)
    );
    const { app } = await makeTestApp({ initialRoute: `/books/${id}` });

    render(app);

    // Check Buttons are visible
    await waitFor(async () => {
      await checkVisibility(CollectionPageMetaTestIds.addBehaviorBtn);
    });

    await clickTarget(CollectionPageMetaTestIds.addBehaviorBtn);

    await typeValueToTarget(
      BehaviorAddFormMetaTestIds.titleField,
      "This is a test program"
    );
    await typeRichTextEditior(
      BehaviorAddFormMetaTestIds.descriptionField,
      "I am a description"
    );

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

    await typeRichTextEditior(
      BehaviorAddFormMetaTestIds.operationalDefinitionField,
      "Operational Definition!"
    );

    await typeRichTextEditior(
      BehaviorAddFormMetaTestIds.proactiveStrategiesField,
      "Proactive Strategies!"
    );

    await typeRichTextEditior(
      BehaviorAddFormMetaTestIds.precursorBehaviorField,
      "Precursor Behavior!"
    );

    await typeRichTextEditior(
      BehaviorAddFormMetaTestIds.reactiveStrategiesField,
      "Reactive Strategies!"
    );

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

    await clickTarget(
      getTableAction({
        tableName: CollectionPageMetaTestIds.behaviorTable,
        rowIndex: 3,
        action: "delete"
      })
    );

    await waitFor(async () => {
      await checkNotInDocument(
        getTableData({
          tableName: CollectionPageMetaTestIds.behaviorTable,
          rowIndex: 3,
          colName: "title"
        })
      );
    });
  });
});
