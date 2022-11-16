import React from "react";
import { Header, Container } from "../components";
import { formatFormHeader } from "../utils";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import { Maybe } from "@parsimony/types";
import MenuItem from "@mui/material/MenuItem";
import MaterialSelect from "@mui/material/Select";

export type IOption = { name: string; value: string | number };
export type ISelectorProps = {
  title: string;
  options: IOption[];
  pathToState: string;
  updateState: (path: string, value: string | number) => void;
  readOnly?: boolean;
  value?: Maybe<string | number>;
  isNumber?: boolean;
  key?: string;
};

export const Selector = ({
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
    <FormControl fullWidth>
      <InputLabel>{title}</InputLabel>
      <MaterialSelect
        label={title}
        value={value || "Please select an option"}
        onChange={({ target: { value } }) =>
          updateState(
            pathToState,
            isNumber && typeof value === "string" ? parseInt(value) : value
          )
        }
      >
        {options.map((opt) => (
          <MenuItem key={opt.name} value={opt.value}>
            {opt.name}
          </MenuItem>
        ))}
      </MaterialSelect>
    </FormControl>
  );

  return (
    <Container flexDirection="row" key={key} margin={25}>
      {readOnly ? <ReadOnlyOption /> : <Options />}
    </Container>
  );
};
