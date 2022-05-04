import React from "react";
import { filterService } from "../services/dataAccessServices";
import { flattenObject, generateKey } from "../utils";
import { Table as AntTable, Button, Space } from "antd";
import { Content } from "../components";

export type ITableAction = {
  name: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  method: (item: any) => void;
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

const Table = <Data extends { id: string }>({
  data,
  actions,
  columns
}: ITableProps<Data>) => {
  if (actions) {
    columns = [
      ...columns,
      {
        title: "Actions",
        key: "actions",
        dataIndex: "actions",
        render: (_, record: { source: Data }) => {
          return (
            <Space size="middle">
              {actions.map((action) => {
                return (
                  <Button
                    key={generateKey(
                      `table-action-${action.name}`,
                      record.source.id
                    )}
                    onClick={() => action.method(record.source)}
                  >
                    {action.name}
                  </Button>
                );
              })}
            </Space>
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

  return (
    <Content>
      <AntTable dataSource={dataSource} columns={columns} />
    </Content>
  );
};

export default Table;
