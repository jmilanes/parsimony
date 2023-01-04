import React from "react";

import { Container } from "../components";
import TextField from "@mui/material/TextField";
import MaterialAutocomplete from "@mui/material/Autocomplete";
import { DataTestIds, UIDataTargetTypes } from "@parsimony/types/src";
import { generateDataTestId } from "../utils";

export type IAutoCompleteProps = {
  options: { label: string }[];
  width?: number;
  label: string;
  multiSelect: boolean;
  updateState: (value: any) => void;
  dataTestId: DataTestIds;
};

export function Autocomplete({
  options,
  width,
  label,
  multiSelect,
  updateState,
  dataTestId
}: IAutoCompleteProps) {
  return (
    <Container flexDirection="column" margin={10}>
      <MaterialAutocomplete
        fullWidth
        size="small"
        multiple={multiSelect}
        disablePortal
        options={options}
        sx={{ width: width || "100%" }}
        onChange={(event: any, newValue: any) => {
          updateState(newValue);
        }}
        data-cy={generateDataTestId(
          UIDataTargetTypes.MultiSelector,
          dataTestId
        )}
        renderInput={(params) => <TextField {...params} label={label} />}
      />
    </Container>
  );
}
