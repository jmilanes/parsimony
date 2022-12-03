import { clone } from ".";
import { IObject, IObjectValues, Thread, User } from "@parsimony/types";
import { Modes } from "@parsimony/types";
import { IModes } from "@parsimony/types";
import { getDataWithPath } from "./abstractions.util";
import { omit } from "ramda";
import { debounceTime, distinctUntilChanged, fromEvent } from "rxjs";

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
  const currentObject: ICurrentObject = clone<any>(obj);

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

export const getFullName = (user?: User) =>
  user ? `${user.firstName} ${user.lastName}` : "";

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

export const getSum =
  (path?: string): ((a: any, c: any) => number) =>
  (a, c): number => {
    if (path) return a + getDataWithPath(c, path);
    return a + c;
  };

export const getMax = (path?: string) => (a: any, c: any) => {
  if (path) {
    const aValue = getDataWithPath(a, path) as number;
    const cValue = getDataWithPath(c, path) as number;
    if (aValue > cValue) return a;
    if (aValue < cValue) return c;
  }
  if (a.value > c.value) return a;
  if (a.value < c.value) return c;
  return a;
};

export const calculateAverage = (data: any[] | Object, path?: string) => {
  return Object.values(data).reduce(getSum(path), 0) / Object.keys(data).length;
};

export const formatFormHeader = (text: string) => `${text}:`;

export const arrayToObj = (arr: any[]) =>
  arr.reduce((a, c) => {
    a[c.id] = c;
    return a;
  }, {});

export const omitMongoKeys = <R>(obj: any): R =>
  omit(["updated_at", "created_at"], obj) as R;

export const removeMongoIds = (obj: any) => {
  delete obj.id;
  Object.values(obj).forEach((value) => {
    if (Array.isArray(value)) value.forEach(removeMongoIds);
  });
  return obj;
};

export const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

export const wait = (milliseconds: number) =>
  new Promise((resolve) => setTimeout(resolve, milliseconds));

export const removeItemByIndex = (arr: unknown[], index: number) =>
  arr.filter((_, i) => i !== index);

export const getThreadName = (thread: Thread, currentUser?: User): string =>
  thread.subscribers.length > 2
    ? thread.name
    : thread.subscribers.find(
        (subscriber) => subscriber?.id !== currentUser?.id
      )?.displayName || thread.name;

export const createShortCut = (key: string, handler: () => void) => {
  // TODO Add a way to register and unregister keyboard short cuts when you
  const event$ = fromEvent<KeyboardEvent>(document, "keyup").pipe(
    distinctUntilChanged()
  );
  event$.subscribe((e) => {
    e.code === key && handler();
  });
};
