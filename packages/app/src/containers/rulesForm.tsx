import React from "react";
import {
  Field,
  Selector,
  Checkbox,
  Header,
  Repeater,
  Button,
  Row,
  Col
} from "../components";
import {
  initialRuleData,
  initialOptionData,
  inputTypes,
  programValueTypes,
  stepsOptions,
  promptsByType
} from "../fixtures";

import { IProgram } from "@parsimony/types";
import { generateKey, uuid } from "../utils";
import "./styles.css";

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
  const option = (ruleIndex: number) => (index: number) => {
    return (
      <Col span={24} key={generateKey("option", index)}>
        <Row gutter={8}>
          <Col span={12}>
            <Field
              placeHolderText="Prompt Name"
              pathToState={`rules[${ruleIndex}].options[${index}].name`}
              value={localState.rules[ruleIndex].options[index].name}
              updateState={updateState}
              readOnly={readOnly}
            />
          </Col>
          <Col span={12}>
            <Field
              placeHolderText="Prompt Value"
              pathToState={`rules[${ruleIndex}].options[${index}].value`}
              value={localState.rules[ruleIndex].options[
                index
              ].value.toString()}
              updateState={updateState}
              readOnly={readOnly}
            />
          </Col>
        </Row>
      </Col>
    );
  };

  const rule = (index: number) => {
    const generateOption = option(index);
    return (
      <Row className="add-rule-row" key={generateKey("rule", index)}>
        <Col span={24}>
          <Field
            placeHolderText="Question"
            pathToState={`rules[${index}].question`}
            value={localState.rules[index].question}
            updateState={updateState}
            readOnly={readOnly}
          />
        </Col>
        <Col span={24}>
          <Field
            placeHolderText="Description"
            pathToState={`rules[${index}].description`}
            value={localState.rules[index].description}
            updateState={updateState}
            readOnly={readOnly}
          />
        </Col>

        <Col span={24}>
          <Selector
            title="Steps"
            pathToState={`rules[${index}].steps`}
            value={localState.rules[index].steps}
            options={stepsOptions}
            updateState={updateState}
            readOnly={readOnly}
            isNumber={true}
          />
        </Col>
        <Col span={24}>
          <Checkbox
            title="Required"
            pathToState={`rules[${index}].required`}
            value={localState.rules[index].required}
            updateState={updateState}
            readOnly={readOnly}
          />
        </Col>
        <Col span={24}>
          <Selector
            title="Input Type"
            pathToState={`rules[${index}].inputType`}
            value={localState.rules[index].inputType}
            options={inputTypes}
            updateState={updateState}
            readOnly={readOnly}
          />
        </Col>
        <Col span={24}>
          <Selector
            title="Value Type"
            pathToState={`rules[${index}].valueType`}
            value={localState.rules[index].valueType}
            options={programValueTypes}
            updateState={updateState}
            readOnly={readOnly}
          />
        </Col>

        <Col span={24} hidden={readOnly}>
          <Header text="Pre-filled Prompts:" size="sm" />
          {Object.entries(promptsByType).map(([key, value]) => (
            <Button
              key={generateKey("pre-filled-prompt-button", key)}
              name={key}
              action={() => updateState(`rules[${index}].options`, value)}
            />
          ))}
        </Col>

        <Col span={24}>
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
        </Col>
      </Row>
    );
  };

  const ruleWithUuid = () => {
    initialRuleData.id = uuid();
    return initialRuleData;
  };

  return (
    <Repeater
      title="Rules"
      // TODO: Should these be renamed to prompts?
      items={localState.rules}
      pathToState={`rules`}
      updateState={updateState}
      generateRow={rule}
      initialData={ruleWithUuid()}
      readOnly={readOnly}
    />
  );
};

export default RulesForm;
