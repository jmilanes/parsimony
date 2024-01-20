import { IObject } from "@parsimony/types";
import { envIs } from "@parsimony/utilities";

const DEV_URL = "http://localhost:4000";
const TEST_URL = "http://localhost:4444";
const PRODUCTION_URL = "https://api.parsimony.app/";

const getServerUrl = () => {
  if (envIs("prod")) {
    return PRODUCTION_URL;
  }
  if (envIs("test")) {
    return TEST_URL;
  }
  return DEV_URL;
};

export const createBody = (query: string, variables?: IObject) => {
  const body = {
    query,
    variables: { now: new Date().toISOString(), ...variables }
  };
  return JSON.stringify(body);
};

export const createRequestOptions = <P>(mutation: string, payload?: P) => {
  const requestParams = {
    method: "POST",
    headers: {
      Authorization: `Bearer ${localStorage?.getItem("accessToken")}`,
      "Content-Type": "application/json",
      mode: "no-cors"
    }
  };
  return {
    ...requestParams,
    body: createBody(mutation, { payload })
  };
};

// TODO 2 one void one return type or one with an optional return type
export const createRequest = <P, R>(mutation: string) => {
  return async (payload?: P): Promise<R> => {
    const response = await fetch(
      getServerUrl(),
      createRequestOptions<P>(mutation, payload)
    );

    return parseResponseJson<R>(await response.json());
  };
};

const parseResponseJson = <R>(response: {
  data: Record<string, unknown>;
}): R => {
  return Object.values(response?.data || {})[0] as R;
};
