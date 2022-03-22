import React from "react";
import ComponentsService from "../services/componentsService";
import { Header, Container } from "../components";
import { generateKey } from "../utils";

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
      <Header text={title} size="sm" />
      <p>{value}</p>
    </>
  );

  const Options = () => (
    <>
      <Header text={title} size="sm" />
      <select
        value={value}
        onChange={(e) =>
          updateState(
            pathToState,
            isNumber ? parseInt(e.currentTarget.value) : e.currentTarget.value
          )
        }
      >
        {options.map((option, i) => (
          <option key={generateKey("select-option", i)} value={option.value}>
            {option.name}
          </option>
        ))}
      </select>
    </>
  );

  return (
    <Container flexDirection="row" key={key}>
      {readOnly ? <ReadOnlyOption /> : <Options />}
    </Container>
  );
};

export default Selector;
