import {
  BehaviorType,
  Chaining,
  CollectionCategories,
  Domains,
  Program,
  TargetStyle,
  TrialChainingDirections,
  UserRoles
} from "@parsimony/types";
import {
  creatCollectionPayload,
  createBasicProgramPayload,
  createResultPayload,
  createUserPayload
} from "../../../testUtils/dataCreation";
import { createTargetUuidKey } from "../../../testUtils/mockDBService";

const USER_UUID = createTargetUuidKey(Domains.User, 0);
const COLLECTION_UUID = createTargetUuidKey(Domains.Collection, 1);

export const createInitialResultFixture = (program: Partial<Program>) => ({
  [Domains.User]: [
    createUserPayload({ type: UserRoles.Client, roles: [UserRoles.Client] })
  ],
  [Domains.Collection]: [
    creatCollectionPayload(),
    creatCollectionPayload({
      category: CollectionCategories.Sub,
      ancestors: [createTargetUuidKey(Domains.Collection, 0)],
      parentCollectionId: createTargetUuidKey(Domains.Collection, 0)
    })
  ],
  [Domains.Program]: [
    createBasicProgramPayload(program),
    createBasicProgramPayload({
      ...program,
      clientId: USER_UUID
    })
  ]
});

const createInitialBehaviorResultData = (
  type: BehaviorType,
  result: number
) => {
  return {
    ...createInitialResultFixture({
      collectionId: COLLECTION_UUID,
      title: "Behavior Interval 1",
      description: "Behavior Description",
      lastEditedBy: USER_UUID,
      editedBy: [USER_UUID],
      createdBy: USER_UUID,
      chaining: {},
      targetStyle: TargetStyle.Behavior,
      behavior: {
        type,
        active: true,
        alertTime: 0
      }
    }),
    [Domains.Result]: [
      createResultPayload({
        clientId: USER_UUID,
        programId: createTargetUuidKey(Domains.Program, 1),
        behaviorData: {
          result,
          type
        }
      })
    ]
  };
};

export const frequencyBehaviorResultsFixture = createInitialBehaviorResultData(
  BehaviorType.Frequency,
  1
);
export const durationBehaviorResultsFixture = createInitialBehaviorResultData(
  BehaviorType.Duration,
  1000
);
export const intervalBehaviorResultsFixture = createInitialBehaviorResultData(
  BehaviorType.Interval,
  50
);

const createInitialProgramResultData = (
  targetStyle: TargetStyle,
  chaining: Chaining = {}
) => {
  return {
    ...createInitialResultFixture({
      collectionId: COLLECTION_UUID,
      title: "Program Interval 1",
      description: "Program Description",
      lastEditedBy: USER_UUID,
      editedBy: [USER_UUID],
      createdBy: USER_UUID,
      chaining,
      targetStyle
    }),
    [Domains.Result]: [
      createResultPayload({
        programId: createTargetUuidKey(Domains.Program, 1),
        clientId: USER_UUID,
        programCompleteness: 75,
        data: [
          {
            targetCompleteness: 50,
            targetResults: [
              {
                trial: 1,
                completed: false,
                option: {
                  name: "Full verbal model"
                }
              },
              {
                trial: 2,
                completed: false,
                option: {
                  name: "Full verbal model"
                }
              },
              {
                trial: 3,
                completed: true,
                option: {
                  name: "phonetic"
                }
              }
            ]
          },
          {
            targetCompleteness: 100,
            targetResults: [
              {
                trial: 1,
                completed: true,
                option: {
                  name: "Initial sound cue"
                }
              },
              {
                trial: 2,
                completed: false,
                option: {
                  name: "Full verbal model"
                }
              },
              {
                trial: 3,
                completed: true,
                option: {
                  name: "phonetic"
                }
              }
            ]
          }
        ],
        result: 75,
        notes: "",
        updated_at: "2023-08-15T03:13:24.286Z",
        created_at: "2023-08-15T03:13:24.286Z"
      })
    ]
  };
};

export const discreteTrialResultInitialFixture = createInitialProgramResultData(
  TargetStyle.DiscreteTrials,
  { type: TrialChainingDirections.Total, targetCompleteness: 100 }
);

export const discreteTrialForwardChainResultInitialFixture =
  createInitialProgramResultData(TargetStyle.DiscreteTrials, {
    type: TrialChainingDirections.Forward,
    targetCompleteness: 100
  });

export const discreteTrialBackwardChainResultInitialFixture =
  createInitialProgramResultData(TargetStyle.DiscreteTrials, {
    type: TrialChainingDirections.Backward,
    targetCompleteness: 100
  });

export const taskAnalysisResultInitialFixture = createInitialProgramResultData(
  TargetStyle.TaskAnalysis
);
