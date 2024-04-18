import { IObject } from "@parsimony/types";
import { envIs } from "@parsimony/utilities";

const DEV_URL = "http://localhost:4000/";
const TEST_URL = "http://localhost:4444/";
const PRODUCTION_URL = "https://api.parsimony.app/";

type MethodTypes = "POST" | "GET" | "DELETE";

const getServerUrl = () => {
  if (envIs("prod")) {
    return PRODUCTION_URL;
  }
  if (envIs("test")) {
    return TEST_URL;
  }
  return DEV_URL;
};

export const createRequestOptions = <P>(
  method: MethodTypes,
  payload: P = {} as P
) => {
  const requestParams = {
    method,
    headers: {
      Authorization: `Bearer ${localStorage?.getItem("accessToken")}`,
      "Content-Type": "application/json",
      mode: "no-cors"
    }
  };
  return {
    ...requestParams,
    body: method === "GET" ? undefined : JSON.stringify(payload)
  };
};

// TODO 2 one void one return type or one with an optional return type
export const createRestRequest = <P, R>(type: MethodTypes, path: string) => {
  return async (payload?: P): Promise<R> => {
    //@ts-ignore
    const URL = payload?.id
      ? //@ts-ignore
        `${getServerUrl()}${path}/${payload?.id}`
      : `${getServerUrl()}${path}`;

    const response = await fetch(URL, createRequestOptions<P>(type, payload));
    const data = await response.json();
    return data as R;
  };
};
