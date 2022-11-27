import { fullSchema } from "../users.requests";

const me = `
query me($payload: MePayload) {
  me(payload: $payload) {
    ${fullSchema}
  }
}
`;

const login = `
query login($payload: LoginPayload) {
  login(payload: $payload) {
    isLoggedIn
    authToken
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

export default {
  me,
  login,
  logout
};
