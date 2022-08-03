const fetchThreads = `
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
  deleteMessage
};
