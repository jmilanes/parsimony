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
