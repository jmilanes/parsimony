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
    newPassword: String!
    tempPassword: String!
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

  input RequestPasswordResetPayload {
    email: String!
  }

  type LoginResponse {
    isLoggedIn: Boolean
    resetPassword: Boolean
    tempPassword: String
    accessToken: String
    refreshToken: String
    schoolName: String
    shouldResetPassword: Boolean
  }

  type LogOutResponse {
    isLoggedIn: Boolean
  }

  type ResetPasswordResponse {
    success: Boolean
  }

  type RequestPasswordResetResponse {
    success: Boolean
  }

  type MeResponse {
    accessToken: String
    user: User
  }

  type Query {
    me(payload: MePayload): MeResponse
    login(payload: LoginPayload): LoginResponse
    logout(payload: LogoutPayload): LogOutResponse
    requestPasswordReset(
      payload: RequestPasswordResetPayload
    ): RequestPasswordResetResponse
  }
  type Mutation {
    resetPassword(payload: ResetPasswordPayload): ResetPasswordResponse
  }
`;
