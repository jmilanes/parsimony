const { gql } = require("apollo-server");

export default gql`
  input MePayload {
    authToken: String!
  }

  input LoginPayload {
    email: String!
    password: String!
  }

  input ResetPasswordPayload {
    email: String!
    password: String!
  }

  input LogoutPayload {
    authToken: String!
  }

  input AuthPayload {
    authToken: String!
  }

  type LoginResponse {
    isLoggedIn: Boolean
    authToken: String
  }

  type LogOutResponse {
    isLoggedIn: Boolean
  }

  type ResetPasswordResponse {
    passwordReset: Boolean
  }

  type Query {
    me(payload: MePayload): User
    login(payload: LoginPayload): LoginResponse
    logout(payload: LogoutPayload): LogOutResponse
  }
  type Mutation {
    resetPassword(payload: ResetPasswordPayload): ResetPasswordResponse
  }
`;
