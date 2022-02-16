import { clone } from "../utils";
import { IObject, IObjectValues, IUser } from "../types";

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
