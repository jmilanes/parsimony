import {
  AppStartOrchestrationHandler,
  AppStartOrchestrationOptions
} from "./appStart/appStart.orchestration.handler";
import {
  CollectionPageOrchestrationHandler,
  CollectionPageOrchestrationHandlerOptions
} from "./collectionPage/collectionPage.orchestration.handler";

export enum DATA_HANDLERS {
  APP_START = "APP_START",
  COLLECTION_PAGE = "COLLECTION_PAGE"
}

export const getOrchestrationHandlerTypeMap = () => {
  return {
    [DATA_HANDLERS.APP_START]: AppStartOrchestrationHandler,
    [DATA_HANDLERS.COLLECTION_PAGE]: CollectionPageOrchestrationHandler
  };
};

export interface OrchestrationHandlerOptionsTypeMap {
  [DATA_HANDLERS.APP_START]: AppStartOrchestrationOptions;
  [DATA_HANDLERS.COLLECTION_PAGE]: CollectionPageOrchestrationHandlerOptions;
}
