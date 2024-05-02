import { IObject } from "@parsimony/types";
import { envIs } from "@parsimony/utilities";
import { Service } from "typedi";

const DEV_URL = "http://localhost:4000/";
const TEST_URL = "http://localhost:4444/";
const PRODUCTION_URL = "https://api.parsimony.app/";

type MethodTypes = "POST" | "GET" | "DELETE";

@Service()
export class RequestCreatorService {
  createPostRequest<P, R>(path: string) {
    return async (payload?: P): Promise<R> => {
      const URL = `${this.#getBaseUrl()}${path}`;
      const options = this.#createRequestOptions<P>("POST", payload);
      return await this.#request<R>(URL, options);
    };
  }

  createPatchRequest<P, R>(path: string) {
    return async (id: string, payload: P = {} as P): Promise<R> => {
      const URL = `${this.#getBaseUrl()}${path}/${id}`;
      const options = this.#createRequestOptions<P>("POST", payload);
      return await this.#request<R>(URL, options);
    };
  }

  createGetRequest<R>(path: string) {
    return async (id: string): Promise<R> => {
      const URL = `${this.#getBaseUrl()}${path}/${id}`;
      const options = this.#createRequestOptions("GET");
      return await this.#request<R>(URL, options);
    };
  }

  createGetAllRequest<R>(path: string) {
    return async (): Promise<R> => {
      const URL = `${this.#getBaseUrl()}${path}`;
      const options = this.#createRequestOptions("GET");
      return await this.#request<R>(URL, options);
    };
  }

  createDeleteRequest<R>(path: string) {
    return async (id: string): Promise<R> => {
      const URL = `${this.#getBaseUrl()}${path}/${id}`;
      const options = this.#createRequestOptions("DELETE");
      return await this.#request<R>(URL, options);
    };
  }

  async #request<R>(url: string, options: any) {
    try {
      const response = await fetch(url, options);
      const data = await response.json();
      return data as R;
    } catch (e) {
      throw new Error(`THIS WAS A REQUEST ERROR: ${url}`);
    }
  }

  #createRequestOptions<P>(method: MethodTypes, payload: P = {} as P) {
    const requestParams = {
      method,
      headers: {
        Authorization: `Bearer ${localStorage?.getItem("accessToken")}`,
        "Content-Type": "application/json",
        mode: "no-cors"
      }
    };
    if (method === "GET" || method === "DELETE") {
      return requestParams;
    }
    return {
      ...requestParams,
      body: JSON.stringify(payload)
    };
  }

  #getBaseUrl() {
    if (envIs("prod")) {
      return PRODUCTION_URL;
    }
    if (envIs("test")) {
      return TEST_URL;
    }
    return DEV_URL;
  }
}
