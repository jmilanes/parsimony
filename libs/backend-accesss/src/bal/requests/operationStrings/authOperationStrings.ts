import { fullSchema } from "../users.requests";

const me = `
query me($payload: MePayload) {
  me(payload: $payload) {
    user {
      ${fullSchema}
    }
    accessToken
  }
}
`;

const login = `
query login($payload: LoginPayload) {
  login(payload: $payload) {
    isLoggedIn
    accessToken
    refreshToken
  }
}
`;

const logout = `
query logout($payload: LogoutPayload) {
  logout(payload: $payload) {
    isLoggedIn
  }
}
  `;

const resetPassword = `
mutation resetPassword($payload: ResetPasswordPayload) {
  resetPassword(payload: $payload) {
    passwordReset
  }
}
  `;

export default {
  me,
  login,
  logout,
  resetPassword
};
