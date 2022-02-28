import React from "react";
import { Header, Button } from "../components";
import { clone } from "../utils";

// These any's might be able to be generics
export type IRepeaterProps = {
  title: string;
  items: unknown[];
  pathToState: string;
  updateState: (path: string, value: unknown) => void;
  generateRow: (index: number) => JSX.Element;
  initialData: Record<string, unknown>;
  readOnly: boolean;
};

const Repeater = ({
  items,
  title,
  generateRow,
  updateState,
  pathToState,
  initialData,
  readOnly
}: IRepeaterProps) => {
  const addRow = () => updateState(pathToState, [...items, clone(initialData)]);

  return readOnly ? (
    <>{items.map((_, index) => generateRow(index))}</>
  ) : (
    <>
      <Header text={title} size="md" />
      <Button name="add" action={addRow} />
      {items.map((_, index) => generateRow(index))}
    </>
  );
};

export default Repeater;
