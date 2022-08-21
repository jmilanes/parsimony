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

import { Program, Rule, RuleOption } from "@parsimony/types";
import { generateKey, removeItemByIndex } from "../utils";
import "./styles.css";

type RuleFormProps = {
  localState: Program;
  readOnly?: boolean;
  updateState: (path: string, value: unknown) => void;
};

const RulesForm = ({
  localState,
  readOnly = false,
  updateState
}: RuleFormProps) => {
  const deleteItem = (arr: any[], index: number, path: string) =>
    updateState(path, removeItemByIndex(arr, index));

  const setTargetOption = (options: RuleOption[], targetName: string) =>
    options?.map((option) => {
      option?.name === targetName
        ? (option.target = true)
        : delete option?.target;
      return option;
    });

  const option = (ruleIndex: number) => (index: number) => {
    if (!localState.rules) return null;
    const rule = localState.rules[ruleIndex] as Rule;
    if (!rule.options) return null;
    const option = rule.options[index] as RuleOption;
    return (
      <Col span={24} key={generateKey("option", index)}>
        <Row gutter={8}>
          <Col span={12}>
            <Field
              placeHolderText="Prompt Name"
              pathToState={`rules[${ruleIndex}].options[${index}].name`}
              value={option.name}
              updateState={updateState}
              readOnly={readOnly}
            />
          </Col>
          <Col span={12}>
            <Button
              name="Delete Prompt"
              action={() =>
                deleteItem(
                  rule.options || [],
                  index,
                  `rules[${ruleIndex}].options`
                )
              }
            />
            <Button
              name="Set to Target"
              action={() =>
                updateState(
                  `rules[${ruleIndex}].options`,
                  setTargetOption(
                    rule.options as RuleOption[],
                    option.name || ""
                  )
                )
              }
            />
            {option.target ? <p>Target Prompt</p> : null}
          </Col>
        </Row>
      </Col>
    );
  };

  const rule = (index: number) => {
    const generateOption = option(index);
    if (!localState.rules) return null;
    const rule = localState.rules[index] as Rule;
    return (
      <Row className="add-rule-row" key={generateKey("rule", index)}>
        <Button
          name="Delete Rule"
          action={() => deleteItem(localState.rules || [], index, "rules")}
        />
        <Col span={24}>
          <Field
            placeHolderText="Question"
            pathToState={`rules[${index}].question`}
            value={rule.question}
            updateState={updateState}
            readOnly={readOnly}
          />
        </Col>
        <Col span={24}>
          <Field
            placeHolderText="Description"
            pathToState={`rules[${index}].description`}
            value={rule.description}
            updateState={updateState}
            readOnly={readOnly}
          />
        </Col>

        <Col span={24}>
          <Selector
            title="Steps"
            pathToState={`rules[${index}].steps`}
            value={rule.steps}
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
            value={!!rule.required}
            updateState={updateState}
            readOnly={readOnly}
          />
        </Col>
        <Col span={24}>
          <Selector
            title="Input Type"
            pathToState={`rules[${index}].inputType`}
            value={rule.inputType}
            options={inputTypes}
            updateState={updateState}
            readOnly={readOnly}
          />
        </Col>
        <Col span={24}>
          <Selector
            title="Value Type"
            pathToState={`rules[${index}].valueType`}
            value={rule.valueType}
            options={programValueTypes}
            updateState={updateState}
            readOnly={readOnly}
          />
        </Col>

        <Col span={24} hidden={readOnly}>
          <Header text="Pre-filled Prompts:" size="sm" />
          {Object.entries(promptsByType).map(([key, value]) => {
            return (
              <Button
                key={generateKey("pre-filled-prompt-button", key)}
                name={key}
                action={() => updateState(`rules[${index}].options`, value)}
              />
            );
          })}
        </Col>

        <Col span={24}>
          <Repeater
            title="Prompts"
            items={rule.options || []}
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

  return (
    <Repeater
      title="Rules"
      items={localState.rules || []}
      pathToState={`rules`}
      updateState={updateState}
      generateRow={rule}
      initialData={initialRuleData}
      readOnly={readOnly}
    />
  );
};

export default RulesForm;
