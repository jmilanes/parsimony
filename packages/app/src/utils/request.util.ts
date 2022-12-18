import { IObject } from "@parsimony/types/src";
import { envIs } from "@parsimony/utilities";

const LOCAL_URL = "http://localhost:4000";
const PRODUCTION_URL = "https://api.parsimony.app/";

const SERVER_URL = envIs("prod") ? PRODUCTION_URL : LOCAL_URL;

export const requestParams = {
  method: "POST",
  headers: {
    // TODO Think though how all this local storage stuff should be accessed and the order of operations of init/async work
    Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    "Content-Type": "application/json",
    mode: "no-cors"
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
export const createRequest = <P, R>(mutation: string) => {
  return async (payload?: P): Promise<R> => {
    const response = await fetch(SERVER_URL, {
      ...requestParams,
      body: createBody(mutation, { payload })
    });

    return parseResponseJson<R>(await response.json());
  };
};

const parseResponseJson = <R>(response: { data: Record<string, unknown> }): R =>
  Object.values(response.data)[0] as R;
