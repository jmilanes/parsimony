const { gql } = require("apollo-server");

export default gql`
  input MePayload {
    refreshToken: String!
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
    refreshToken: String!
  }

  input AuthPayload {
    accessToken: String!
  }

  type LoginResponse {
    isLoggedIn: Boolean
    accessToken: String
    refreshToken: String
  }

  type LogOutResponse {
    isLoggedIn: Boolean
  }

  type ResetPasswordResponse {
    passwordReset: Boolean
  }

  type MeResponse {
    accessToken: String
    user: User
  }

  type Query {
    me(payload: MePayload): MeResponse
    login(payload: LoginPayload): LoginResponse
    logout(payload: LogoutPayload): LogOutResponse
  }
  type Mutation {
    resetPassword(payload: ResetPasswordPayload): ResetPasswordResponse
  }
`;
