import { IObject } from "@parsimony/types/src";

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

export const createQueryRequestFn =
  <R, P>(query: string) =>
  async (payload?: P): Promise<R> => {
    const response = await fetch(SERVER_URL, {
      ...requestParams,
      body: createBody(query, payload as IObject)
    });
    return await response.json();
  };

export const createMutationRequestFn =
  <P>(mutation: string) =>
  async (payload: P) => {
    fetch(SERVER_URL, {
      ...requestParams,
      body: createBody(mutation, { payload })
    });
  };
