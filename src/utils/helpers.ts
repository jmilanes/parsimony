import { IObject, IUser } from "../types";

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
export const flattenObject = (obj: IObject) => {
  const flattened: IObject = {};

  Object.keys(obj).forEach((key) => {
    const value = obj[key];

    if (typeof value === "object" && value !== null && !Array.isArray(value)) {
      Object.assign(flattened, flattenObject(value as IObject));
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
