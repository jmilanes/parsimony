import { Service } from "typedi";

import CoreApi from "../../../accessApis/coreApi/coreApi.service";
import {
  Domains,
  ICompletenessState,
  IResultData,
  ResultData,
  Target,
  TargetResult,
  TargetResultOption,
  TargetStyle,
  TrialChainingDirections
} from "@parsimony/types/dist";
import { initialResultData } from "../../../../fixtures";
import { calculateAverage, clone, removeMongoIds } from "../../../../utils";
import {
  Observation,
  ObservationTarget
} from "../../../services/appStateService";

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

  public getProgramCompleteness = () => {
    const { programCompleteness } = this.state();
    return this.#round(programCompleteness);
  };

  public getTargetCompleteness = (targetId: string) => {
    const { completeness } = this.getTargetState(targetId);
    return this.#round(completeness[targetId] || 0);
  };

  #updateObservationState(update: Partial<Observation>) {
    this.#api.updateAppState("observation", update);
  }

  public reset = () => {
    this.#updateObservationState({
      currentTrial: undefined,
      stated: false,
      programCompleteness: 0,
      results: {},
      resultsData: {},
      isLoaded: false,
      targetStates: {},
      dateStarted: new Date()
    });
  };

  public async init(programId?: string) {
    this.reset();
    await this.#api.makeRequest({
      domain: Domains.Program,
      requestType: "get",
      payload: { id: programId }
    });

    const program = this.#api.getItem(Domains.Program, programId);
    this.#updateObservationState({
      isLoaded: true,
      program: program,
      results: {
        ...initialResultData,
        clientId: program?.clientId,
        programId: program?.id
      },
      currentTrial:
        program.chaining?.type === TrialChainingDirections.Backward
          ? program.targets?.length
          : 1,
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

    this.#api.updateAppState("observation", {
      targetStates: {
        ...targetStates,
        [targetId]: { ...targetStates[targetId], ...update }
      }
    });
  };

  public updateResultForTarget = (target: Target) => {
    const parsedResults = this.#parseResultsWithCompleteness(target);
    this.updateProgramResultData(parsedResults);
    this.updateCurrentTrialCompleteness();
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
      this.#updateObservationState({
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

    if (
      this.isDiscreteTrial() ||
      program?.chaining?.type === TrialChainingDirections.Total
    ) {
      return false;
    }
    return true;
  }

  public isBackwardChain = () => {
    const { program } = this.state();
    return program?.chaining?.type === TrialChainingDirections.Backward;
  };

  public isForwardChain = () => {
    const { program } = this.state();
    return program?.chaining?.type === TrialChainingDirections.Forward;
  };

  public updateCurrentTrialCompleteness = () => {
    if (!this.#shouldChain()) {
      return;
    }
    const { currentTrial, program } = this.state();
    const targetId = this.getTargetIdByIndex(currentTrial);
    if (!targetId) {
      return;
    }

    const { completeness, currentStep } = this.getTargetState(targetId);

    this.#processRegressions();

    const trials = program?.trials;
    if (currentStep !== trials) {
      return;
    }
    const current = completeness[targetId];

    const condition = this.isBackwardChain()
      ? currentTrial >= 1
      : currentTrial < trials;

    if (current === 100 && condition) {
      const updatedCurrentTrial = this.isBackwardChain()
        ? currentTrial - 1
        : currentTrial + 1;
      this.#api.updateAppState("observation", {
        currentTrial: updatedCurrentTrial
      });
    }
  };

  #processRegressions() {
    this.isBackwardChain()
      ? this.#processBackwardRegression()
      : this.#processForwardRegression();
  }

  #processForwardRegression() {
    const { currentTrial } = this.state();

    let prev = currentTrial - 1;

    while (prev > 0) {
      const targetId = this.getTargetIdByIndex(prev);
      const { completeness } = this.getTargetState(targetId || "");
      const currentCompleteness = completeness[targetId || ""];

      // Also need to delete results of seen ids
      if (currentCompleteness < 100) {
        this.#api.updateAppState("observation", {
          currentTrial: prev
        });
        this.#resetTargets(prev - 1);
        this.updateProgramCompleteness();
        break;
      }
      prev--;
    }
  }

  #processBackwardRegression() {
    const { currentTrial, program } = this.state();

    //3
    let prev = program?.trials || 1;
    while (prev > currentTrial) {
      const targetId = this.getTargetIdByIndex(prev);
      const { completeness } = this.getTargetState(targetId || "");
      const currentCompleteness = completeness[targetId || ""];

      // Also need to delete results of seen ids
      if (currentCompleteness < 100) {
        this.#api.updateAppState("observation", {
          currentTrial: prev
        });
        this.#resetTargets(prev - 1);
        this.updateProgramCompleteness();
        break;
      }
      prev--;
    }
  }

  #resetTargets(regressionIndex: number) {
    const { program } = this.state();
    program?.targets?.forEach((target, i) => {
      const condition = this.isBackwardChain()
        ? i < regressionIndex
        : i > regressionIndex;

      if (condition) {
        const targetId = target?.id || "";
        this.#resetTarget(targetId);
      }
    });
  }

  #resetTarget(targetId: string) {
    const { resultsData } = this.state();
    const { completeness } = this.getTargetState(targetId);

    const programResultDataUpdate = clone(resultsData);
    delete programResultDataUpdate[targetId];

    this.#api.updateAppState("observation", {
      resultsData: programResultDataUpdate
    });

    const update = clone(completeness);
    delete update[targetId];
    this.updateTargetState(targetId, {
      active: false,
      complete: false,
      currentStep: 1,
      completeness: update,
      results: {}
    });
  }

  public isTrialActiveForChain = (targetId: string) => {
    if (!this.#shouldChain()) {
      return true;
    }
    const { currentTrial, program } = this.state();
    const index = program?.targets?.map((t) => t?.id).indexOf(targetId);
    const trialStep = index || 0;

    if (this.isBackwardChain()) {
      return trialStep + 1 >= currentTrial;
    }
    // BACKWARD must do different logic here
    return trialStep + 1 <= currentTrial;
  };

  public submit = async () => {
    await this.#api.makeRequest({
      domain: Domains.Result,
      requestType: "create",
      payload: this.getResultsForCreation()
    });
  };

  public validProgramResults = () => {
    return this.#getValidTargets()?.every((target) => {
      const { complete } = this.getTargetState(target?.id || "");
      return complete;
    });
  };

  #getValidTargets() {
    const { program, currentTrial } = this.state();
    const targets = program?.targets;
    if (this.#shouldChain()) {
      if (this.isBackwardChain()) {
        return targets?.filter((_x, i) => i >= currentTrial - 1);
      }
      return targets?.filter((_x, i) => i <= currentTrial - 1);
    }
    return targets;
  }

  /**
   *
   * Returns the results in a format for the submission!
   */
  getResultsForCreation() {
    const date = this.getDateStarted();
    const { results, programCompleteness } = this.state();
    return removeMongoIds({
      ...results,
      data: this.#getResultData(),
      programCompleteness: programCompleteness,
      observerId: this.#api.Auth.getCurrentUser()?.id,
      created_at: date,
      updated_at: date
    });
  }

  getDateStarted = () => {
    const { dateStarted } = this.state();
    return dateStarted;
  };

  updateDateStarted = (dateStarted: Date) => {
    this.#updateObservationState({ dateStarted });
  };

  #round(n: number) {
    return Math.round(n * 100) / 100;
  }

  #parseResultsWithCompleteness = (target: Target) => {
    const { results, completeness } = this.getTargetState(target.id || "");
    const parsedResults = Object.entries(results).reduce(
      this.#createResult(target),
      {}
    );

    this.updateTargetState(target.id || "", {
      completeness: clone(completeness)
    });

    return parsedResults;
  };

  #createResult =
    (target: Target) =>
    (acc: IResultData, [key, value]: [string, TargetResult[]]) => {
      const { results, completeness } = this.getTargetState(target.id || "");

      const processedTarget = Array.isArray(target)
        ? target.find((target) => target.id === key)
        : target;

      const targetCompleteness = processedTarget
        ? this.#calculateCompleteness(processedTarget, value, completeness)
        : 0;

      acc[key] = {
        targetId: processedTarget?.id,
        targetCompleteness,
        targetResults: results[key]
      } as ResultData;

      return acc;
    };

  #calculateCompleteness = (
    target: Target,
    results: TargetResult[],
    completenessObj: ICompletenessState
  ) => {
    const max = results.length;
    const resultSum = results.filter((result) => !!result.completed).length;
    const completenessTotal = (resultSum / max) * 100;
    completenessObj[target.id as string] = completenessTotal;
    return completenessTotal;
  };
}
