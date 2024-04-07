import { MigrateDataProps } from "../migrateData";
import { BehaviorType, Program, ProgramViewTypes } from "@parsimony/types";

export const updateActive = {
  collection: "programs",
  updateOp: [
    {
      $set: {
        active: {
          $ifNull: ["$behavior.active", true]
        }
      }
    }
  ]
};

export const resultInResults = {
  collection: "results",
  updateOp: [
    {
      $set: {
        result: {
          $ifNull: ["$behaviorData.result", "$programCompleteness"]
        },
        type: {
          $ifNull: ["$behaviorData.type", "TRIAL"]
        }
      }
    }
  ]
};

const putBackMainPrograms = {
  collection: "programs",
  upDateOp: [
    {
      $set: {
        type: {
          $cond: {
            if: {
              $eq: ["$clientId", null]
            },
            then: "MAIN",
            else: "CLIENT"
          }
        }
      }
    }
  ]
};

const programViewUpdate = (program: Program) => {
  let view: any = {
    title: program.title,
    description: program.description
  };

  if (program.targetStyle === ProgramViewTypes.TaskAnalysis) {
    view.type = ProgramViewTypes.TaskAnalysis;
    view.trials = program.trials;
    view.targets = program.targets;
    view.targetOptions = program.targetOptions;
    view.chaining = program.chaining;
  }

  if (program.targetStyle === ProgramViewTypes.DiscreteTrials) {
    view.type = ProgramViewTypes.DiscreteTrials;
    view.trials = program.trials;
    view.targets = program.targets;
    view.targetOptions = program.targetOptions;
  }

  if (program.targetStyle === "BEHAVIOR") {
    if (program?.behavior?.type === BehaviorType.Duration) {
      view.type = ProgramViewTypes.DurationBehavior;
    }
    if (program?.behavior?.type === BehaviorType.Frequency) {
      view.type = ProgramViewTypes.FrequencyBehavior;
    }
    if (program?.behavior?.type === BehaviorType.Interval) {
      view.type = ProgramViewTypes.IntervalBehavior;
      view.alertTime = program.behavior.alertTime || 0;
    }
  }

  return { ...program, view };
};

export const programViewTypeMigration: MigrateDataProps = {
  collection: "programs",
  updateEachFn: programViewUpdate
};
