import { CollectionCategories, Domains } from "@parsimony/types/dist";
import { creatCollectionPayload } from "../../../../testUtils/dataCreation";
import { createTargetUuidKey } from "../../../../testUtils/mockDBService";

export const initialCollectionPageData = {
  [Domains.Collection]: [
    creatCollectionPayload(),
    creatCollectionPayload({
      category: CollectionCategories.Sub,
      ancestors: [createTargetUuidKey(Domains.Collection, 0)],
      parentCollectionId: createTargetUuidKey(Domains.Collection, 0)
    })
  ]
};
