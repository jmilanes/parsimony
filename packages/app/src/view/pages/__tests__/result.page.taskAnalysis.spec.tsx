import React, { forwardRef } from "react";
import { Container } from "typedi";
import { render } from "@testing-library/react";

import { Domains, ResultsMetaTestIds } from "@parsimony/types";
import { makeTestApp } from "../../../testUtils/makeTestApp";
import {
  createTargetUuidKey,
  MockDBService
} from "../../../testUtils/mockDBService";

import {
  discreteTrialForwardChainResultInitialFixture,
  taskAnalysisResultInitialFixture
} from "../fixtures/result.fixtures";
import { checkTableValues } from "../../../testUtils/domains/tables/table.actions.spec";
import { createResultPayload } from "../../../testUtils/dataCreation";

jest.mock("react-chartjs-2", () => {
  const { forwardRef } = require("react");
  const Line = forwardRef((props: any, ref: any) => (
    <div ref={ref} {...props}></div>
  ));
  return {
    Line
  };
});

describe("Task Analysis Result Page Tests", () => {
  const mockDbService = Container.get(MockDBService);
  beforeEach(async () => {
    await mockDbService.cleanUp();
    await mockDbService.setUpData(taskAnalysisResultInitialFixture);
  });

  afterEach(async () => {
    await mockDbService.cleanUp();
  });

  test("Should render with a task analysis result", async () => {
    const id = mockDbService.getUuidByKey(
      createTargetUuidKey(Domains.Program, 1)
    );
    const { app } = await makeTestApp({ initialRoute: `/results/${id}` });
    render(app);
    await checkTableValues([
      {
        tableName: ResultsMetaTestIds.table,
        rowIndex: 0,
        colName: "programCompleteness",
        expectedValue: "75%"
      }
    ]);
  });

  test("Should add/remove a task analysis result", async () => {
    const id = mockDbService.getUuidByKey(
      createTargetUuidKey(Domains.Program, 1)
    );
    const { app } = await makeTestApp({ initialRoute: `/results/${id}` });
    render(app);

    const item = await mockDbService.RS.result.create(
      createResultPayload({
        programId: mockDbService.getUuidByKey(
          createTargetUuidKey(Domains.Program, 1)
        ),
        clientId: mockDbService.getUuidByKey(
          createTargetUuidKey(Domains.User, 0)
        ),
        programCompleteness: 100,
        data: [
          {
            targetCompleteness: 100,
            targetResults: [
              {
                trial: 1,
                completed: false,
                option: {
                  name: "Full verbal model"
                }
              },
              {
                trial: 2,
                completed: false,
                option: {
                  name: "Full verbal model"
                }
              },
              {
                trial: 3,
                completed: true,
                option: {
                  name: "phonetic"
                }
              }
            ]
          },
          {
            targetCompleteness: 100,
            targetResults: [
              {
                trial: 1,
                completed: true,
                option: {
                  name: "Initial sound cue"
                }
              },
              {
                trial: 2,
                completed: false,
                option: {
                  name: "Full verbal model"
                }
              },
              {
                trial: 3,
                completed: true,
                option: {
                  name: "phonetic"
                }
              }
            ]
          }
        ],
        result: 100,
        notes: "",
        updated_at: new Date(),
        created_at: new Date()
      })
    );

    await checkTableValues([
      {
        tableName: ResultsMetaTestIds.table,
        rowIndex: 1,
        colName: "programCompleteness",
        expectedValue: "100%"
      }
    ]);

    await mockDbService.RS.result?.delete(item.id);
  });
});
