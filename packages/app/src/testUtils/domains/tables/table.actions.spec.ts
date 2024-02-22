import { getTableData } from "../../selectors";
import { checkSelectorTextContent } from "../../actions.spec";
import { waitFor } from "@testing-library/react";

export type CheckTableValueArgs = {
  tableName: string;
  rowIndex: number;
  colName: string;
  expectedValue: string;
};

export const checkTableValues = async (rows: CheckTableValueArgs[]) => {
  await waitFor(async () => {
    for (const { tableName, rowIndex, colName, expectedValue } of rows) {
      await checkSelectorTextContent(
        getTableData({
          tableName,
          rowIndex,
          colName
        }),
        expectedValue
      );
    }
  });
};
