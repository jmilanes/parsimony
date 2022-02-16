import React from "react";
import { IColumns, ITableAction } from "../components/table";
import { AddForm } from "../containers";
import { Pages } from "../enums";
import {
  initialProgramData,
  initialRuleData,
  initialOptionData,
  programTypes,
  inputTypes,
  programValueTypes,
  stepsOptions,
  userRoleOptions
} from "../fixtures";
import ComponentsService from "../services/componentsService";
import { programData, StateManger } from "../services/dataAccessServices";
import { IProgram } from "../types";
import { createList, generateKey, getLength, navigateToRoute } from "../utils";
// NEXT Duplicate what you do with users and figure out how you are gonna do the programs
// Add users
const Programs = () => {
  const navigate = navigateToRoute();
  const data = programData.getAll();

  const [showAddForm, setShowAddForm] = React.useState(false);
  const [localState, updateLocalState] =
    React.useState<IProgram>(initialProgramData);

  const updateState = StateManger.updateLocalState({
    localState,
    updateLocalState
  });

  console.log(localState);

  const submitAddForm = () => {
    programData.create(localState);
    setShowAddForm(false);
    updateLocalState(initialProgramData);
  };

  const columns: IColumns[] = [
    { propertyKey: "title" },
    { propertyKey: "clientId" },
    { propertyKey: "type" },
    { propertyKey: "description" },
    { propertyKey: "writeAccess", displayFn: createList },
    { propertyKey: "readAccess", displayFn: createList },
    { propertyKey: "createBy" },
    { propertyKey: "rules", displayFn: getLength }
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
      <ComponentsService.Container key={generateKey("option", index)}>
        {ComponentsService.Field({
          placeHolderText: "Option Name",
          pathToState: `rules[${ruleIndex}].options[${index}].name`,
          value: localState.rules[ruleIndex].options[index].name,
          updateState
        })}
        {ComponentsService.Field({
          placeHolderText: "Option Value",
          pathToState: `rules[${ruleIndex}].options[${index}].value`,
          value: localState.rules[ruleIndex].options[index].value.toString(),
          updateState
        })}
      </ComponentsService.Container>
    );
  };

  const createRule = (index: number) => {
    const generateOption = createOption(index);
    return (
      <ComponentsService.Container key={generateKey("rule", index)}>
        {ComponentsService.Field({
          placeHolderText: "Question",
          pathToState: `rules[${index}].question`,
          value: localState.rules[index].question,
          updateState
        })}
        {ComponentsService.Field({
          placeHolderText: "Description",
          pathToState: `rules[${index}].description`,
          value: localState.rules[index].description,
          updateState
        })}
        {ComponentsService.Selector({
          title: "Steps",
          pathToState: `rules[${index}].steps`,
          value: localState.rules[index].steps,
          options: stepsOptions,
          updateState
        })}
        {ComponentsService.Checkbox({
          title: "Required",
          pathToState: `rules[${index}].required`,
          value: localState.rules[index].required,
          updateState
        })}
        {ComponentsService.Selector({
          title: "Input Type",
          value: localState.rules[index].inputType,
          pathToState: `rules[${index}].inputType`,
          options: inputTypes,
          updateState
        })}
        {ComponentsService.Selector({
          title: "Input Type",
          pathToState: `rules[${index}].valueType`,
          value: localState.rules[index].valueType,
          options: programValueTypes,
          updateState
        })}
        {ComponentsService.Repeater({
          title: "Options",
          items: localState.rules[index].options,
          pathToState: `rules[${index}].options`,
          updateState,
          generateRow: generateOption,
          initialData: initialOptionData
        })}
      </ComponentsService.Container>
    );
  };
  return (
    <>
      <ComponentsService.Header text={Pages.Programs} size="lg" />
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
      {ComponentsService.Table<IProgram>({ data, columns, actions })}
      <AddForm showForm={showAddForm} action={submitAddForm} title="Add Users">
        {ComponentsService.Field({
          placeHolderText: "Title",
          pathToState: "title",
          value: localState.title,
          updateState
        })}
        {ComponentsService.Field({
          placeHolderText: "Description",
          pathToState: "description",
          value: localState.description,
          updateState
        })}
        {ComponentsService.Selector({
          title: "Type",
          pathToState: "type",
          value: localState.type,
          options: programTypes,
          updateState
        })}
        {/* {ComponentsService.MultiSelect({
          title: "Read Access",
          pathToState: "readAccess",
          options: userRoleOptions,
          values: localState.readAccess,
          updateState
        })} */}
        {ComponentsService.MultiSelect({
          title: "Write Access",
          pathToState: "writeAccess",
          options: userRoleOptions,
          values: localState.writeAccess,
          updateState
        })}
        {ComponentsService.Repeater({
          title: "Rules",
          items: localState.rules,
          pathToState: "rules",
          updateState,
          generateRow: createRule,
          initialData: initialRuleData
        })}
      </AddForm>
    </>
  );
};

export default Programs;
