import React, { forwardRef } from "react";
import { Container } from "typedi";
import { render } from "@testing-library/react";

import { Domains, ResultsMetaTestIds, ResultType } from "@parsimony/types";
import { makeTestApp } from "../../../testUtils/makeTestApp";
import {
  createTargetUuidKey,
  MockDBService
} from "../../../testUtils/mockDBService";

import { durationBehaviorResultsFixture } from "../fixtures/result.fixtures";
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

describe("Duration Results Page Tests", () => {
  const mockDbService = Container.get(MockDBService);
  beforeEach(async () => {
    await mockDbService.cleanUp();
    await mockDbService.setUpData(durationBehaviorResultsFixture);
  });

  afterEach(async () => {
    await mockDbService.cleanUp();
  });

  test("Should Render with a duration result", async () => {
    const id = mockDbService.getUuidByKey(
      createTargetUuidKey(Domains.Program, 1)
    );
    const { app } = await makeTestApp({ initialRoute: `/results/${id}` });
    render(app);
    await checkTableValues([
      {
        tableName: ResultsMetaTestIds.table,
        rowIndex: 0,
        colName: "result",
        expectedValue: "1s"
      }
    ]);
  });

  test("Should Render add/remove a duration result", async () => {
    const id = mockDbService.getUuidByKey(
      createTargetUuidKey(Domains.Program, 1)
    );
    const { app } = await makeTestApp({ initialRoute: `/results/${id}` });
    render(app);

    const item = await mockDbService.RS.result?.create(
      createResultPayload({
        clientId: mockDbService.getUuidByKey(
          createTargetUuidKey(Domains.User, 0)
        ),
        programId: mockDbService.getUuidByKey(
          createTargetUuidKey(Domains.Program, 1)
        ),
        result: 10000,
        type: ResultType.Duration
      })
    );

    await checkTableValues([
      {
        tableName: ResultsMetaTestIds.table,
        rowIndex: 1,
        colName: "result",
        expectedValue: "10s"
      }
    ]);

    await mockDbService.RS.result?.delete(item.id);
  });
});
