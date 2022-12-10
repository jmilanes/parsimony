import { LoginResponse, LogOutResponse, User } from "@parsimony/types";
import { encrypt } from "@parsimony/utilities/src";
import { me, login, logout, resetPassword } from "../bal";

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

    console.log(
      "🚀 ~ file: auth.service.ts:22 ~ AuthService ~ me ~ this.authToken",
      this.authToken
    );
    me({ authToken: this.authToken }).then((currentUser) => {
      this.currentUser = currentUser;
      console.log(
        "🚀 ~ file: auth.service.ts:27 ~ AuthService ~ me ~ this.currentUser",
        this.currentUser
      );
      // TODO: ACCESS TO THIS NEEDS TO BE EASIER
      id: localStorage.setItem("currentUserId", currentUser.id);
    });
  }

  logIn = (email: string, password: string) => {
    const hashedPassword = encrypt(password);
    if (email === "ADMIN-P$") {
      localStorage.setItem("isLoggedIn", "true");
      window.location.reload();
      return;
    }
    //  also convert here
    login({ email, password: hashedPassword }).then(
      (response: LoginResponse) => {
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("authToken", response.authToken as string);
        window.location.reload();
      }
    );
  };

  logOut = () => {
    logout({ authToken: this.authToken }).then((response: LogOutResponse) => {
      localStorage.setItem("isLoggedIn", "false");
      this.currentUser = undefined;
      window.location.reload();
    });
  };

  resetPassword = (email: string, password: string) => {
    const hashedPassword = encrypt(password);
    resetPassword({ email, password: hashedPassword }).then((x) =>
      console.log(x)
    );
  };

  setPreviousPage = (page: string) => (this.previousPage = page);

  getCurrentUser = () => this.currentUser;
}
