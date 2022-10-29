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
  School
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
    path: Routes.Login,
    element: Login
  },
  {
    path: Routes.School,
    element: School,
    name: NavTitles.School
  }
];

export default routes;
