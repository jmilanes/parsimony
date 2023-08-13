import { Service } from "typedi";

import CoreApi from "../../domains/coreApi/coreApi.service";
import {
  Domains,
  IResultData,
  Program,
  ResultData,
  Target,
  TargetStyle
} from "@parsimony/types";
import { initialResultData } from "../../fixtures";
import {
  calculateAverage,
  parseResultsWithCompleteness,
  removeMongoIds
} from "../../utils";
import { ObservationTarget } from "../../services/appStateService";

export const TASK_ANALYSIS_ID = "taskAnalysis";

const initTargetData = {
  active: false,
  results: {},
  completeness: {},
  currentStep: 1,
  complete: false
};

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
      currentTrialCompleteness: undefined,
      currentTrial: undefined,
      stated: false,
      programCompleteness: 0,
      results: {},
      resultsData: {},
      isLoaded: false,
      targetStates: {}
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
      currentTrialCompleteness: 0,
      currentTrial: 1,
      stated: true,
      targetStates: this.initTarget(program.targets as Target[])
    });
  }

  public initTarget = (targets: Target[] = []) => {
    const targetStates: any = {
      [TASK_ANALYSIS_ID]: { ...initTargetData }
    };
    for (const target of targets) {
      targetStates[target.id as string] = { ...initTargetData };
    }
    return targetStates;
  };

  public getTargetState = (targetId: string) => {
    const { targetStates } = this.state();
    return targetStates[targetId];
  };

  public getTargetIdByIndex = (index: number) => {
    const { program } = this.state();
    const targets = program?.targets;
    return targets && targets[index - 1]?.id;
  };

  public getSelectedByTargetState = (targetId: string) => {
    const { currentStep, completeness, results } =
      this.getTargetState(targetId);
    const targetResults = results[targetId];
    const currentSelection = targetResults && targetResults[currentStep - 1];
    return currentSelection?.option?.id;
  };

  public updateTargetState = (
    targetId: string,
    update: Partial<ObservationTarget>
  ) => {
    if (!targetId.length) {
      return;
    }
    const { targetStates } = this.state();
    this.#api.updateAppState("observation", {
      targetStates: {
        ...targetStates,
        [targetId]: { ...targetStates[targetId], ...update }
      }
    });
  };

  public updateResultForTarget = (target: Target) => {
    const { results, completeness } = this.getTargetState(target.id || "");
    if (Object.keys(results).length) {
      const { parsedResults, newCompleteNess } = parseResultsWithCompleteness(
        results,
        completeness,
        target
      );

      this.updateTargetState(target.id || "", {
        completeness: newCompleteNess
      });

      this.updateProgramResultData(parsedResults);
    }
  };

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
  updateProgramResultData = (latestResult: IResultData) => {
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

  public updateCurrentTrialCompleteness = () => {
    const { currentTrialCompleteness, currentTrial, program } = this.state();
    const targetId = this.getTargetIdByIndex(currentTrial);
    if (!targetId) {
      return;
    }
    const { completeness, currentStep } = this.getTargetState(targetId);

    if (currentStep !== program?.trials) {
      return;
    }

    const current = completeness[targetId];

    if (currentTrialCompleteness === current && current !== 100) {
      return;
    }

    if (current < 100) {
      this.#api.updateAppState("observation", {
        currentTrialCompleteness: current
      });
    }

    this.#api.updateAppState("observation", {
      currentTrialCompleteness: 0,
      currentTrial: currentTrial + 1
    });
  };

  public isTrialActiveForChain = (targetId: string) => {
    const { currentTrial, program } = this.state();
    const index = program?.targets?.map((t) => t?.id).indexOf(targetId);
    const trialStep = index || 0;
    return trialStep + 1 <= currentTrial;
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
