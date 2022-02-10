import React from "react";
import { flattenObject, generateKey } from "../utils";

export type ITableAction = {
  name: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  method: (item: any) => void;
};

export type IColumns = {
  propertyKey: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  displayFn?: (data: any) => any;
};

export type ITableProps<Data> = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: Data[];
  columns: IColumns[];
  actions?: ITableAction[];
};

const Table = <Data extends { id: string }>({
  data,
  actions,
  columns
}: ITableProps<Data>) => {
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

        {data.map((item: Data) => {
          const flatItem = flattenObject<Data>(item);

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
                  key={generateKey("table-action", key)}
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
