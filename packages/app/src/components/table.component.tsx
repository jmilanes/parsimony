import React from "react";

import { flattenObject, generateKey } from "../utils";
import { Table as AntTable } from "antd";
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

  if (actions) {
    columns = [
      ...columns,
      {
        title: "Actions",
        key: "actions",
        dataIndex: "actions",
        render: (_: any, record: { source: Data }) => {
          return (
            <>
              {actions.map((action) => {
                return (
                  <Button
                    name={action.name}
                    key={generateKey(
                      `table-action-${action.name}`,
                      record.source.id
                    )}
                    action={() => action.method(record.source)}
                    metaTestId={RepeatableMetaTestIds.tableAction}
                    metaTestQualifier={`${action.metaTestId}-${record.source.id}`}
                  />
                );
              })}
            </>
          );
        }
      }
    ];
  }

  const dataSource = filterService.filter(data).map((item: Data) => {
    const flatItem = flattenObject<Data>(item);
    const dataSourceObj: any = { key: item.id, source: flatItem };

    Object.values(columns).forEach(
      (column) =>
        (dataSourceObj[column.key] = column.displayFn
          ? column.displayFn(flatItem[column.key])
          : flatItem[column.key])
    );

    return dataSourceObj;
  });

  console.log("🚀 ~ file: table.component.tsx:87 ~ dataSource", dataSource);
  return (
    <Content>
      <AntTable dataSource={dataSource} columns={columns} />
    </Content>
  );
};
