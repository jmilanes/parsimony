import {
  COMMAND_HANDLERS,
  commandHandlerOptionsTypeMap
} from "./handlers.typemap";

export interface ICommandHandler {
  execute: <
    RT,
    K extends COMMAND_HANDLERS = COMMAND_HANDLERS,
    O extends commandHandlerOptionsTypeMap[K] = commandHandlerOptionsTypeMap[K]
  >(
    options: O
  ) => RT;
}
