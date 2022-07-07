import { IObject } from "../types";

const SERVER_URL = "http://localhost:4000";

const requestParams = {
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  }
};

const createBody = (query: string, variables?: IObject) => {
  const body = {
    query,
    variables: { now: new Date().toISOString(), ...variables }
  };
  return JSON.stringify(body);
};

export const fetchTreads = async () => {
  const response = await fetch(SERVER_URL, {
    ...requestParams,
    body: createBody(`
    query Threads {
      threads {
        id
        name
        subscribers
        messages {
          timeStamp
          value
          dataType
          id
        }
      }
    }
      `)
  });
  return await response.json();
};

export const createThread = async (payload: {
  name: string;
  subscribers: string[];
}) => {
  const response = await fetch(SERVER_URL, {
    ...requestParams,
    body: createBody(
      `
      mutation CreateThread($payload: ICreatePayload) {
        createThread(payload: $payload) {
          id
        }
      } 
      `,
      { payload }
    )
  });
  return await response.json();
};

export const deleteThread = async (payload: { id: string }) => {
  const response = await fetch(SERVER_URL, {
    ...requestParams,
    body: createBody(
      `
    mutation DeleteThread($payload: IDeletePayload) {
      deleteThread(payload: $payload)
    }
      `,
      { payload }
    )
  });
  return await response.json();
};
