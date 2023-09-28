import { Service } from "typedi";

import {
  BehaviorType,
  Domains,
  Program,
  Result,
  TargetStyle
} from "@parsimony/types";
import { getFullDate } from "../../utils";
import CoreApi from "../../domains/coreApi/coreApi.service";

const chartDefaults = {
  fill: false,
  lineTension: 0.5,
  backgroundColor: "#A35F98",
  borderColor: "#A35F98",
  borderWidth: 2
};

@Service()
export class ResultActions {
  #api: CoreApi;

  constructor(_api: CoreApi) {
    this.#api = _api;
  }

  public async init(programId: string) {
    await this.#api.makeRequest({
      domain: Domains.Result,
      requestType: "getAllByRelationship",
      payload: {
        relationshipProperty: "programId",
        id: programId
      }
    });
    await this.#api.makeRequest({
      domain: Domains.Program,
      requestType: "get",
      payload: { id: programId }
    });
  }

  public calculateResult = (program: Program, results: Result[]) => {
    if (program.targetStyle === TargetStyle.Behavior) {
      return this.#calculateBehaviorResults(program, results);
    }

    return this.#calculateTrialResults(program, results);
  };

  #calculateBehaviorResults(program: Program, results: Result[]) {
    const uniqueFullDates = [
      ...new Set(
        results.map((result) => getFullDate(new Date(result.created_at)))
      )
    ];

    const calculate = (acc: number, result: Result) => {
      const currentResult = result?.behaviorData?.result || 0;
      return acc + currentResult;
    };

    const processedResults = uniqueFullDates.map((uniqueFullDate) => ({
      calculatedResult: results
        .filter((x) => getFullDate(new Date(x.created_at)) === uniqueFullDate)
        .reduce(calculate, 0),
      date: uniqueFullDate
    }));

    const programCompletenessData = processedResults?.map((result) => {
      if (program.behavior?.type === BehaviorType.Duration) {
        return Math.round(result.calculatedResult / 1000);
      }
      return result.calculatedResult;
    });

    const programDateLabels = processedResults.map((result) => {
      return result.date;
    });
    //c
    return {
      labels: programDateLabels,
      datasets: [
        {
          ...chartDefaults,
          label: `${program?.title}`,
          data: programCompletenessData
        }
      ]
    };
  }

  #calculateTrialResults(program: Program, results: Result[]) {
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
          label: `${program?.title}`,
          data: programCompletenessData
        }
      ]
    };
  }

  public getYAxisLabel = (program: Program) => {
    if (program.targetStyle !== TargetStyle.Behavior) return "Completeness";
    if (program.behavior?.type === BehaviorType.Frequency) return "Frequency";
    if (program.behavior?.type === BehaviorType.Duration) return "Seconds";
    if (program.behavior?.type === BehaviorType.Interval) return "Occurrences";
  };

  public getKeyByProgram = (program: Program) => {
    if (program.targetStyle !== TargetStyle.Behavior)
      return "programCompleteness";
    return "behaviorData.result";
  };

  //ddd

  public getYAxisCallback = (program: Program) => (value: any) => {
    if (this.#isPercentage(program)) {
      return value + "%";
    }
    return value;
  };

  public getDisplayValueForTable = (program: Program) => (value: any) => {
    if (this.#isPercentage(program)) {
      return this.#round(value) + "%";
    }

    if (this.#isDuration(program)) {
      return value / 1000 + "s";
    }

    return value;
  };

  #round(n: number) {
    // MAKE UTIL
    return Math.round(n * 100) / 100;
  }

  public getYMax = (program: Program) => {
    if (this.#isPercentage(program)) {
      return 100;
    }
  };

  #isPercentage(program: Program) {
    return (
      program.targetStyle !== TargetStyle.Behavior ||
      program.behavior?.type === BehaviorType.Interval
    );
  }

  #isDuration(program: Program) {
    return program.behavior?.type === BehaviorType.Duration;
  }
}
