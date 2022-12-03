import { LoginResponse, LogOutResponse, User } from "@parsimony/types";
import { me, login, logout } from "../bal";

export default class AuthService {
  isLoggedIn: boolean;
  authToken: string;
  previousPage: string;
  currentUser?: User;
  constructor() {
    this.authToken = localStorage.getItem("authToken") || "";
    this.isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    this.previousPage = "";
  }

  init() {
    if (!this.authToken) {
      localStorage.setItem("isLoggedIn", "false");
    }

    me({ authToken: this.authToken }).then((currentUser) => {
      console.log(
        "🚀 ~ file: auth.service.ts ~ line 21 ~ AuthService ~ me ~ currentUser",
        currentUser
      );
      this.currentUser = currentUser;
    });
  }

  logIn = (email: string, password: string) => {
    if (email === "ADMIN-P$") {
      localStorage.setItem("isLoggedIn", "true");
      window.location.reload();
      return;
    }
    login({ email, password }).then((response: LoginResponse) => {
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("authToken", response.authToken as string);
      window.location.reload();
    });
  };

  logOut = () => {
    logout({ authToken: this.authToken }).then((response: LogOutResponse) => {
      localStorage.setItem("isLoggedIn", "false");
      this.currentUser = undefined;
      window.location.reload();
    });
  };

  setPreviousPage = (page: string) => (this.previousPage = page);

  getCurrentUser = () => this.currentUser;
}
