import { DataTestIds, UIDataTargetTypes } from "@parsimony/types/src";

export const generateDataTestId = (
  type: UIDataTargetTypes,
  dataTestId: DataTestIds
) => `${type.toUpperCase()}:${dataTestId}`;
