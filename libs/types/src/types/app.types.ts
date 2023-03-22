import { FunctionComponent, ReactElement } from "react";

export type IRoute = {
  path: string;
  element: IComponent<any>;
  name?: string;
  metaTestId?: string;
};

export type IComponent<props> = FunctionComponent<props>;
export type IRenderedComponent<props> = ReactElement<props>;

export type ValueOf<T> = T[keyof T];
export type IObject = Record<string, unknown>;
export type IObjectAny = Record<string, any>;
export type IObjectValues<IObj> = Record<string, ValueOf<IObj>>;
export type WithEmptyObj<IObj> = IObj | IObject;

export type IModes = "readOnly" | "edit";
