import React from "react";
import {
  Field,
  Selector,
  Checkbox,
  Header,
  Container,
  Repeater,
  Button
} from "../components";
import {
  initialRuleData,
  initialOptionData,
  inputTypes,
  programValueTypes,
  stepsOptions,
  promptsByType
} from "../fixtures";
import ComponentsService from "../services/componentsService";
import { IProgram } from "../types";
import { generateKey } from "../utils";

type RuleFormProps = {
  localState: IProgram;
  readOnly?: boolean;
  updateState: (path: string, value: unknown) => void;
};

const RulesForm = ({
  localState,
  readOnly = false,
  updateState
}: RuleFormProps) => {
  const createOption = (ruleIndex: number) => (index: number) => {
    return (
      <ComponentsService.Container
        key={generateKey("option", index)}
        flexDirection="row"
      >
        <Field
          placeHolderText="Prompt Name"
          pathToState={`rules[${ruleIndex}].options[${index}].name`}
          value={localState.rules[ruleIndex].options[index].name}
          updateState={updateState}
          readOnly={readOnly}
        />
        <Field
          placeHolderText="Prompt Value"
          pathToState={`rules[${ruleIndex}].options[${index}].value`}
          value={localState.rules[ruleIndex].options[index].value.toString()}
          updateState={updateState}
          readOnly={readOnly}
        />
      </ComponentsService.Container>
    );
  };

  const createRule = (index: number) => {
    const generateOption = createOption(index);
    return (
      <Container key={generateKey("rule", index)}>
        <Field
          placeHolderText="Question"
          pathToState={`rules[${index}].question`}
          value={localState.rules[index].question}
          updateState={updateState}
          readOnly={readOnly}
        />
        <Field
          placeHolderText="Description"
          pathToState={`rules[${index}].description`}
          value={localState.rules[index].description}
          updateState={updateState}
          readOnly={readOnly}
        />
        <Selector
          title="Steps"
          pathToState={`rules[${index}].steps`}
          value={localState.rules[index].steps}
          options={stepsOptions}
          updateState={updateState}
          readOnly={readOnly}
        />
        <Checkbox
          title="Required"
          pathToState={`rules[${index}].required`}
          value={localState.rules[index].required}
          updateState={updateState}
          readOnly={readOnly}
        />
        <Selector
          title="Input Type"
          pathToState={`rules[${index}].inputType`}
          value={localState.rules[index].inputType}
          options={inputTypes}
          updateState={updateState}
          readOnly={readOnly}
        />
        <Selector
          title="Value Type"
          pathToState={`rules[${index}].valueType`}
          value={localState.rules[index].valueType}
          options={programValueTypes}
          updateState={updateState}
          readOnly={readOnly}
        />
        <Container flexDirection="row" hidden={readOnly}>
          <Header text="Pre-filled Prompts:" size="sm" />
          {Object.entries(promptsByType).map(([key, value]) => (
            <Button
              key={generateKey("pre-filled-prompt-button", key)}
              name={key}
              action={() => updateState(`rules[${index}].options`, value)}
            />
          ))}
        </Container>

        <Repeater
          title="Prompts"
          // TODO: Should these be renamed to prompts?
          items={localState.rules[index].options}
          pathToState={`rules[${index}].options`}
          updateState={updateState}
          generateRow={generateOption}
          initialData={initialOptionData}
          readOnly={readOnly}
        />
      </Container>
    );
  };
  return (
    <Repeater
      title="Rules"
      // TODO: Should these be renamed to prompts?
      items={localState.rules}
      pathToState={`rules`}
      updateState={updateState}
      generateRow={createRule}
      initialData={initialRuleData}
      readOnly={readOnly}
    />
  );
};

export default RulesForm;
