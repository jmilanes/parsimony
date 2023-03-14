import { IResultData, Program, ResultData } from "@parsimony/types";
import { initialResultData } from "../fixtures";
import { calculateAverage, omitMongoKeys, removeMongoIds } from "../utils";

export default class ObservationService {
  program?: Program;
  programCompleteness: Number;
  results: Record<string, any>;
  resultsData: Record<string, any>;
  isLoaded: boolean;
  // Passed in from state service
  updateState: () => void;

  constructor() {
    this.programCompleteness = 0;
    this.results = {};
    this.resultsData = {};
    this.isLoaded = false;
    this.updateState = () => {};
  }

  init(program: Program, updateState: () => void) {
    this.isLoaded = true;
    this.program = program;
    this.results = {
      ...initialResultData,
      clientId: program?.clientId,
      programId: program?.id
    };
    this.updateState = updateState;
    this.updateState();
  }

  onChange() {
    // Update Result data
    this.updateProgramCompleteness();
    this.updateState();
  }

  /**
   *
   * Returns the results in a format for the submission
   */
  getResultsForCreation() {
    return removeMongoIds(
      omitMongoKeys({
        ...this.results,
        data: this._resultDataValues(),
        programCompleteness: this.programCompleteness
      })
    );
  }

  /**
   *
   * Update the program's average completeness
   */
  updateProgramCompleteness() {
    const averageCompleteness = calculateAverage(
      this._resultDataValues(),
      "targetCompleteness"
    );

    this.programCompleteness = averageCompleteness || 0;
  }

  _resultDataValues() {
    return Object.values(this.resultsData);
  }

  /**
   *
   * Update the the result data right now passing in most reset result data
   */
  updatedResultsData = (latestResult: IResultData) => {
    // latest result is an object of the latest result data keys are the target ID
    // This is so that a group of target results can be passed through as an object
    const latestsResults = Object.values(latestResult);

    latestsResults.forEach((latestResult: ResultData) => {
      this.resultsData[latestResult?.targetId as string] = latestResult;
    });

    this.onChange();
  };
}
