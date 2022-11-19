import { User } from "@parsimony/types";
import { message } from "antd";
import { userRequests } from "../bal";

export default class AuthService {
  isLoggedIn: boolean;
  previousPage: string;
  currentUser?: User;
  users: User[];
  constructor() {
    this.isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    this.users = [];
    this.previousPage = "";
  }

  init() {
    // TODO Replace with server side auth
    userRequests
      .get({
        id: localStorage.getItem("currentUserId") || ""
      })
      .then((currentUser) => {
        this.currentUser = currentUser;
      });

    userRequests.getAll().then((users) => {
      this.users = users;
    });
  }

  set = (users: User[]) => {
    this.users = users;
  };

  logIn = (email: string, password: string) => {
    if (email === "admin" && password === "123456789") {
      localStorage.setItem("isLoggedIn", "true");
      window.location.reload();
      return;
    }

    const user = this.users.find((user) => {
      return user.email === email;
    });
    if (!user) {
      message.error("Email not found");
      return false;
    }
    if (user?.password !== password) {
      message.error("Wrong Password");
      return false;
    }

    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("currentUserId", user.id);
    window.location.reload();
  };

  logOut = () => {
    localStorage.setItem("isLoggedIn", "false");
    localStorage.setItem("currentUser", "{}");
    window.location.reload();
  };

  setPreviousPage = (page: string) => (this.previousPage = page);

  getCurrentUser = () => this.currentUser;
}
