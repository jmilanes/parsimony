const fetchUsers = `
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

const fetchUser = `
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

export const createUser = `
  mutation CreateThread($payload: CreateThreadPayload) {
    createThread(payload: $payload) {
      id
    }
  } 
  `;

export const deleteUser = `
    mutation DeleteThread($payload: DeletePayload) {
      deleteThread(payload: $payload)
    }
      `;

export const editUser = `
    mutation DeleteThread($payload: DeletePayload) {
      deleteThread(payload: $payload)
    }
      `;

export const threadOperationString = {
  fetchUsers,
  fetchUser,
  createUser,
  deleteUser,
  editUser
};
