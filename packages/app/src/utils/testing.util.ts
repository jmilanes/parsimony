import { MetaTestIds, UIMetaTargetTypes } from "@parsimony/types";

export const generateMetaTestId = (
  type: UIMetaTargetTypes,
  metaTestId: MetaTestIds,
  metaTestQualifier?: string
) => {
  return `${type.toUpperCase()}:${metaTestId}${
    metaTestQualifier ? `-${metaTestQualifier}` : ""
  }`;
};
