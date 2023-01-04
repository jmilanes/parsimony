import React from "react";

import { Container } from "../components";
import TextField from "@mui/material/TextField";
import MaterialAutocomplete from "@mui/material/Autocomplete";
import { MetaTestIds, UIMetaTargetTypes } from "@parsimony/types/src";
import { generateMetaTestId } from "../utils";

export type IAutoCompleteProps = {
  options: { label: string }[];
  width?: number;
  label: string;
  multiSelect: boolean;
  updateState: (value: any) => void;
  metaTestId: MetaTestIds;
};

export function Autocomplete({
  options,
  width,
  label,
  multiSelect,
  updateState,
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
          updateState(newValue);
        }}
        data-cy={generateMetaTestId(
          UIMetaTargetTypes.MultiSelector,
          metaTestId
        )}
        renderInput={(params) => <TextField {...params} label={label} />}
      />
    </Container>
  );
}
