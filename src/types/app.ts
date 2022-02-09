import { FunctionComponent, ReactElement } from "react";

export type IRoute = {
  path: string;
  element: IComponent<unknown>;
  name?: string;
};

export type IComponent<props> = FunctionComponent<props>;
export type IRenderedComponent<props> = ReactElement<props>;

export type IObject = Record<string, unknown>;
