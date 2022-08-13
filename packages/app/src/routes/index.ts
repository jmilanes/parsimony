import { Routes, NavTitles } from "@parsimony/types";

import {
  Home,
  Programs,
  Program,
  User,
  Users,
  Observe,
  Login,
  Results,
  Chat
} from "../pages";
import { IRoute } from "@parsimony/types";

const routes: IRoute[] = [
  {
    path: Routes.Home,
    element: Home,
    name: NavTitles.Home
  },
  {
    path: Routes.Programs,
    element: Programs,
    name: NavTitles.Programs
  },
  {
    path: Routes.Program,
    element: Program
  },
  {
    path: Routes.Users,
    element: Users,
    name: NavTitles.Users
  },
  {
    path: Routes.User,
    element: User
  },
  {
    path: Routes.Results,
    element: Results
  },
  {
    path: Routes.Observe,
    element: Observe
  },
  {
    path: Routes.Chat,
    element: Chat,
    name: NavTitles.Chat
  },
  {
    path: Routes.Login,
    element: Login
  }
];

export default routes;
