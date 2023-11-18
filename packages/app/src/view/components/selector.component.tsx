import React from "react";
import { Container, ReadOnly } from "./index";
import { formatFormHeader, generateMetaTestId } from "../../utils";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import { MetaTestIds, Maybe, UIMetaTargetTypes } from "@parsimony/types";
import MenuItem from "@mui/material/MenuItem";
import MaterialSelect from "@mui/material/Select";
import { CONTAINER_INPUT_MARGIN } from "../../constants";

export type IOption = { name: string; value: string | number };

export type ISelectorProps = {
  title: string;
  options: IOption[];
  pathToState?: string;
  updateState: (path: string, value: string | number) => void;
  readOnly?: boolean;
  value?: Maybe<string | number>;
  isNumber?: boolean;
  key?: string;
  metaTestId: MetaTestIds;
  metaTestQualifier?: string;
};

export const Selector = ({
  options,
  pathToState,
  updateState,
  value,
  readOnly,
  title,
  key,
  isNumber,
  metaTestId,
  metaTestQualifier
}: ISelectorProps) => {
  const metaId = generateMetaTestId(
    UIMetaTargetTypes.Selector,
    metaTestId,
    metaTestQualifier
  );

  const Options = () => (
    <FormControl fullWidth>
      <InputLabel>{title}</InputLabel>
      <MaterialSelect
        data-test-id={metaId}
        label={title}
        value={value || "Please select an option"}
        onChange={({ target: { value } }) =>
          updateState(
            pathToState || "",
            isNumber && typeof value === "string" ? parseInt(value) : value
          )
        }
      >
        {options.map((opt) => (
          <MenuItem
            key={opt.name}
            value={opt.value}
            data-test-id={`${metaId}-option-${opt.value}`}
          >
            {opt.name}
          </MenuItem>
        ))}
      </MaterialSelect>
    </FormControl>
  );

  return (
    <Container
      flexDirection="row"
      key={key}
      margin={readOnly ? 0 : CONTAINER_INPUT_MARGIN}
    >
      {readOnly ? (
        <ReadOnly metaTestId={metaId} value={value} title={title} />
      ) : (
        <Options />
      )}
    </Container>
  );
};
