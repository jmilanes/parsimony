import { Select } from "antd";
import React from "react";
import { Header, Container } from "../components";
import { formatFormHeader, generateKey } from "../utils";
import { Row, Col } from "./";

const { Option } = Select;

export type IOption = { name: string; value: string | number };
export type ISelectorProps = {
  title: string;
  options: IOption[];
  pathToState: string;
  updateState: (path: string, value: string | number) => void;
  readOnly?: boolean;
  value?: string | number;
  isNumber?: boolean;
  key?: string;
};

const Selector = ({
  options,
  pathToState,
  updateState,
  value,
  readOnly,
  title,
  key,
  isNumber
}: ISelectorProps) => {
  const ReadOnlyOption = () => (
    <>
      <Header text={formatFormHeader(title)} size="sm" />
      <p>{value}</p>
    </>
  );

  const Options = () => (
    <Row>
      <Col span={24}>
        <Header text={formatFormHeader(title)} size="sm" />
      </Col>

      <Select
        value={value}
        onChange={(val) =>
          updateState(
            pathToState,
            isNumber && typeof val === "string" ? parseInt(val) : val
          )
        }
      >
        {options.map((option, i) => (
          <Option key={generateKey("select-option", i)} value={option.value}>
            {option.name}
          </Option>
        ))}
      </Select>
    </Row>
  );

  return (
    <Container flexDirection="row" key={key}>
      {readOnly ? <ReadOnlyOption /> : <Options />}
    </Container>
  );
};

export default Selector;
