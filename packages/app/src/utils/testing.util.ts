import { MetaTestIds, UIMetaTargetTypes } from "@parsimony/types/src";

export const generateMetaTestId = (
  type: UIMetaTargetTypes,
  metaTestId: MetaTestIds
) => `${type.toUpperCase()}:${metaTestId}`;
