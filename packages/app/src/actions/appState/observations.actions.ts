import { Service } from "typedi";

import CoreApi from "../../domains/coreApi/coreApi.service";
import {
  Domains,
  IResultData,
  Program,
  ResultData,
  Target,
  TargetResult,
  TargetResultOption,
  TargetStyle
} from "@parsimony/types";
import { initialResultData } from "../../fixtures";
import {
  calculateAverage,
  parseResultsWithCompleteness,
  removeMongoIds
} from "../../utils";
import { ObservationTarget } from "../../services/appStateService";

export const Discrete_Trial_ID = "discrete";

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
      currentTrial: 1,
      stated: true,
      targetStates: this.initTarget(program.targets as Target[])
    });
  }

  public initTarget = (targets: Target[] = []) => {
    const targetStates: any = {
      [Discrete_Trial_ID]: { ...initTargetData }
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
    const { currentStep, results } = this.getTargetState(targetId);
    const targetResults = results[targetId];
    const currentSelection = targetResults && targetResults[currentStep - 1];
    return currentSelection?.option?.id;
  };

  public incrementStep = (targetId: string) => {
    const { program } = this.state();
    const { currentStep } = this.getTargetState(targetId);

    if (currentStep === program?.trials) {
      this.updateTargetState(targetId, {
        active: false,
        complete: true
      });
      return;
    }

    this.updateTargetState(targetId || "", {
      currentStep: currentStep + 1
    });
  };

  public decrementStep = (targetId: string) => {
    const { currentStep } = this.getTargetState(targetId);

    this.updateTargetState(targetId, {
      currentStep: currentStep - 1
    });
  };

  #updateTargetResultAtStep = (results: TargetResult[], data: TargetResult) => {
    const update = [...results];
    const zeroIndexStep = (data.trial || 1) - 1;
    update[zeroIndexStep] = data;
    return update;
  };

  public updateResults = (resultData: TargetResult, target: Target) => {
    const id = target.id as string;
    const { results } = this.getTargetState(id);
    const updatedResultArray = results[id]
      ? this.#updateTargetResultAtStep(results[id], resultData)
      : [resultData];

    this.updateTargetState(id, {
      results: {
        ...results,
        [id]: updatedResultArray
      }
    });

    this.updateCurrentTrialCompleteness();
    this.updateResultForTarget(target);
  };

  #getTargetOptionId = () => {
    const { program } = this.state();
    return program?.targetOptions?.find((option) => !!option?.target)?.id || "";
  };

  public selectOption = (option: TargetResultOption, target: Target) => {
    const { program } = this.state();
    const { currentStep } = this.getTargetState(target.id || "");
    let completed = true;
    // If the selection is above the target option then you get a 100% completeness
    for (const opt of program?.targetOptions || []) {
      if (opt?.target) break;
      if (opt?.id === option.id) {
        completed = false;
        break;
      }
    }
    const obj: TargetResult = {
      trial: currentStep,
      option,
      targetOptionId: this.#getTargetOptionId(),
      completed
    };

    this.updateResults(obj, target);
    this.isTaskAnalysis() && this.incrementStep(target.id || "");
  };

  public updateTargetState = (
    targetId: string,
    update: Partial<ObservationTarget>
  ) => {
    if (!targetId.length) {
      return;
    }
    const { targetStates } = this.state();
    this.updateCurrentTrialCompleteness();
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

  public isDiscreteTrial = () => {
    const { program } = this.state();
    return program?.targetStyle === TargetStyle.DiscreteTrials;
  };

  public isTaskAnalysis = () => {
    const { program } = this.state();
    return program?.targetStyle === TargetStyle.TaskAnalysis;
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

  #shouldChain() {
    const { program } = this.state();

    if (this.isDiscreteTrial() || !program?.chaining?.type) {
      return false;
    }
    return true;
  }

  public updateCurrentTrialCompleteness = () => {
    if (this.#shouldChain()) {
      return;
    }
    const { currentTrial, program } = this.state();
    const targetId = this.getTargetIdByIndex(currentTrial);
    if (!targetId) {
      return;
    }
    const { completeness, currentStep } = this.getTargetState(targetId);

    if (currentStep !== program?.trials) {
      return;
    }
    const current = completeness[targetId];

    if (current === 100) {
      this.#api.updateAppState("observation", {
        currentTrial: currentTrial + 1
      });
    }
  };

  public isTrialActiveForChain = (targetId: string) => {
    if (!this.#shouldChain()) {
      return true;
    }
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
