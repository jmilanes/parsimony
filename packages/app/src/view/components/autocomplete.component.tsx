import React from "react";

import { Container } from "./index";
import TextField from "@mui/material/TextField";
import MaterialAutocomplete from "@mui/material/Autocomplete";

type TRUE_OPTION = { label: string; value: string };

export type IAutoCompleteProps = {
  options: TRUE_OPTION[];
  width?: number;
  label: string;
  multiSelect: boolean;
  onChange: (value: TRUE_OPTION) => void;
  metaTestId: string;
};

export function Autocomplete({
  options,
  width,
  label,
  multiSelect,
  onChange,
  metaTestId
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
          onChange(newValue);
        }}
        data-testid={metaTestId}
        renderInput={(params) => <TextField {...params} label={label} />}
      />
    </Container>
  );
}
