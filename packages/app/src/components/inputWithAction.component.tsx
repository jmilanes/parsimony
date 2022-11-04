import { Input } from "antd";
import React from "react";

const { Search } = Input;

export type IInputWithActionProps = {
  defaultValue?: string;
  placeholder: string;
  buttonText: string;
  action: (value: string) => void;
};

const InputWithAction = ({
  buttonText,
  action,
  placeholder,
  defaultValue
}: IInputWithActionProps) => {
  return (
    <Search
      defaultValue={defaultValue}
      placeholder={placeholder}
      onSearch={action}
      enterButton={buttonText}
    />
  );
};

export default InputWithAction;
