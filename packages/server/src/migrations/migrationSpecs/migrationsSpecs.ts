import { Description, Optional } from "@tsed/schema";

export const updateActive = {
  collection: "programs",
  updateManyOps: [
    {
      $set: {
        active: {
          $cond: {
            if: {
              $eq: ["$behavior.active", null]
            },
            then: true,
            else: "$behavior.active"
          }
        }
      }
    }
  ]
};

export const resultInResults = {
  collection: "results",
  updateManyOps: [
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

export const updateProgramViewType = {
  collection: "programs",
  updateManyOps: [
    {
      $set: {
        viewType: {
          $cond: {
            if: {
              $eq: ["$targetStyle", "BEHAVIOR"]
            },
            then: "$behavior.type",
            else: "$targetStyle"
          }
        }
      }
    }
  ]
};

export const updateBehaviorDetails = {
  collection: "programs",
  updateManyOps: [
    {
      $set: {
        alertTime: {
          $cond: {
            if: {
              $gte: ["$behavior.alertTime", 1]
            },
            then: "$behavior.alertTime"
          }
        }
      }
    }
  ]
};

export const updateBehaviorDescDetails = {
  collection: "programs",
  updateManyOps: [
    {
      $set: {
        operationalDefinition: "$behavior.operationalDefinition",
        precursorBehaviors: "$behavior.precursorBehaviors",
        proactiveStrategies: "$behavior.proactiveStrategies",
        reactiveStrategies: "$behavior.reactiveStrategies"
      }
    }
  ]
};

const fullProductionMigration = [
  updateProgramViewType,
  updateBehaviorDetails,
  updateBehaviorDescDetails
];
