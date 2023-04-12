const fullSchema = `
  id
  name
  subscribers {
    id
    displayName
  }
  messages {
    timeStamp
    userId
    value
    dataType
    id
}`;

const fetchThreads = `
query GetAllThreads {
 getAllThreads {
  ${fullSchema}
 } 
}
`;

const getAllThreadsByRelationship = `
query GetAllThreadsByRelationship($payload: GetAllThreadsByRelationshipPayload) {
  getAllThreadsByRelationship(payload: $payload) {
    ${fullSchema}
  }
}
`;

const getThread = `
query GetThread($payload: GetThreadPayload) {
  getThread(payload: $payload) {
    ${fullSchema}
  }
}
`;

const updateThread = `
query UpdateThread($payload: UpdateThreadPayload) {
  updateThread(payload: $payload) {
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
  getAllThreadsByRelationship,
  getThread,
  updateThread
};
