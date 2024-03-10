import {
  BehaviorType,
  CollectionCategories,
  Domains,
  Program,
  ProgramTypes,
  TargetStyle,
  UserRoles
} from "@parsimony/types/dist";
import {
  creatCollectionPayload,
  createProgramPayload,
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
    createProgramPayload({
      collectionId: COLLECTION_UUID,
      title: "Behavior Interval 1",
      description: "Behavior Description",
      lastEditedBy: USER_UUID,
      editedBy: [USER_UUID],
      createdBy: USER_UUID,
      chaining: {},
      targetStyle: TargetStyle.Behavior,
      behavior: {
        type: BehaviorType.Frequency,
        active: true,
        alertTime: 0,
        operationalDefinition: "operationalDefinition",
        precursorBehaviors: "precursorBehaviors",
        proactiveStrategies: "proactiveStrategies",
        reactiveStrategies: "reactiveStrategies"
      }
    }),
    createProgramPayload({
      collectionId: COLLECTION_UUID,
      clientId: USER_UUID,
      title: "Behavior Interval 1",
      description: "Behavior Description",
      lastEditedBy: USER_UUID,
      editedBy: [USER_UUID],
      createdBy: USER_UUID,
      type: ProgramTypes.Client,
      chaining: {},
      targetStyle: TargetStyle.Behavior,
      behavior: {
        type: BehaviorType.Frequency,
        active: true,
        alertTime: 0,
        operationalDefinition: "operationalDefinition",
        precursorBehaviors: "precursorBehaviors",
        proactiveStrategies: "proactiveStrategies",
        reactiveStrategies: "reactiveStrategies"
      }
    })
  ]
});

const createInitialBehaviorResultData = (type: BehaviorType) => {
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
          result: 1,
          type
        }
      })
    ]
  };
};

export const frequencyBehaviorResultsFixture = createInitialBehaviorResultData(
  BehaviorType.Frequency
);
export const durationBehaviorResultsFixture = createInitialBehaviorResultData(
  BehaviorType.Duration
);
export const intervalBehaviorResultsFixture = createInitialBehaviorResultData(
  BehaviorType.Interval
);
