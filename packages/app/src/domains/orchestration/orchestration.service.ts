import { Container, Service } from "typedi";

import { IOrchestrationHandler } from "./orchestrationHandlers/orchestrationHandler.interface";
import {
  DATA_HANDLERS,
  getOrchestrationHandlerTypeMap,
  OrchestrationHandlerOptionsTypeMap
} from "./orchestrationHandlers/handlers.typemap";

/**
 * Finite State Machine Async Data
 *
 * Makes are requested need for pages and container will pause execution until everything is loaded
 *
 *
 */
@Service()
export default class OrchestrationService {
  #handlers: Record<DATA_HANDLERS, IOrchestrationHandler> = {} as Record<
    DATA_HANDLERS,
    IOrchestrationHandler
  >;

  constructor() {
    this.#initHandlers();
  }

  #initHandlers = () => {
    const handlersClasses = getOrchestrationHandlerTypeMap();
    const types = Object.keys(handlersClasses);
    for (const handlerType of types) {
      this.#handlers[handlerType as DATA_HANDLERS] = Container.get(
        //@ts-ignore
        handlersClasses[handlerType as DATA_HANDLERS]
      ) as IOrchestrationHandler;
    }
  };

  public setupData = async <
    K extends DATA_HANDLERS,
    O extends OrchestrationHandlerOptionsTypeMap[K]
  >(
    handler: K,
    options: O
  ) => {
    await this.#handlers[handler].requestData<K>(options);
  };
}
