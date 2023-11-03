import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import { Button } from "./index";
import { MetaTestIds } from "@parsimony/types/dist";

export type IInputWithActionProps = {
  defaultValue?: string;
  placeholder?: string;
  buttonText: string;
  action: (value: string) => void;
  buttonMetaTestId: MetaTestIds;
};

export const InputWithAction = ({
  buttonText,
  action,
  placeholder,
  defaultValue,
  buttonMetaTestId
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
        metaTestId={buttonMetaTestId}
      />
    </div>
  );
};
