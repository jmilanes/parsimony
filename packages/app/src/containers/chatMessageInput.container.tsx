import React, { useState } from "react";
import { Button } from "../components";

export type IInputWithActionProps = {
  defaultValue?: string;
  placeholder?: string;
  buttonText: string;
  action: (value: string) => void;
};

export const ChatMessageInput = ({
  buttonText,
  action,
  placeholder,
  defaultValue
}: IInputWithActionProps) => {
  const [val, setVal] = useState(defaultValue || "");
  return (
    <div className="chatMessageInput-container">
      <textarea
        className="chatMessageInput"
        value={val}
        defaultValue={defaultValue}
        placeholder={placeholder}
        onChange={(e) => setVal(e.target.value)}
      ></textarea>
      <Button
        disabled={val.length === 0}
        name={buttonText}
        action={() => {
          action(val);
          setVal("");
        }}
      />
    </div>
  );
};
