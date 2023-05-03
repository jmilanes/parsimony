import { Container, Service } from "typedi";
import {
  COMMAND_HANDLERS,
  commandHandlerOptionsTypeMap,
  getCommandHandlerTypeMap
} from "./handlers/handlers.typemap";
import { ICommandHandler } from "./handlers/comandHandler.interface";

export enum API_KEYS {
  getItems = "getItems",
  getItem = "getItem",
  getValue = "getValue",
  setStoreValue = "setStoreValue",
  makeRequest = "makeRequest"
}

@Service()
export class CommandService {
  #commandHandlers: Record<COMMAND_HANDLERS, ICommandHandler> = {} as any;
  //@ts-ignore
  public api: Record<API_KEYS, ICommandHandler["execute"]> = {};

  constructor() {
    this.#initCommandHandlers();
    //@ts-ignore
    this.api = this.#buildApi();
  }

  #initCommandHandlers = () => {
    const handlersClasses = getCommandHandlerTypeMap();
    const types = Object.keys(handlersClasses);
    for (const handlerType of types) {
      this.#commandHandlers[handlerType as COMMAND_HANDLERS] = Container.get(
        //@ts-ignore
        handlersClasses[handlerType as COMMAND_HANDLERS]
      ) as ICommandHandler;
    }
  };

  public use<
    RT = void,
    K extends COMMAND_HANDLERS = COMMAND_HANDLERS,
    O extends commandHandlerOptionsTypeMap[K] = commandHandlerOptionsTypeMap[K]
  >(command: K, options: O): unknown | unknown[] {
    return this.#commandHandlers[command].execute(options);
  }

  #buildApi = () => {
    return {
      getItems: this.#generateApi(COMMAND_HANDLERS.GET_ITEMS),
      getItem: this.#generateApi(COMMAND_HANDLERS.GET_ITEM),
      getValue: this.#generateApi(COMMAND_HANDLERS.GET_VALUE),
      makeRequest: this.#generateApi(COMMAND_HANDLERS.MAKE_REQUEST),
      setStoreValue: this.#generateApi(COMMAND_HANDLERS.SET_SORE_VALUE)
    };
  };

  #generateApi = <K extends COMMAND_HANDLERS>(CH: COMMAND_HANDLERS) => {
    return (options: commandHandlerOptionsTypeMap[K]) => this.use(CH, options);
  };
}
