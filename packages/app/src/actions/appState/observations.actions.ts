import { Service } from "typedi";

import CoreApi from "../../domains/coreApi/coreApi.service";
import {
  Domains,
  IResultData,
  Program,
  ResultData,
  TargetStyle
} from "@parsimony/types";
import { initialResultData } from "../../fixtures";
import { calculateAverage, removeMongoIds } from "../../utils";

@Service()
export class ObservationActions {
  #api: CoreApi;

  constructor(_api: CoreApi) {
    this.#api = _api;
  }

  public state() {
    return this.#api.getAppState("observation");
  }

  public reset = () => {
    this.#api.updateAppState("observation", {
      currentTrialPercentage: undefined,
      currentTrial: undefined,
      stated: false,
      programCompleteness: 0,
      results: {},
      resultsData: {},
      isLoaded: false
    });
  };

  public async init(programId?: string) {
    await this.#api.makeRequest({
      domain: Domains.Program,
      requestType: "get",
      payload: { id: programId }
    });

    const program = this.#api.getItem(Domains.Program, programId);
    this.#api.updateAppState("observation", {
      isLoaded: true,
      program: program,
      results: {
        ...initialResultData,
        clientId: program?.clientId,
        programId: program?.id
      },
      currentTrialPercentage: 0,
      currentTrial: 1,
      stated: true
    });
  }

  public isDiscreteTrial = (program: Program) => {
    return program.targetStyle === TargetStyle.DiscreteTrials;
  };

  public isTaskAnalysis = (program: Program) => {
    return program.targetStyle === TargetStyle.TaskAnalysis;
  };

  onChange() {
    this.updateProgramCompleteness();
  }

  /**
   *
   * Update the program's average completeness
   */
  updateProgramCompleteness() {
    const averageCompleteness = calculateAverage(
      this.#getResultData(),
      "targetCompleteness"
    );

    this.#api.updateAppState("observation", {
      programCompleteness: averageCompleteness || 0
    });
  }

  #getResultData() {
    const { resultsData } = this.state();
    return Object.values(resultsData);
  }

  /**
   *
   * Update the result data right now passing in most reset result data
   */
  updatedResultsData = (latestResult: IResultData) => {
    // latest result is an object of the latest result data keys are the target ID
    // This is so that a group of target results can be passed through as an object
    const latestResults = Object.values(latestResult);

    latestResults.forEach((latestResult: ResultData) => {
      const previousResults = this.state().resultsData;
      this.#api.updateAppState("observation", {
        resultsData: {
          ...previousResults,
          [latestResult?.targetId as string]: latestResult
        }
      });
    });

    this.updateProgramCompleteness();
  };

  public updateCurrentTrialPercentage = (percentage: number) => {
    const { currentTrialPercentage, currentTrial } = this.state();
    if (currentTrialPercentage === percentage && percentage !== 100) {
      return;
    }

    if (percentage < 100) {
      this.#api.updateAppState("observation", {
        currentTrialPercentage: percentage
      });
    }

    this.#api.updateAppState("observation", {
      currentTrialPercentage: 0,
      currentTrial: currentTrial + 1
    });
  };

  public isTrialActiveForChain = (trial: number) => {
    const { currentTrial } = this.state();
    return trial <= currentTrial;
  };

  public submit = async () => {
    await this.#api.makeRequest({
      domain: Domains.Result,
      requestType: "create",
      payload: this.getResultsForCreation()
    });
  };

  /**
   *
   * Returns the results in a format for the submission!
   */
  getResultsForCreation() {
    const date = new Date();
    const { results, programCompleteness } = this.state();
    return removeMongoIds({
      ...results,
      data: this.#getResultData(),
      programCompleteness: programCompleteness,
      created_at: date,
      updated_at: date
    });
  }
}
