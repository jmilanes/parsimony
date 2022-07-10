import { IUser } from "@parsimony/types/src";
import { message } from "antd";

export default class AuthService {
  isLoggedIn: boolean;
  previousPage: string;
  currentUser?: IUser;
  users: IUser[];
  constructor(users: IUser[]) {
    this.isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    this.users = users;
    this.currentUser = JSON.parse(
      localStorage.getItem("currentUser") || "{}"
    ) as IUser;
    this.previousPage = "";
  }

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
    localStorage.setItem("currentUser", JSON.stringify(user));
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
