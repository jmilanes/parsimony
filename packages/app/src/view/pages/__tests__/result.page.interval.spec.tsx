import React, { forwardRef } from "react";
import { Container } from "typedi";
import { render } from "@testing-library/react";

import { BehaviorType, Domains, ResultsMetaTestIds } from "@parsimony/types";
import { makeTestApp } from "../../../testUtils/makeTestApp";
import {
  createTargetUuidKey,
  MockDBService
} from "../../../testUtils/mockDBService";

import {
  durationBehaviorResultsFixture,
  frequencyBehaviorResultsFixture,
  intervalBehaviorResultsFixture
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

describe("Interval Results Page Tests", () => {
  const mockDbService = Container.get(MockDBService);
  beforeEach(async () => {
    await mockDbService.cleanUp();
    await mockDbService.setUpData(intervalBehaviorResultsFixture);
  });

  afterEach(async () => {
    await mockDbService.cleanUp();
  });

  test("Should Render with a interval result", async () => {
    const id = mockDbService.getUuidByKey(
      createTargetUuidKey(Domains.Program, 1)
    );
    const { app } = await makeTestApp({ initialRoute: `/results/${id}` });
    render(app);
    await checkTableValues([
      {
        tableName: ResultsMetaTestIds.table,
        rowIndex: 0,
        colName: "behaviorData.result",
        expectedValue: "50%"
      }
    ]);
  });

  test("Should Render add/remove a interval result", async () => {
    const id = mockDbService.getUuidByKey(
      createTargetUuidKey(Domains.Program, 1)
    );
    const { app } = await makeTestApp({ initialRoute: `/results/${id}` });
    render(app);

    const item = await mockDbService.RS.requests.result?.create(
      createResultPayload({
        clientId: mockDbService.getUuidByKey(
          createTargetUuidKey(Domains.User, 0)
        ),
        programId: mockDbService.getUuidByKey(
          createTargetUuidKey(Domains.Program, 1)
        ),
        behaviorData: {
          result: 100,
          type: BehaviorType.Interval
        }
      })
    );

    await checkTableValues([
      {
        tableName: ResultsMetaTestIds.table,
        rowIndex: 1,
        colName: "behaviorData.result",
        expectedValue: "100%"
      }
    ]);

    await mockDbService.RS.requests.result?.delete(item.id);
  });
});
