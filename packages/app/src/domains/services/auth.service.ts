import {
  LoginPayload,
  RequestPasswordResetPayload,
  ResetPasswordPayload,
  User
} from "@parsimony/types";

import {
  login,
  logout,
  me,
  resetPassword,
  requestPasswordReset
} from "@parsimony/bal";
import { Service } from "typedi";
import { LoginViewTypes } from "../state/appState/appState.types";
import AppStateService from "../state/appState/appStateService";
import { message } from "antd";

@Service()
export default class AuthService {
  //TODO All be move to App State Service
  #ass: AppStateService;
  // #na: NotificationsActions;
  #currentUser: User;
  isLoggedIn: boolean;
  schoolName: string;
  schoolCached: boolean;

  constructor(ass: AppStateService) {
    this.#ass = ass;
    this.isLoggedIn = this.#getPersistentData("isLoggedIn") === "true";
    this.schoolCached = !!this.getSchoolName();
    window.onbeforeunload = (event) => {
      if (this.getLoginState().view === "resetPassword") {
        this.#clearAuthData();
      }
    };
  }

  setLoggedIn(isLoggedIn: boolean) {
    this.isLoggedIn = isLoggedIn;
  }

  setSchool(name: string) {
    this.schoolName = name;
  }

  setCurrentUser(user: User) {
    this.#currentUser = user;
  }

  public async init() {
    if (
      !this.#getAccessToken() &&
      localStorage.getItem("isLoggedIn") === "true"
    ) {
      await this.logOut();
    }
    if (localStorage?.getItem("isLoggedIn") === "true") {
      try {
        // This should pull schoolId from local storage
        const meResponse = await me({
          refreshToken: this.#getRefreshToken(),
          schoolId: this.getSchoolName()
        });

        this.#currentUser = meResponse.user as User;
        this.#setAccessToken(meResponse.accessToken as string);
        // Need to find out why I used this and move on from it
        localStorage.setItem("currentUserId", meResponse?.user?.id as string);
      } catch (e) {
        this.#clearAuthData();
      }
    }
  }

  async logIn(payload: LoginPayload) {
    try {
      const loginResponse = await login(payload);
      if (loginResponse.resetPassword && loginResponse.tempPassword) {
        this.#ass.updateAppState("login", {
          view: "resetPassword",
          requestedEmail: payload.email,
          tempPassword: loginResponse.tempPassword
        });
      }

      if (!loginResponse) return;
      this.setSchoolName(
        this.getSchoolName() || (loginResponse.schoolName as string)
      );
      this.#setLoggedIn(true);
      this.#setAccessToken(loginResponse.accessToken as string);
      this.#setRefreshToken(loginResponse.refreshToken as string);

      if (!loginResponse.resetPassword) {
        this.#reload();
      }
    } catch (e) {
      this.#clearAuthData();
    }
  }

  public async logOut() {
    if (!this.#getRefreshToken()) {
      this.#clearAuthData();
    }
    try {
      await logout({
        refreshToken: this.#getRefreshToken(),
        // This should pull from local storage
        schoolId: this.getSchoolName()
      });
      this.#clearAuthData();
    } catch (e) {
      console.error("Error Logging out");
    }
  }

  public async resetPassword(payload: ResetPasswordPayload) {
    try {
      await resetPassword(payload);
      this.#ass.updateAppState("login", {
        view: "login",
        tempPassword: "",
        requestedEmail: ""
      });
    } catch (e) {
      console.log(e);
      message.error("Reset Fail");
    }
  }

  public async requestPasswordReset(payload: RequestPasswordResetPayload) {
    try {
      await requestPasswordReset(payload);
      this.#setLoginView("login");
    } catch (_e) {
      message.error("Request For Reset Password Failed");
    }
  }

  public changeSchool = () => {
    this.setSchoolName("");
    this.#clearAuthData();
  };

  public setRequestPasswordScreen = () => {
    this.#setLoginView("requestReset");
  };

  #setLoginView(view: LoginViewTypes) {
    this.#ass.updateAppState("login", { view });
  }

  public setPreviousPage(previousPage: string) {
    this.#ass.updateAppState("login", { previousPage });
  }

  public getCurrentUser() {
    return this.#currentUser;
  }

  public getLoginState() {
    return this.#ass.getAppStateByKey("login");
  }

  public getSchoolName() {
    return this.#getPersistentData("schoolName") || this.schoolName;
  }

  #getRefreshToken() {
    return this.#getPersistentData("refreshToken");
  }

  #getAccessToken() {
    return this.#getPersistentData("accessToken");
  }

  #setAccessToken(accessToken: string) {
    this.#setPersistentData("accessToken", accessToken);
  }

  #setRefreshToken = (accessToken: string) =>
    this.#setPersistentData("refreshToken", accessToken);

  #setLoggedIn(state: boolean) {
    this.#setPersistentData("isLoggedIn", state ? "true" : "false");
  }

  setSchoolName(name: string) {
    this.#setPersistentData("schoolName", name);
  }

  #clearAuthData() {
    this.#currentUser = {} as User;
    this.#setLoggedIn(false);
    this.#removePersistentData("accessToken");
    this.#removePersistentData("refreshToken");
    this.#removePersistentData("currentUserId");
    this.#reload();
  }

  #getPersistentData(item: string) {
    return localStorage.getItem(item) || "";
  }

  #setPersistentData(item: string, value: string) {
    localStorage.setItem(item, value);
  }

  #removePersistentData(item: string) {
    localStorage.removeItem(item);
  }

  #reload() {
    window.location.reload();
  }
}
