import { IObject } from "@parsimony/types/src";
import { Alert, notification } from "antd";

const SERVER_URL = "http://localhost:4000";

export const requestParams = {
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  }
};

export const createBody = (query: string, variables?: IObject) => {
  const body = {
    query,
    variables: { now: new Date().toISOString(), ...variables }
  };
  return JSON.stringify(body);
};

// TODO 2 one void one return type or one with an optional return type
export const createRequest =
  <P, R>(mutation: string) =>
  async (payload?: P): Promise<R> => {
    const response = await fetch(SERVER_URL, {
      ...requestParams,
      body: createBody(mutation, { payload })
    });

    return parseResponseJson<R>(await response.json());
  };

const parseResponseJson = <R>(response: { data: Record<string, unknown> }): R =>
  Object.values(response.data)[0] as R;
