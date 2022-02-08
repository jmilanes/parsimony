import React from "react";
import { flattenObject, generateKey } from "../utils";

export type ITableAction = {
  name: string;
  method: (item: any) => any;
};

export type IColumns = {
  propertyKey: string;
  displayFn?: (data: any) => any;
};

export type ITableProps = {
  data: Record<string, any>[];
  columns: IColumns[];
  actions?: ITableAction[];
};

const Table = ({ data, actions, columns }: ITableProps) => {
  return (
    <table>
      <tbody>
        <tr>
          {columns.map((column, key) => (
            <th key={generateKey("table-heading", key)}>
              {column.propertyKey}
            </th>
          ))}
        </tr>

        {data.map((item) => {
          const flatItem = flattenObject(item);
          console.log(flatItem);
          return (
            <tr key={item.id}>
              {Object.values(columns).map((column, key) => (
                <td key={generateKey("table-row", key)}>
                  {column.displayFn
                    ? column.displayFn(flatItem[column.propertyKey])
                    : flatItem[column.propertyKey]}
                </td>
              ))}
              {actions?.map((action, key) => (
                <td
                  key={generateKey("tabel-action", key)}
                  onClick={() => action.method(item)}
                >
                  {action.name}
                </td>
              ))}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default Table;
