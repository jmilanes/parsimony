import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import { Button } from "../components";
import { DataTestIds } from "@parsimony/types/src";

export type IInputWithActionProps = {
  defaultValue?: string;
  placeholder?: string;
  buttonText: string;
  action: (value: string) => void;
  buttonDataTestId: DataTestIds;
};

export const InputWithAction = ({
  buttonText,
  action,
  placeholder,
  defaultValue,
  buttonDataTestId
}: IInputWithActionProps) => {
  const [val, setVal] = useState(defaultValue || "");
  return (
    <div>
      <TextField
        value={val}
        defaultValue={defaultValue}
        placeholder={placeholder}
        onChange={(e) => setVal(e.target.value)}
      />
      <Button
        disabled={val.length === 0}
        name={buttonText}
        action={() => {
          action(val);
          setVal("");
        }}
        dataTestId={buttonDataTestId}
      />
    </div>
  );
};
