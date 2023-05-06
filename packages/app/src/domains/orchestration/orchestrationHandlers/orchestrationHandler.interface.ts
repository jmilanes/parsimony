import {
  DATA_HANDLERS,
  OrchestrationHandlerOptionsTypeMap
} from "./handlers.typemap";

export interface IOrchestrationHandler {
  requestData: <K extends DATA_HANDLERS>(
    options: OrchestrationHandlerOptionsTypeMap[K]
  ) => Promise<void>;
}
