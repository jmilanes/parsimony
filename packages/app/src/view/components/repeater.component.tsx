import React from "react";
import { Header } from "./index";
import { clone } from "../../utils";
import { InputForm } from "../../domains/forms/form";
import { Program } from "@parsimony/types";

// These any's might be able to be generics
export type IRepeaterProps<> = {
  title: string;
  items: unknown[];
  form: InputForm<Program>;
  generateRow: (index: number) => JSX.Element | null;
  initialData: any;
  readOnly: boolean;
  dataProp: string;
  renderAddButton: (addFn: () => void) => React.ReactElement;
};

export const Repeater = ({
  items,
  form,
  title,
  generateRow,
  initialData,
  readOnly,
  renderAddButton,
  dataProp
}: IRepeaterProps) => {
  const addRow = () => {
    form.updateData({
      // @ts-ignore
      [dataProp]: [...items, clone(initialData)]
    });
  };

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
