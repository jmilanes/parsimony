import { User } from "@parsimony/types";
import { encrypt, envIs } from "@parsimony/utilities";
import { login, logout, me, resetPassword } from "@parsimony/bal";
import { Service } from "typedi";

// This is needed for encrypt to work for creating users in cypress with requests
const applyEncryptionToCypressWindow = () =>
  //@ts-ignore
  !envIs("prod") && (window.testEncrypt = (val: string) => encrypt(val));

@Service()
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
    applyEncryptionToCypressWindow();
    if (
      !this.getAccessToken() &&
      localStorage.getItem("isLoggedIn") === "true"
    ) {
      await this.logOut();
    }
    if (localStorage.getItem("isLoggedIn") === "true") {
      try {
        // This should pull schoolId from local storage
        const meResponse = await me({
          refreshToken: this.getRefreshToken(),
          schoolId: "Molly School"
        });
        this.currentUser = meResponse.user as User;
        this.setAccessToken(meResponse.accessToken as string);
        localStorage.setItem("currentUserId", this.currentUser.id);
      } catch (e) {
        this._clearAuthData();
      }
    }
  }

  logIn = async (email: string, password: string, schoolId?: string) => {
    const hashedPassword = encrypt(password);
    try {
      const loginResponse = await login({
        email,
        password: hashedPassword,
        schoolId: schoolId || "Molly School"
      });
      if (!loginResponse) return;
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("accessToken", loginResponse.accessToken as string);
      localStorage.setItem(
        "refreshToken",
        loginResponse.refreshToken as string
      );
      window.location.reload();
    } catch (e) {
      this._clearAuthData();
    }
  };

  logOut = async () => {
    if (!this.getRefreshToken()) {
      this._clearAuthData();
    }
    try {
      await logout({
        refreshToken: this.getRefreshToken(),
        // This should pull from local storage
        schoolId: "Molly School"
      });
      this._clearAuthData();
    } catch (e) {
      // TODO: Add simple Error Handling
      console.error("Error Logging out");
    }
  };

  resetPassword = async (
    email: string,
    password: string,
    schoolId?: string
  ) => {
    // TODO: PASS with JWT
    const hashedPassword = encrypt(password);
    await resetPassword({
      email,
      password: hashedPassword,
      schoolId: schoolId || "Molly School"
    });
  };

  setPreviousPage = (page: string) => (this.previousPage = page);

  getCurrentUser = () => this.currentUser;

  getRefreshToken = (): string =>
    localStorage.getItem("refreshToken") as string;

  getAccessToken = (): string => localStorage.getItem("accessToken") as string;

  setAccessToken = (accessToken: string) =>
    localStorage.setItem("accessToken", accessToken);

  private _clearAuthData = () => {
    this.currentUser = undefined;
    localStorage.setItem("isLoggedIn", "false");
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("currentUserId");
    window.location.reload();
  };
}
