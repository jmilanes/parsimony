import { clone } from "../utils";
import { IObject, IObjectValues, IUser, ValueOf } from "../types";
import { Modes } from "../enums";
import { IModes } from "../types";
import { getDataWithPath } from "./abstractions";

export const filterByProp = <T>(collection: T[], prop: keyof T): T[] =>
  collection.filter((c: T) => c[prop]);

/**
 * Flatten a multidimensional object
 *
 * For example:
 *   flattenObject{ a: 1, b: { c: 2 } }
 * Returns:
 *   { a: 1, c: 2}
 */

export const flattenObject = <IObj>(obj: IObj) => {
  type ICurrentObject = IObjectValues<IObj>;
  const flattened: IObject = {};
  const currentObject: ICurrentObject = clone(obj);

  Object.keys(currentObject).forEach((key: string) => {
    const value = currentObject[key];
    if (typeof value === "object" && value !== null && !Array.isArray(value)) {
      Object.assign(flattened, flattenObject<typeof value>(value));
    } else {
      flattened[key] = value;
    }
  });

  return flattened;
};

export const generateKey = (type: string, key: string | number) =>
  `${type}-${key}`;

export const getFullName = (user: IUser) =>
  `${user.contactInformation.firstName} ${user.contactInformation.lastName}`;

export const createList = (arr: any[]) => arr.join(" | ");
export const getLength = (arr: any[]) => arr?.length;

export const makeIncludedKey =
  <Item>(values: unknown[], prop: keyof Item) =>
  (acc: Record<string, any>, curr: Record<typeof prop, any>) => {
    acc[curr[prop]] = values.includes(curr[prop]);
    return acc;
  };

export const createCommaSeparatedSting = (value: string, index: number) =>
  index === 0 ? value : `, ${value}`;

export const wrapFn = (fn: any) => fn();

export const isReadOnlyMode = (mode: IModes): boolean =>
  mode === Modes.ReadOnly;
export const isEditMode = (mode: IModes): boolean => mode === Modes.Edit;

export const increment = (
  step: number,
  update: React.Dispatch<React.SetStateAction<number>>
) => update(step + 1);

export const decrement = (
  step: number,
  update: React.Dispatch<React.SetStateAction<number>>
) => update(step - 1);

export const getSum = (arr: any[], path?: string): number =>
  arr.reduce((a, c) => {
    if (path) return a + getDataWithPath(c, path);
    return a + c;
  }, 0);

export const getMax = (arr: any[], path?: string) => {
  return arr.reduce((a: any, c: any) => {
    if (path) {
      const aValue = getDataWithPath(a, path) as number;
      const cValue = getDataWithPath(c, path) as number;
      if (aValue > cValue) return a;
      if (aValue < cValue) return c;
    }
    if (a.value > c.value) return a;
    if (a.value < c.value) return c;
    return a;
  });
};
