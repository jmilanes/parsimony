const { gql } = require("apollo-server");

export default gql`
  scalar Date

  type Document {
    id: ID!
    title: String
    clientId: ID
    details: String
    signature: String
    completed: Boolean
  }

  input CreateDocumentPayload {
    title: String
    clientId: ID!
    details: String
    signature: String
    completed: Boolean
  }

  input DeleteDocumentPayload {
    id: ID!
  }

  input GetDocumentPayload {
    id: ID!
  }

  input UpdateDocumentPayload {
    id: ID!
    title: String
    clientId: ID
    details: String
    signature: String
    completed: Boolean
  }

  input GetAllDocumentsByRelationshipPayload {
    relationshipProperty: String!
    id: ID!
  }

  type Query {
    getAllDocuments: [Document]
    getDocument(payload: GetDocumentPayload): Document
    getAllDocumentsByRelationship(
      payload: GetAllDocumentsByRelationshipPayload
    ): [Document]
  }

  type Mutation {
    createDocument(payload: CreateDocumentPayload): Document
    deleteDocument(payload: DeleteDocumentPayload): ID
    updateDocument(payload: UpdateDocumentPayload): Document
  }
`;
