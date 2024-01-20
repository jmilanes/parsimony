export const getReadOnlySelector = (seletor: string) => `${seletor}-read-only`;

export const getTableAction = (rowIndex: number, action: string) =>
  `row-${rowIndex}-col-${action}-table-action`;

export const getTableData = (table: string, rowIndex: number, col: string) =>
  `${table}-table-row-${rowIndex}-col-${col}`;
