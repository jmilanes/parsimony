import { Service } from "typedi";

import {
  BehaviorType,
  Domains,
  Program,
  ProgramViewTypes,
  Result
} from "@parsimony/types";
import { getFullDate, isBehavior, isTrial } from "../../../../utils";
import CoreApi from "../../../accessApis/coreApi/coreApi.service";

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
    await this.#api.Requests.operation.getAllByRelationship({
      relationshipProperty: "programId",
      id: programId,
      model: Domains.Result
    });

    await this.#api.Requests.program.get({ id: programId });
  }

  public calculateResult = (program: Program, results: Result[]) => {
    if (isBehavior(program)) {
      return this.#calculateBehaviorResults(program, results);
    }

    return this.#calculateTrialResults(program, results);
  };

  #calculateBehaviorResults(program: Program, results: Result[]) {
    const uniqueFullDates = [
      ...new Set(
        results.map((result) => getFullDate(new Date(result.created_at || "")))
      )
    ];

    const calculate = (acc: number, result: Result) => {
      const currentResult = result?.behaviorData?.result || 0;
      return acc + currentResult;
    };

    const processedResults = uniqueFullDates.map((uniqueFullDate) => ({
      calculatedResult: results
        .filter(
          (x) => getFullDate(new Date(x.created_at || "")) === uniqueFullDate
        )
        .reduce(calculate, 0),
      date: uniqueFullDate
    }));

    const programCompletenessData = processedResults?.map((result) => {
      if (program.viewType === ProgramViewTypes.DurationBehavior) {
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
    const programCompletenessData = results?.map((result) => result.result);

    const programDateLabels = results.map((result) => {
      return getFullDate(new Date(result.created_at || ""));
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
    if (isTrial(program)) {
      return "Completeness";
    }
    if (program.viewType === ProgramViewTypes.FrequencyBehavior)
      return "Frequency";
    if (program.viewType === ProgramViewTypes.DurationBehavior)
      return "Seconds";
    if (program.viewType === ProgramViewTypes.IntervalBehavior)
      return "Occurrences";
  };

  public getKeyByProgram = (program: Program) => {
    if (isTrial(program)) return "programCompleteness";
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
    // TODO: MAKE UTIL
    return Math.round(n * 100) / 100;
  }

  public getYMax = (program: Program) => {
    if (this.#isPercentage(program)) {
      return 100;
    }
  };

  #isPercentage(program: Program) {
    return (
      isTrial(program) || program.viewType === ProgramViewTypes.IntervalBehavior
    );
  }

  #isDuration(program: Program) {
    return program.viewType === ProgramViewTypes.DurationBehavior;
  }
}
