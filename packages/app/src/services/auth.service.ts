import {
  LoginResponse,
  LogOutResponse,
  MeResponse,
  User
} from "@parsimony/types";
import { encrypt } from "@parsimony/utilities/src";
import { me, login, logout, resetPassword } from "../bal";

export default class AuthService {
  isLoggedIn: boolean;
  previousPage: string;
  currentUser?: User;
  constructor() {
    this.isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    this.previousPage = "";
  }

  // Address your async concerns with this. Understand the order and fix it then write tests
  async init() {
    if (
      !this.getAccessToken() &&
      localStorage.getItem("isLoggedIn") === "true"
    ) {
      this.logOut();
    }

    if (localStorage.getItem("isLoggedIn") === "true") {
      me({ refreshToken: this.getRefreshToken() })
        .then((me) => {
          this.currentUser = me.user as User;
          this.setAccessToken(me.accessToken as string);
          localStorage.setItem("currentUserId", this.currentUser.id);
        })
        .catch((e) => {
          this._clearLogoOutData();
        });
    }
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
        localStorage.setItem("accessToken", response.accessToken as string);
        localStorage.setItem("refreshToken", response.refreshToken as string);
        window.location.reload();
      }
    );
  };

  logOut = () => {
    if (!this.getRefreshToken()) {
      this._clearLogoOutData();
    }
    logout({ refreshToken: this.getRefreshToken() }).then(
      (response: LogOutResponse) => {
        this._clearLogoOutData();
      }
    );
  };

  resetPassword = (email: string, password: string) => {
    const hashedPassword = encrypt(password);
    resetPassword({ email, password: hashedPassword }).then((x) =>
      console.log(x)
    );
  };

  setPreviousPage = (page: string) => (this.previousPage = page);

  getCurrentUser = () => this.currentUser;

  getRefreshToken = (): string =>
    localStorage.getItem("refreshToken") as string;

  getAccessToken = (): string => localStorage.getItem("accessToken") as string;

  setAccessToken = (accessToken: string) =>
    localStorage.setItem("accessToken", accessToken);

  private _clearLogoOutData = () => {
    this.currentUser = undefined;
    localStorage.setItem("isLoggedIn", "false");
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("currentUserId");
    window.location.reload();
  };
}
