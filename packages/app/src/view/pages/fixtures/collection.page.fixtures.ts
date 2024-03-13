import {
  BehaviorType,
  CollectionCategories,
  Domains,
  TargetStyle,
  TrialChainingDirections
} from "@parsimony/types";
import {
  creatCollectionPayload,
  createProgramPayload,
  createUserPayload
} from "../../../testUtils/dataCreation";
import { createTargetUuidKey } from "../../../testUtils/mockDBService";

const USER_UUID = createTargetUuidKey(Domains.User, 0);
const COLLECTION_UUID = createTargetUuidKey(Domains.Collection, 1);

export const initialCollectionPageData = {
  [Domains.User]: [createUserPayload()],
  [Domains.Collection]: [
    creatCollectionPayload(),
    creatCollectionPayload({
      category: CollectionCategories.Sub,
      ancestors: [createTargetUuidKey(Domains.Collection, 0)],
      parentCollectionId: createTargetUuidKey(Domains.Collection, 0)
    }),
    creatCollectionPayload({
      title: "Sub Collection 1",
      category: CollectionCategories.Sub,
      ancestors: [createTargetUuidKey(Domains.Collection, 0), COLLECTION_UUID],
      parentCollectionId: COLLECTION_UUID
    })
  ],
  [Domains.Program]: [
    createProgramPayload({
      collectionId: COLLECTION_UUID,
      title: "Forward Program 1",
      targetStyle: TargetStyle.TaskAnalysis,
      lastEditedBy: USER_UUID,
      editedBy: [USER_UUID],
      createdBy: USER_UUID,
      chaining: {
        type: TrialChainingDirections.Forward,
        targetCompleteness: 100
      }
    }),
    createProgramPayload({
      collectionId: COLLECTION_UUID,
      title: "Backward Program 1",
      targetStyle: TargetStyle.TaskAnalysis,
      lastEditedBy: USER_UUID,
      editedBy: [USER_UUID],
      createdBy: USER_UUID,
      chaining: {
        type: TrialChainingDirections.Backward,
        targetCompleteness: 100
      }
    }),
    createProgramPayload({
      collectionId: COLLECTION_UUID,
      title: "Total Program 1",
      targetStyle: TargetStyle.TaskAnalysis,
      lastEditedBy: USER_UUID,
      editedBy: [USER_UUID],
      createdBy: USER_UUID,
      chaining: {
        type: TrialChainingDirections.Total,
        targetCompleteness: 100
      }
    }),
    createProgramPayload({
      collectionId: COLLECTION_UUID,
      title: "Discrete Trial Program 1",
      targetStyle: TargetStyle.DiscreteTrials,
      lastEditedBy: USER_UUID,
      editedBy: [USER_UUID],
      createdBy: USER_UUID,
      chaining: {}
    }),
    createProgramPayload({
      collectionId: COLLECTION_UUID,
      title: "Behavior Interval 1",
      lastEditedBy: USER_UUID,
      editedBy: [USER_UUID],
      createdBy: USER_UUID,
      chaining: {},
      targetStyle: TargetStyle.Behavior,
      behavior: {
        type: BehaviorType.Interval,
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
      title: "Behavior Frequency 1",
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
      title: "Behavior Duration 1",
      lastEditedBy: USER_UUID,
      editedBy: [USER_UUID],
      createdBy: USER_UUID,
      chaining: {},
      targetStyle: TargetStyle.Behavior,
      behavior: {
        type: BehaviorType.Duration,
        active: true,
        alertTime: 0,
        operationalDefinition: "operationalDefinition",
        precursorBehaviors: "precursorBehaviors",
        proactiveStrategies: "proactiveStrategies",
        reactiveStrategies: "reactiveStrategies"
      }
    })
  ]
};
