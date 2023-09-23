const { gql } = require("apollo-server");

export default gql`
  input MePayload {
    refreshToken: String!
    schoolId: String!
  }

  input LoginPayload {
    email: String!
    password: String!
    schoolId: String!
  }

  input ResetPasswordPayload {
    email: String!
    password: String!
    schoolId: String!
  }

  input LogoutPayload {
    refreshToken: String!
    schoolId: String!
  }

  input AuthPayload {
    accessToken: String!
    schoolId: String!
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
