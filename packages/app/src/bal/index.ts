import {
  IAddMessagePayload,
  ICreateThreadPayload,
  IDeleteThreadPayload
} from "@parsimony/types";
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

const fetchQuery = (query: string) => async () => {
  const response = await fetch(SERVER_URL, {
    ...requestParams,
    body: createBody(query)
  });
  return await response.json();
};

const fetchMutation = <P>(mutation: string, payload: P) => {
  fetch(SERVER_URL, {
    ...requestParams,
    body: createBody(mutation, { payload })
  });
};

export const fetchTreads = fetchQuery(`
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
  `);

export const createThread = (payload: ICreateThreadPayload) => {
  fetchMutation<ICreateThreadPayload>(
    `
  mutation CreateThread($payload: ICreateThreadPayload) {
    createThread(payload: $payload) {
      id
    }
  } 
  `,
    payload
  );
};

export const deleteThread = (payload: IDeleteThreadPayload) => {
  fetchMutation<IDeleteThreadPayload>(
    `
    mutation DeleteThread($payload: IDeletePayload) {
      deleteThread(payload: $payload)
    }
      `,
    payload
  );
};

export const addMessage = (payload: IAddMessagePayload) => {
  fetchMutation<IAddMessagePayload>(
    `
    mutation AddMessage($payload: IMessagePayload) {
      addMessage(payload: $payload){
        id
      }
    }
      `,
    payload
  );
};

// TODO for Chat
// ** Musts
// Think through message schema and thread schema
// Chat testing api and ubal / document the flow (things are kinda spread out so maybe document how you add a method full circle)
// Organize types and see if there is a better way and maybe generate types for queries
// Other thread methods (might need to add some)
// Basic Auth
// User ids... (means users should be in mongo probably)
// query by user ids
// Basic UI

// ** Nice to haves
// Limit messages initial requests and load more
// FE Broadcast for like who is typing
// Bulk delete
