import { Service } from "typedi";
import UIApi from "../../domains/uiApi/uiApi.Service";
import { BehaviorType, Program, Result, TargetStyle } from "@parsimony/types";
import { getFullDate } from "../../utils";

const chartDefaults = {
  fill: false,
  lineTension: 0.5,
  backgroundColor: "#D473F5",
  borderColor: "#D473F5",
  borderWidth: 2
};

@Service()
export class ResultActions {
  #api: UIApi;

  constructor(_api: UIApi) {
    this.#api = _api;
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
      if (program.behavior?.type === BehaviorType.Time) {
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
          label: `Behavior ${program?.title} `,
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
          label: `Program ${program?.title} Completeness`,
          data: programCompletenessData
        }
      ]
    };
  }
}
