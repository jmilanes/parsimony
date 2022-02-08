import React from "react";
import { IColumns, ITableAction } from "../components/table";
import { AddForm } from "../containers";
import { ProgamTypes } from "../enums";
import {
  initalProgramData,
  intialRuleData,
  initalOptionData
} from "../initialData";
import ComponentsService from "../services/componentsService";
import { programData, StateManger } from "../services/dataAccessServices";
import { IProgram } from "../types";
import { generateKey, navigateToRoute } from "../utils";
// NEXT Duplicate what you do with users and figure out how you are gonna do the programms
// Add users
const Programs = () => {
  const navigate = navigateToRoute();
  const data = programData.getAll();

  const [showAddForm, setShowAddForm] = React.useState(false);
  const [localState, updateLocalState] = React.useState<IProgram>(
    initalProgramData
  );

  const updateState = StateManger.updateLocalState({
    localState,
    updateLocalState
  });

  console.log(localState);

  const submitAddForm = () => {
    programData.create(localState);
    setShowAddForm(false);
    updateLocalState(initalProgramData);
  };

  const columns: IColumns[] = [
    { propertyKey: "title" },
    { propertyKey: "clientId" },
    { propertyKey: "type" },
    { propertyKey: "rules", displayFn: (arr: any[]) => arr?.length }
  ];
  const actions: ITableAction[] = [
    {
      name: "View",
      method: (program: IProgram) => navigate(`/programs/${program.id}`)
    },
    {
      name: "Delete",
      method: (program: Required<IProgram>) => programData.delete(program.id)
    }
  ];

  const createOption = (ruleIndex: number) => (index: number) => {
    return (
      <>
        {ComponentsService.Field({
          key: generateKey("option-name", index),
          placeHolderText: "Option Name",
          pathToState: `rules[${ruleIndex}].options[${index}].name`,
          value: localState.rules[ruleIndex].options[index].name,
          updateState
        })}
        {ComponentsService.Field({
          key: generateKey("option-value", index),
          placeHolderText: "Option Value",
          pathToState: `rules[${ruleIndex}].options[${index}].value`,
          value: localState.rules[ruleIndex].options[index].value,
          updateState
        })}
      </>
    );
  };

  const createRule = (index: number) => {
    const generateOtpion = createOption(index);
    return (
      <>
        {ComponentsService.Field({
          key: generateKey("rule", index),
          placeHolderText: "Question",
          pathToState: `rules[${index}].question`,
          value: localState.rules[index].question,
          updateState
        })}
        {ComponentsService.Repeater({
          title: "Options",
          items: localState.rules[index].options,
          pathToState: `rules[${index}].options`,
          updateState,
          generateRow: generateOtpion,
          initialData: initalOptionData
        })}
      </>
    );
  };
  return (
    <>
      <h1>Programs</h1>
      {ComponentsService.Button({
        name: "Add",
        action: () => setShowAddForm(true),
        hidden: showAddForm
      })}
      {ComponentsService.Button({
        name: "Cancel",
        action: () => setShowAddForm(false),
        hidden: !showAddForm
      })}
      {ComponentsService.Table({ data, columns, actions })}
      <AddForm showForm={showAddForm} action={submitAddForm} title="Add Users">
        {ComponentsService.Field({
          placeHolderText: "Title",
          pathToState: "title",
          value: localState.title,
          updateState
        })}

        {ComponentsService.Selector({
          placeHolderText: "Title",
          pathToState: "type",
          value: localState.type,
          options: [
            { name: ProgamTypes.Main, value: ProgamTypes.Main },
            { name: ProgamTypes.Client, value: ProgamTypes.Client }
          ],
          updateState
        })}

        {ComponentsService.Repeater({
          title: "Rules",
          items: localState.rules,
          pathToState: "rules",
          updateState,
          generateRow: createRule,
          initialData: intialRuleData
        })}

        {/* Need to come up with how adding the rules ui might work */}
        {/* button to add rule which will push an empty rule to the array  */}
        {/* for each rule pushed we need rule edit container that has all the fields  */}
      </AddForm>
    </>
  );
};

export default Programs;
