import React from "react";
import { Header, Button, Row, Col } from "../components";
import { clone } from "../utils";

// These any's might be able to be generics
export type IRepeaterProps = {
  title: string;
  items: unknown[];
  pathToState: string;
  updateState: (path: string, value: unknown) => void;
  generateRow: (index: number) => JSX.Element | null;
  initialData: Record<string, unknown>;
  readOnly: boolean;
  renderAddButton: (addFn: () => void) => React.ReactElement;
};

export const Repeater = ({
  items,
  title,
  generateRow,
  updateState,
  pathToState,
  initialData,
  readOnly,
  renderAddButton
}: IRepeaterProps) => {
  const addRow = () => updateState(pathToState, [...items, clone(initialData)]);

  return readOnly ? (
    <>{items.map((_: any, index) => generateRow(index))}</>
  ) : (
    <div>
      <div className="flex-row spaceBetween">
        <Header text={title} size="sm" />
        {renderAddButton(addRow)}
      </div>
      <div className="add-form-spacer">
        {items.map((_: any, index) => generateRow(index))}
      </div>
      <div>{!!items.length && renderAddButton(addRow)}</div>
    </div>
  );
};
