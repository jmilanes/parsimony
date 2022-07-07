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

// TODO for Chat
// ** Musts
// Finish Add Add Message
// Think through message schema and thread schema
// Chat testing api and ubal / document the flow (things are kinda spread out so maybe document how you add a method full circle)
// Organize types and see if there is a better way and maybe generate types for queries
// Other thread methods (might need to add some)
// Basic Auth
// Basic UI

// ** Nice to haves
// Limit messages initial requests and load more
// FE Broadcast for like who is typing
// Bulk delete
