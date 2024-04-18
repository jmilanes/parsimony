import {
  BehaviorType,
  CollectionCategories,
  DiscreteTrial,
  Domains,
  FrequencyBehaviorType,
  IntervalBehaviorType,
  ProgramViewTypes,
  TaskAnalysis,
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
    createProgramPayload<TaskAnalysis>(TaskAnalysis, {
      collectionId: COLLECTION_UUID,
      title: "Forward Program 1",
      viewType: ProgramViewTypes.TaskAnalysis,
      lastEditedBy: USER_UUID,
      editedBy: [USER_UUID],
      createdBy: USER_UUID,
      chaining: {
        type: TrialChainingDirections.Forward,
        targetCompleteness: 100
      }
    }),
    createProgramPayload<TaskAnalysis>(TaskAnalysis, {
      collectionId: COLLECTION_UUID,
      title: "Backward Program 1",
      viewType: ProgramViewTypes.TaskAnalysis,
      lastEditedBy: USER_UUID,
      editedBy: [USER_UUID],
      createdBy: USER_UUID,
      chaining: {
        type: TrialChainingDirections.Backward,
        targetCompleteness: 100
      }
    }),
    createProgramPayload<TaskAnalysis>(TaskAnalysis, {
      collectionId: COLLECTION_UUID,
      title: "Total Program 1",
      viewType: ProgramViewTypes.TaskAnalysis,
      lastEditedBy: USER_UUID,
      editedBy: [USER_UUID],
      createdBy: USER_UUID,
      chaining: {
        type: TrialChainingDirections.Total,
        targetCompleteness: 100
      }
    }),
    createProgramPayload<DiscreteTrial>(DiscreteTrial, {
      collectionId: COLLECTION_UUID,
      title: "Discrete Trial Program 1",
      viewType: ProgramViewTypes.DiscreteTrials,
      lastEditedBy: USER_UUID,
      editedBy: [USER_UUID],
      createdBy: USER_UUID
    }),
    createProgramPayload<IntervalBehaviorType>(IntervalBehaviorType, {
      collectionId: COLLECTION_UUID,
      title: "Behavior Interval 1",
      lastEditedBy: USER_UUID,
      editedBy: [USER_UUID],
      createdBy: USER_UUID,
      viewType: ProgramViewTypes.IntervalBehavior,
      operationalDefinition: "operationalDefinition",
      precursorBehaviors: "precursorBehaviors",
      proactiveStrategies: "proactiveStrategies",
      reactiveStrategies: "reactiveStrategies"
    }),
    createProgramPayload<FrequencyBehaviorType>(FrequencyBehaviorType, {
      collectionId: COLLECTION_UUID,
      title: "Behavior Frequency 1",
      lastEditedBy: USER_UUID,
      editedBy: [USER_UUID],
      createdBy: USER_UUID,
      viewType: ProgramViewTypes.FrequencyBehavior,
      operationalDefinition: "operationalDefinition",
      precursorBehaviors: "precursorBehaviors",
      proactiveStrategies: "proactiveStrategies",
      reactiveStrategies: "reactiveStrategies"
    }),
    createProgramPayload<IntervalBehaviorType>(IntervalBehaviorType, {
      collectionId: COLLECTION_UUID,
      title: "Behavior Duration 1",
      lastEditedBy: USER_UUID,
      editedBy: [USER_UUID],
      createdBy: USER_UUID,
      viewType: ProgramViewTypes.IntervalBehavior,
      operationalDefinition: "operationalDefinition",
      precursorBehaviors: "precursorBehaviors",
      proactiveStrategies: "proactiveStrategies",
      reactiveStrategies: "reactiveStrategies"
    })
  ]
};
