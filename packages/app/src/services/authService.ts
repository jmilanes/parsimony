import { IDataAccess, User } from "@parsimony/types";
import { message } from "antd";

export default class AuthService {
  isLoggedIn: boolean;
  previousPage: string;
  currentUser?: User;
  users: User[];
  constructor(subscribeToUserStore: (t: any) => void, currentUser: User) {
    this.isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    this.users = [];
    subscribeToUserStore(this);
    this.currentUser = currentUser;
    this.previousPage = "";
  }

  set = (users: User[]) => {
    this.users = users;
  };

  logIn = (email: string, password: string) => {
    const user = this.users.find((user) => user.email === email);
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
