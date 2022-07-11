import { IDataAccess, IUser } from "@parsimony/types";
import { message } from "antd";

export default class AuthService {
  isLoggedIn: boolean;
  previousPage: string;
  currentUser?: IUser;
  usersData: IDataAccess<IUser>;
  constructor(usersData: IDataAccess<IUser>) {
    this.isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    this.usersData = usersData;
    this.currentUser = usersData.get(
      localStorage.getItem("currentUserId") || ""
    );
    this.previousPage = "";
  }

  logIn = (email: string, password: string) => {
    const user = this.usersData.getAll().find((user) => user.email === email);
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
