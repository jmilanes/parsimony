import React from "react";
import ComponentService from "../services/componentsService";
import { clone } from "../utils";

// These any's might be able to be generics
export type IRepeaterProps = {
  title: string;
  items: unknown[];
  pathToState: string;
  updateState: (path: string, value: unknown) => void;
  generateRow: (index: number) => JSX.Element;
  initialData: Record<string, unknown>;
};

const Repeater = ({
  items,
  title,
  generateRow,
  updateState,
  pathToState,
  initialData
}: IRepeaterProps) => {
  const addRow = () => {
    updateState(pathToState, [...items, clone(initialData)]);
  };

  return (
    <>
      <ComponentService.Header text={title} size="md" />
      {ComponentService.Button({ name: "add", action: addRow })}
      {items.map((_, index) => generateRow(index))}
    </>
  );
};

export default Repeater;
