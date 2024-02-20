import React from "react";
import { render } from "@testing-library/react";

import {
  Domains,
  ProgramCategories,
  ProgramPageMetaTestIds,
  ProgramTypes
} from "@parsimony/types";
import { makeTestApp } from "../../../testUtils/makeTestApp";
import { clickTarget } from "../../../testUtils/actions.spec";
import { Container } from "typedi";
import {
  createTargetUuidKey,
  MockDBService
} from "../../../testUtils/mockDBService";

import { initialProgramPageData } from "../fixtures/program.page.fixtures";
import {
  checkProgramReadOnlyValues,
  updateProgramPageFields
} from "../../../testUtils/domains/programs/prgoamPage.actions.spec";

const DEFAULT_INITIAL_PROGRAM_DATA = {
  title: "Test Program",
  description: "This is a Test Program",
  materials: "None",
  type: ProgramTypes.Main,
  masteryTarget: 100,
  masteryConsecutiveTargets: 3,
  category: ProgramCategories.Aba,
  targetOptions: [
    {
      name: "Full Physical"
    },
    {
      name: "Partial physical"
    },
    {
      name: "Light physical"
    },
    {
      name: "Gesture"
    },
    {
      name: "Independent"
    }
  ],
  targets: [
    {
      title: "Target 1 Title",
      description: "Target 1 Description"
    },
    {
      title: "Target 2 Title",
      description: "Target 2 Description"
    }
  ]
};

const DEFAULT_UPDATED_PROGRAM_DATA = {
  title: "New Title",
  description: "New Description",
  materials: "SO MANY",
  masteryTarget: 40,
  masteryConsecutiveTargets: 1,
  targetOptions: [
    {
      name: "N1"
    },
    {
      name: "N2"
    },
    {
      name: "N3"
    },
    {
      name: "N4"
    },
    {
      name: "N5"
    }
  ],
  targets: [
    {
      title: "title",
      description: "desc"
    },
    {
      title: "title2",
      description: "desc2"
    }
  ]
};

describe("Parsimony Program Page Tests", () => {
  const mockDbService = Container.get(MockDBService);
  beforeEach(async () => {
    await mockDbService.cleanUp();
    await mockDbService.setUpData(initialProgramPageData);
  });

  afterEach(async () => {
    await mockDbService.cleanUp();
  });

  test("Should Render and Edit a Task Analysis Program", async () => {
    const id = mockDbService.getUuidByKey(
      createTargetUuidKey(Domains.Program, 0)
    );
    const { app } = await makeTestApp({ initialRoute: `/programs/${id}` });
    render(app);

    await checkProgramReadOnlyValues(DEFAULT_INITIAL_PROGRAM_DATA);
    await clickTarget(ProgramPageMetaTestIds.editBtn);
    await updateProgramPageFields(DEFAULT_UPDATED_PROGRAM_DATA);
    // Test Submit Works
    await clickTarget(ProgramPageMetaTestIds.submitEditBtn);
    await checkProgramReadOnlyValues(DEFAULT_UPDATED_PROGRAM_DATA);
  });

  test("Should Render and Cancel a Task Analysis Program", async () => {
    const id = mockDbService.getUuidByKey(
      createTargetUuidKey(Domains.Program, 0)
    );
    const { app } = await makeTestApp({ initialRoute: `/programs/${id}` });
    render(app);

    await checkProgramReadOnlyValues(DEFAULT_INITIAL_PROGRAM_DATA);
    await clickTarget(ProgramPageMetaTestIds.editBtn);
    await updateProgramPageFields(DEFAULT_UPDATED_PROGRAM_DATA);
    await clickTarget(ProgramPageMetaTestIds.cancelEditBtn);
    await checkProgramReadOnlyValues(DEFAULT_INITIAL_PROGRAM_DATA);
    await clickTarget(ProgramPageMetaTestIds.editBtn);
    await updateProgramPageFields(DEFAULT_UPDATED_PROGRAM_DATA);
  });
});
