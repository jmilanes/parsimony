import React from "react";
import {
  BehaviorType,
  Domains,
  Program,
  Result,
  TargetStyle
} from "@parsimony/types";
import { Header } from "../components";
import { getFullDate, getRouterParams } from "../utils";

import {
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip
} from "chart.js";
import { Line } from "react-chartjs-2";

import { Container as DI } from "typedi";
import { useAsync } from "react-use";
import { Spin } from "antd";
import UIApi from "../domains/uiApi/uiApi.Service";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const Results = () => {
  const API = DI.get(UIApi);
  const { programId } = getRouterParams();

  const { loading } = useAsync(async () => {
    await API.makeRequest({
      domain: Domains.Result,
      requestType: "getAllByRelationship",
      payload: {
        relationshipProperty: "programId",
        id: programId
      }
    });
    await API.makeRequest({
      domain: Domains.Program,
      requestType: "get",
      payload: { id: programId }
    });
  });

  if (loading) return <Spin />;

  const program = API.getItem(Domains.Program, programId);
  const results = API.getItemsFromStore(Domains.Result);

  const chartDefaults = {
    fill: false,
    lineTension: 0.5,
    backgroundColor: "#D473F5",
    borderColor: "#D473F5",
    borderWidth: 2
  };

  const createTrialResultState = () => {
    const programCompletenessData = results?.map(
      (result) => result.programCompleteness
    );

    const programDateLabels = results.map((result) => {
      return getFullDate(new Date(result.created_at));
    });

    // TODO: would be really cool to have a place to add multiple data sets here
    return {
      labels: programDateLabels,
      datasets: [
        {
          ...chartDefaults,
          label: `Program ${program?.title} Completeness`,
          data: programCompletenessData
        }
      ]
    };
  };

  const createTallyResultState = (results: Result[]) => {
    // find all unique data
    // filter.by by each date to get the count and create an object with create at and tall

    const uniqueFullDates = [
      ...new Set(
        results.map((result) => getFullDate(new Date(result.created_at)))
      )
    ];

    const calculate = (acc: number, result: Result) => {
      const tally = result?.behaviorData?.tally || 0;
      return acc + tally;
    };

    const processedResults = uniqueFullDates.map((uniqueFullDate) => ({
      count: results
        .filter((x) => getFullDate(new Date(x.created_at)) === uniqueFullDate)
        .reduce(calculate, 0),
      date: uniqueFullDate
    }));

    const programCompletenessData = processedResults?.map(
      (result) => result.count
    );

    const programDateLabels = processedResults.map((result) => result.date);

    // TODO: would be really cool to have a place to add multiple data sets here
    return {
      labels: programDateLabels,
      datasets: [
        {
          ...chartDefaults,
          label: `Behavior ${program?.title} `,
          data: programCompletenessData
        }
      ]
    };
  };

  const resultsStateFactory = (program: Program, results: Result[]) => {
    if (program.targetStyle !== TargetStyle.Behavior) {
      return createTrialResultState();
    }

    if (!program.behavior?.type) {
      throw new Error("No behaivor type");
    }

    const resultStateMap: Record<BehaviorType, (results: Result[]) => any> = {
      [BehaviorType.Tally]: createTallyResultState,
      [BehaviorType.Time]: createTallyResultState,
      [BehaviorType.Interval]: createTallyResultState
    };
    return resultStateMap[program.behavior?.type](results);
  };

  const header = `${program?.title || "Untitled"}: Results`;

  return (
    <>
      <Header text={header} size="page" />
      <Line
        data-test-id={"chart"}
        data={resultsStateFactory(program, results)}
      />
    </>
  );
};

export default Results;
