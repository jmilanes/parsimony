import { GetItemsCommandHandler } from "./getItems/getItems.commandHandler";
import { GetItemsOptions } from "./getItems/getItems.commandHandler";
import {
  GetItemCommandHandler,
  GetItemOptions
} from "./getItem/getItem.commandHandler";
import {
  GetValueCommandHandler,
  GetValueOptions
} from "./getValue/getValue.commandHandler";
import {
  MakeRequestCommandHandler,
  MakeRequestOptions
} from "./makeRequest/makeRequest.commandHandler";
import {
  SetStoreValueCommandHandler,
  SetStoreValueOptions
} from "./setStoreValue/setStoreValue.commandHandler";

export enum COMMAND_HANDLERS {
  GET_ITEMS = "GET_ITEMS",
  GET_VALUE = "GET_VALUE",
  SET_SORE_VALUE = "SET_STORE_VALUE",
  GET_ITEM = "GET_ITEM",
  MAKE_REQUEST = "MAKE_REQUEST"
}

export const getCommandHandlerTypeMap = () => {
  return {
    [COMMAND_HANDLERS.GET_ITEMS]: GetItemsCommandHandler,
    [COMMAND_HANDLERS.GET_ITEM]: GetItemCommandHandler,
    [COMMAND_HANDLERS.GET_VALUE]: GetValueCommandHandler,
    [COMMAND_HANDLERS.SET_SORE_VALUE]: SetStoreValueCommandHandler,
    [COMMAND_HANDLERS.MAKE_REQUEST]: MakeRequestCommandHandler
  };
};

export interface commandHandlerOptionsTypeMap {
  [COMMAND_HANDLERS.GET_ITEM]: GetItemOptions;
  [COMMAND_HANDLERS.GET_ITEMS]: GetItemsOptions;
  [COMMAND_HANDLERS.GET_VALUE]: GetValueOptions;
  [COMMAND_HANDLERS.MAKE_REQUEST]: MakeRequestOptions;
  [COMMAND_HANDLERS.SET_SORE_VALUE]: SetStoreValueOptions;
}
