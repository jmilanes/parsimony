import { ChatMetaTestIds, UIMetaTargetTypes } from "@parsimony/types";
import React, { KeyboardEvent, useEffect, useRef, useState } from "react";
import { Button } from "../../components";
import { generateMetaTestId } from "../../../utils";

export type IInputWithActionProps = {
  defaultValue?: string;
  placeholder?: string;
  buttonText: string;
  action: (value: string) => void;
  onCancel?: () => void;
};

export const ChatMessageInput = ({
  buttonText,
  action,
  placeholder,
  defaultValue,
  onCancel
}: IInputWithActionProps) => {
  const [val, setVal] = useState(defaultValue || "");
  const textAreaRef = useRef<HTMLInputElement>();

  const handleAction = () => {
    if (val.length === 0) return;
    action(val);
    setVal("");
  };

  const handleCancel = () => {
    onCancel && onCancel();
    setVal("");
  };

  useEffect(() => {
    if (val === "" || val === defaultValue) {
      const end = val.length;
      textAreaRef.current?.setSelectionRange(end, end);
      textAreaRef.current?.focus();
    }
  }, [val]);

  const handleOnEnter = (e: KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAction();
    }

    if (e.key === "Escape") {
      e.preventDefault();
      handleCancel();
      setVal("");
    }
  };

  return (
    <div className="chatMessageInput-container">
      <textarea
        //@ts-ignore
        ref={textAreaRef}
        onKeyDown={handleOnEnter}
        className="chatMessageInput"
        value={val}
        placeholder={placeholder}
        onChange={(e) => setVal(e.target.value)}
        data-test-id={generateMetaTestId(
          UIMetaTargetTypes.Field,
          ChatMetaTestIds.chatMessageBarField
        )}
      ></textarea>
      <Button
        disabled={val.length === 0}
        name={buttonText}
        onClick={handleAction}
        metaTestId={ChatMetaTestIds.chatMessageBarSubmit}
      />
      {onCancel && (
        <Button
          name="Cancel"
          onClick={handleCancel}
          metaTestId={ChatMetaTestIds.chatMessageBarCancel}
        />
      )}
    </div>
  );
};
