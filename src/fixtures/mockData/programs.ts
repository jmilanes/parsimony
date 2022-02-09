import { IProgram } from "../../types";
import {
  InputTypes,
  ProgramValueTypes,
  UserRoles,
  ProgramTypes
} from "../../enums";

export const mockProgramData: IProgram[] = [
  {
    id: "",
    dateCreated: new Date(),
    dateEdited: new Date(),
    title: "Program 1",
    clientId: undefined,
    writeAccess: [UserRoles.Director],
    readAccess: [UserRoles.Director],
    type: ProgramTypes.Main,
    lastEditedBy: "User_01",
    editedBy: ["User_01"],
    createdBy: "User_01",
    rules: [
      {
        id: "rule-1",
        question: "Is client Brushing teeth",
        description: "Watch clients behaivor around brushing teeth",
        steps: 3,
        options: [
          { name: "Great", value: 3 },
          { name: "Good", value: 2 },
          { name: "Poor", value: 3 }
        ],
        required: true,
        inputType: InputTypes.radio,
        valueType: ProgramValueTypes.number
      }
    ],
    results: [
      {
        dateCreated: new Date(),
        data: [
          {
            "rule-1": [{ step: 1, value: 1 }],
            "rule-2": [{ step: 1, value: 1 }]
          }
        ]
      }
    ]
  }
];
