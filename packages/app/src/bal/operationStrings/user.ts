const fullSchema = `
  id
  updated_at
  created_at
  schoolId
  timeZone
  roles
  type
  documents
  password
  email
  firstName
  lastName
  dateOfBirth
  phone
  contacts
`;

const getAllUsers = `
  query GetAllUsers {
    getAllUsers {
      ${fullSchema}
    }
  }
`;

const getUser = `
  query GetUser($payload: GetUserPayload) {
    getUser(payload: $payload) {
      ${fullSchema}
    }
  }
`;

export const createUser = `
    mutation CreateUser($payload: CreateUserPayload) {
      createUser(payload: $payload) {
        ${fullSchema}
      }
    }
  `;

export const deleteUser = `
  mutation DeleteUser($payload: DeleteUserPayload) {
    deleteUser(payload: $payload)
  }
  `;

export const editUser = `
  mutation UpdateUser($payload: UpdateUserPayload) {
    updateUser(payload: $payload) {
      ${fullSchema}
    } 
  }
      `;

export default {
  getAllUsers,
  getUser,
  createUser,
  deleteUser,
  editUser
};
