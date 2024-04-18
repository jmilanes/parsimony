import {
  CollectionCategories,
  DiscreteTrial,
  Domains,
  DurationBehaviorType,
  FrequencyBehaviorType,
  IntervalBehaviorType,
  Program,
  ResultType,
  TaskAnalysis,
  TrialChainingDirections,
  UserRoles
} from "@parsimony/types";
import {
  creatCollectionPayload,
  createProgramPayload,
  createResultPayload,
  createUserPayload
} from "../../../testUtils/dataCreation";
import { createTargetUuidKey } from "../../../testUtils/mockDBService";
import { DeepPartial } from "chart.js/types/utils";

const USER_UUID = createTargetUuidKey(Domains.User, 0);
const COLLECTION_UUID = createTargetUuidKey(Domains.Collection, 1);

export const createInitialResultFixture = <T extends Program>(
  definition: any,
  program: DeepPartial<T>
) => ({
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
    createProgramPayload<T>(definition, program),
    createProgramPayload<T>(definition, {
      ...program,
      clientId: USER_UUID
    })
  ]
});

const createInitialBehaviorResultData = <T extends Program>(
  definition: any,
  resultType: ResultType,
  result: number
) => {
  return {
    ...createInitialResultFixture<T>(definition, {
      collectionId: COLLECTION_UUID,
      title: "Behavior Interval 1",
      description: "Behavior Description",
      lastEditedBy: USER_UUID,
      editedBy: [USER_UUID],
      createdBy: USER_UUID
    } as DeepPartial<T>),
    [Domains.Result]: [
      createResultPayload({
        clientId: USER_UUID,
        programId: createTargetUuidKey(Domains.Program, 1),
        result,
        type: resultType
      })
    ]
  };
};

export const frequencyBehaviorResultsFixture =
  createInitialBehaviorResultData<FrequencyBehaviorType>(
    FrequencyBehaviorType,
    ResultType.Frequency,
    1
  );
export const durationBehaviorResultsFixture =
  createInitialBehaviorResultData<DurationBehaviorType>(
    DurationBehaviorType,
    ResultType.Duration,
    1000
  );
export const intervalBehaviorResultsFixture =
  createInitialBehaviorResultData<IntervalBehaviorType>(
    IntervalBehaviorType,
    ResultType.Interval,
    50
  );

const createInitialProgramResultData = <T extends Program>(
  definition: any,
  overrides: DeepPartial<T>
) => {
  return {
    ...createInitialResultFixture<T>(definition, {
      collectionId: COLLECTION_UUID,
      title: "Program Interval 1",
      description: "Program Description",
      lastEditedBy: USER_UUID,
      editedBy: [USER_UUID],
      createdBy: USER_UUID,
      ...overrides
    } as DeepPartial<T>),
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
        updated_at: new Date(),
        created_at: new Date()
      })
    ]
  };
};

export const discreteTrialResultInitialFixture =
  createInitialProgramResultData<TaskAnalysis>(TaskAnalysis, {
    chaining: { type: TrialChainingDirections.Total, targetCompleteness: 100 }
  });

export const discreteTrialForwardChainResultInitialFixture =
  createInitialProgramResultData<TaskAnalysis>(TaskAnalysis, {
    chaining: {
      type: TrialChainingDirections.Forward,
      targetCompleteness: 100
    }
  });

export const discreteTrialBackwardChainResultInitialFixture =
  createInitialProgramResultData<TaskAnalysis>(TaskAnalysis, {
    chaining: {
      type: TrialChainingDirections.Backward,
      targetCompleteness: 100
    }
  });

export const taskAnalysisResultInitialFixture =
  createInitialProgramResultData<DiscreteTrial>(DiscreteTrial, {});
