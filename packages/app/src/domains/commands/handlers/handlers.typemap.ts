import { GetItemsCommandHandler } from "./getItems/getItems";
import { GetItemsOptions } from "./getItems/getItems";
import { GetItemCommandHandler, GetItemOptions } from "./getItem/getItem";
import { GetValueCommandHandler, GetValueOptions } from "./getValue/getValue";
import {
  MakeRequestCommandHandler,
  MakeRequestOptions
} from "./makeRequest/makeRequest";

export enum COMMAND_HANDLERS {
  GET_ITEMS = "GET_ITEMS",
  GET_VALUE = "GET_VALUE",
  GET_ITEM = "GET_ITEM",
  MAKE_REQUEST = "MAKE_REQUEST"
}

export const getCommandHandlerTypeMap = () => {
  return {
    [COMMAND_HANDLERS.GET_ITEMS]: GetItemsCommandHandler,
    [COMMAND_HANDLERS.GET_ITEM]: GetItemCommandHandler,
    [COMMAND_HANDLERS.GET_VALUE]: GetValueCommandHandler,
    [COMMAND_HANDLERS.MAKE_REQUEST]: MakeRequestCommandHandler
  };
};

export interface commandHandlerOptionsTypeMap {
  [COMMAND_HANDLERS.GET_ITEM]: GetItemOptions;
  [COMMAND_HANDLERS.GET_ITEMS]: GetItemsOptions;
  [COMMAND_HANDLERS.GET_VALUE]: GetValueOptions;
  [COMMAND_HANDLERS.MAKE_REQUEST]: MakeRequestOptions;
}
