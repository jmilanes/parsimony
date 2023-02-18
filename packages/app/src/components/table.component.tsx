import React from "react";

import { flattenObject, generateKey } from "../utils";
import { Content, Button } from "../components";
import { useServices } from "../context";
import { MetaTestIds, RepeatableMetaTestIds } from "@parsimony/types";

export type ITableAction = {
  name: string;
  method: (item: any) => void;
};

export type IColumns = {
  title: string;
  dataIndex: string;
  key: string;
  displayFn?: (data: any) => any;
  render?: any;
};

export type ITableProps<Data> = {
  data: Data[];
  columns: IColumns[];
  name: string;
  metaTestId: MetaTestIds;
  actions?: ITableAction[];
};

export type ITableRowProps = {
  source: any;
  tableName: string;
  metaTestId: MetaTestIds;
  columns: IColumns[];
  actions: ITableAction[];
};

const TableRow = ({
  source,
  tableName,
  metaTestId,
  columns,
  actions
}: ITableRowProps) => {
  return (
    <tr>
      {columns.map((col) => {
        return (
          <td
            key={`${tableName}-row-${source.id}-col-${col.key}`}
            data-test-id={`${metaTestId}-row-${source.id}-col-${col.key}`}
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
              action={() => action.method(source)}
              metaTestId={metaTestId}
              metaTestQualifier={`row-${source.id}-col-${action.name
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
  metaTestId
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

  return (
    <Content>
      <table className="styled-table">
        <thead>
          <tr data-test-id={RepeatableMetaTestIds.tableHeader}>
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
          {processedData.map((source, i) => (
            <TableRow
              key={source.id}
              source={source}
              tableName={name}
              metaTestId={metaTestId}
              actions={actions || []}
              columns={columns}
            />
          ))}
        </tbody>
      </table>
    </Content>
  );
};
