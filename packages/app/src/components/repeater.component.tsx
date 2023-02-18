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
    <Row>
      <Col xs={12}>
        <Row>
          <Header text={title} size="md" />
          {renderAddButton(addRow)}
        </Row>
      </Col>

      {items.map((_: any, index) => generateRow(index))}
    </Row>
  );
};
