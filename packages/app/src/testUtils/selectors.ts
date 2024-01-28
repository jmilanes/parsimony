export const getReadOnlySelector = (target: string) => `${target}-read-only`;

export const getTableAction = ({
  tableName,
  action,
  rowIndex
}: {
  tableName: string;
  rowIndex: number;
  action: string;
}) => `${tableName}-row-${rowIndex}-col-${action}-table-action`;

export const getTableData = ({
  tableName,
  rowIndex,
  colName
}: {
  tableName: string;
  rowIndex: number;
  colName: string;
}) => `${tableName}-row-${rowIndex}-col-${colName}`;
