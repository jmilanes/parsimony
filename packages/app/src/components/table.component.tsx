import React from "react";

import { flattenObject, generateKey } from "../utils";
import { Content, Button } from "../components";
import { useServices } from "../context";
import { RepeatableMetaTestIds } from "@parsimony/types/src";

export type ITableAction = {
  name: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  method: (item: any) => void;
  metaTestId: string;
};

export type IColumns = {
  title: string;
  dataIndex: string;
  key: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  displayFn?: (data: any) => any;
  render?: any;
};

export type ITableProps<Data> = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: Data[];
  columns: IColumns[];
  actions?: ITableAction[];
};

export const Table = <Data extends { id: string }>({
  data,
  actions,
  columns
}: ITableProps<Data>) => {
  const { filterService } = useServices();

  const processedData = filterService.filter(data).map((item: Data) => {
    const flatItem = flattenObject<Data>(item);
    Object.values(columns).forEach(
      (column) =>
        (flatItem[column.key] = column.displayFn
          ? column.displayFn(flatItem[column.key])
          : flatItem[column.key])
    );
    return flatItem as Data;
  });

  const TableRow = ({ source }: { source: any }) => {
    return (
      <tr>
        {columns.map((col) => {
          return (
            <td key={`row-${source.id}-col-${col.key}`}>{source[col.key]}</td>
          );
        })}
        <td>
          {actions?.map((action) => {
            return (
              <Button
                name={action.name}
                key={generateKey(`table-action-${action.name}`, source.id)}
                action={() => action.method(source)}
                metaTestId={RepeatableMetaTestIds.tableAction}
                metaTestQualifier={`${action.metaTestId}-${source.id}`}
              />
            );
          })}
        </td>
      </tr>
    );
  };

  return (
    <Content>
      <table className="styled-table">
        <thead>
          <tr data-cy={RepeatableMetaTestIds.tableHeader}>
            {columns.map((column) => (
              <th
                data-cy={`${RepeatableMetaTestIds.tableHeader}-col-${column.key}`}
                key={column.key}
              >
                {column.title}
              </th>
            ))}
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {processedData.map((source, i) => (
            <TableRow key={source.id} source={source} />
          ))}
        </tbody>
      </table>
    </Content>
  );
};
