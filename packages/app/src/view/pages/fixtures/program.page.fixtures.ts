import {
  BehaviorType,
  CollectionCategories,
  Domains,
  InputTypes,
  IntervalBehaviorType,
  ProgramCategories,
  ProgramTypes,
  ProgramValueTypes,
  ProgramViewTypes,
  TaskAnalysis
} from "@parsimony/types";
import {
  creatCollectionPayload,
  createProgramPayload,
  createUserPayload
} from "../../../testUtils/dataCreation";
import { createTargetUuidKey } from "../../../testUtils/mockDBService";

const USER_UUID = createTargetUuidKey(Domains.User, 0);
const COLLECTION_UUID = createTargetUuidKey(Domains.Collection, 1);

export const initialProgramPageData = {
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
      title: "Test Program",
      viewType: ProgramViewTypes.TaskAnalysis,
      lastEditedBy: USER_UUID,
      editedBy: [USER_UUID],
      createdBy: USER_UUID,
      targets: [
        {
          title: "Target 1 Title",
          description: "<p>Target 1 Description</p>",
          required: true,
          inputType: InputTypes.Radio,
          valueType: ProgramValueTypes.Number,
          currentMasterCount: 0,
          mastered: false
        },
        {
          title: "Target 2 Title ",
          description: "<p>Target 2 Description</p>",
          required: true,
          inputType: InputTypes.Radio,
          valueType: ProgramValueTypes.Number,
          currentMasterCount: 0,
          mastered: false
        }
      ],
      mastered: false,
      description: "<p>This is a Test Program</p>",
      materials: "<p>None</p>",
      type: ProgramTypes.Template,
      trials: 3,
      category: ProgramCategories.Aba,
      targetOptions: [
        {
          name: "Full Physical",
          target: true
        },
        {
          name: "Partial physical",
          target: false
        },
        {
          name: "Light physical",
          target: false
        },
        {
          name: "Gesture",
          target: false
        },
        {
          name: "Independent",
          target: false
        }
      ],
      masteryTarget: 100,
      masteryConsecutiveTargets: 3,
      subscribers: [USER_UUID],
      collectionId: COLLECTION_UUID
    }),
    createProgramPayload<IntervalBehaviorType>(IntervalBehaviorType, {
      collectionId: COLLECTION_UUID,
      title: "Behavior Interval 1",
      description: "Behavior Description",
      lastEditedBy: USER_UUID,
      editedBy: [USER_UUID],
      createdBy: USER_UUID,
      viewType: ProgramViewTypes.Behavior,
      alertTime: 0,
      operationalDefinition: "operationalDefinition",
      precursorBehaviors: "precursorBehaviors",
      proactiveStrategies: "proactiveStrategies",
      reactiveStrategies: "reactiveStrategies"
    })
  ]
};
