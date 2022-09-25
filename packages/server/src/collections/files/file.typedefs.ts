const { gql } = require("apollo-server");

export default gql`
  scalar Date

  type File {
    id: ID!
    title: String
    clientId: ID
    uploadedBy: ID
    document: String
  }

  input CreateFilePayload {
    title: String
    clientId: ID!
    uploadedBy: ID!
    document: String!
  }

  input DeleteFilePayload {
    id: ID!
  }

  input GetFilePayload {
    id: ID!
  }

  input UpdateFilePayload {
    id: ID!
    title: String
    clientId: ID
    uploadedBy: ID
    document: String
  }

  input GetAllFilesByRelationShipPayload {
    relationshipProperty: String!
    id: ID!
  }

  type Query {
    getAllFiles: [File]
    getFile(payload: GetFilePayload): File
    getAllFilesByRelationship(payload: GetAllFilesByRelationShipPayload): [File]
  }

  type Mutation {
    createFile(payload: CreateFilePayload): File
    deleteFile(payload: DeleteFilePayload): ID
    updateFile(payload: UpdateFilePayload): File
  }
`;
