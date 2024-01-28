import React from "react";

import { generateKey } from "../../utils";
import { Content, Button } from "./index";

import { MetaTestIds, RepeatableMetaTestIds } from "@parsimony/types";
import MaterialCheckbox from "@mui/material/Checkbox";
import { get } from "lodash";

export type ITableAction = {
  name: string;
  method: (item: any) => void;
};

export type IColumns = {
  title: string;
  key: string;
  displayFn?: (data: any) => any;
  render?: any;
};

export type ITableProps<Data> = {
  data: Data[];
  columns: IColumns[];
  name: string;
  metaTestId: string;
  actions?: ITableAction[];
  selectable?: ISelectable<Data>;
};

export type ITableRowProps<Data> = {
  source: any;
  tableName: string;
  metaTestId: string;
  columns: IColumns[];
  actions: ITableAction[];
  selectable?: ISelectable<Data>;
  index: number;
};

export type ISelectable<Data> = {
  visible: boolean;
  selected: (value: Data) => boolean;
  onChange: (value: Data) => void;
};

const TableRow = <Data extends { id: string }>({
  source,
  metaTestId,
  columns,
  actions,
  selectable,
  index
}: ITableRowProps<Data>) => {
  const SelectBox = () => {
    if (!selectable || !selectable.visible) {
      return null;
    }
    const onChange = (
      _event: React.ChangeEvent<HTMLInputElement>,
      _checked: boolean
    ) => selectable.onChange(source);
    return (
      <td>
        <MaterialCheckbox
          checked={selectable.selected(source)}
          onChange={onChange}
        />
      </td>
    );
  };

  return (
    <tr className={source?.active === false ? "inactiveRow" : ""}>
      <SelectBox />
      {columns.map((col) => {
        return (
          <td
            key={`${metaTestId}-row-${source.id}-col-${col.key}`}
            data-testid={`${metaTestId}-row-${index}-col-${col.key}`}
          >
            {source[col.key]}
          </td>
        );
      })}
      <td>
        {actions?.map((action) => {
          return (
            <Button
              name={action.name}
              key={generateKey(`table-action-${action.name}`, source.id)}
              onClick={() => action.method(source)}
              metaTestId={`${metaTestId}-row-${index}-col-${action.name
                .toLowerCase()
                .replaceAll(" ", "")}-table-action`}
            />
          );
        })}
      </td>
    </tr>
  );
};

export const Table = <Data extends { id: string }>({
  data,
  actions,
  columns,
  name,
  metaTestId,
  selectable
}: ITableProps<Data>) => {
  const processedData = data.map((item: Data) => {
    Object.values(columns).forEach((column) => {
      const value = get(item, column.key);
      //@ts-ignore
      item[column.key] = column.displayFn ? column.displayFn(value) : value;
    });
    return item as Data;
  });

  return (
    <Content>
      <table className="styled-table">
        <thead>
          <tr data-testid={RepeatableMetaTestIds.tableHeader}>
            {selectable?.visible ? <th>Add To Client</th> : null}
            {columns.map((column) => (
              <th
                data-test-id={`${RepeatableMetaTestIds.tableHeader}-col-${column.key}`}
                key={column.key}
              >
                {column.title}
              </th>
            ))}
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {processedData.map((source, index) => (
            <TableRow<Data>
              index={index}
              key={source.id}
              source={source}
              tableName={name}
              metaTestId={metaTestId}
              actions={actions || []}
              columns={columns}
              selectable={selectable}
            />
          ))}
        </tbody>
      </table>
    </Content>
  );
};
