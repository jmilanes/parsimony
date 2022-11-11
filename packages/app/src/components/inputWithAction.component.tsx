import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import { Button } from "../components";

export type IInputWithActionProps = {
  defaultValue?: string;
  placeholder: string;
  buttonText: string;
  action: (value: unknown) => void;
};

export const InputWithAction = ({
  buttonText,
  action,
  placeholder,
  defaultValue
}: IInputWithActionProps) => {
  const [val, setVal] = useState(defaultValue || "");
  return (
    <div>
      <TextField
        defaultValue={defaultValue}
        placeholder={placeholder}
        onChange={(e) => setVal(e.target.value)}
      />
      <Button name={buttonText} action={() => action(val)} />
    </div>
  );
};
