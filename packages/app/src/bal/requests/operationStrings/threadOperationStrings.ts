const fullSchema = `
  id
  name
  subscribers
  messages {
    timeStamp
    userId
    value
    dataType
    id
}`;

const fetchThreads = `
query Threads {
 threads {
  ${fullSchema}
 } 
}
`;

const getThreadsByUserId = `
query GetThreadsByUserId($payload: GetThreadByUserIdPayload) {
  getThreadsByUserId(payload: $payload) {
    ${fullSchema}
  }
}
`;

const createThread = `
  mutation CreateThread($payload: CreateThreadPayload) {
    createThread(payload: $payload) {
      id
    }
  } 
  `;

const deleteThread = `
    mutation DeleteThread($payload: DeleteThreadPayload) {
      deleteThread(payload: $payload)
    }
      `;

const addMessage = `
    mutation AddMessage($payload: AddMessagePayload) {
      addMessage(payload: $payload){
        id
      }
    }
      `;

const deleteMessage = `
    mutation DeleteMessage($payload: DeleteMessagePayload) {
      deleteMessage(payload: $payload)
    }
      `;

const editMessage = `
    mutation EditMessage($payload: EditMessagePayload) {
      editMessage(payload: $payload)
    }
      `;

export default {
  fetchThreads,
  createThread,
  deleteThread,
  addMessage,
  editMessage,
  deleteMessage,
  getThreadsByUserId
};
