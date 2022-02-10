import { v4 as uuidv4 } from "uuid";
import _ from "lodash";
import { IObject } from "../types";
import cn from "classnames";

export const uuid = () => uuidv4();

export const clone = (obj: Record<string, any>) => _.clone(obj);

export const setDataWithPath = (obj: IObject, path: string, value: unknown) =>
  _.set(obj, path, value);

export const getDataWithPath = (obj: IObject, path: string): unknown =>
  _.get(obj, path);

export const compileStyles = (classes: Record<string, boolean>) => cn(classes);
