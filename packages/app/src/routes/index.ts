import { Routes, NavTitles, NavDataIds } from "@parsimony/types";

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
    name: NavTitles.Home,
    dataTestId: NavDataIds.homeBtn
  },
  {
    path: Routes.Programs,
    element: Programs,
    name: NavTitles.Programs,
    dataTestId: NavDataIds.programBtn
  },
  {
    path: Routes.Program,
    element: Program
  },
  {
    path: Routes.Users,
    element: Users,
    name: NavTitles.Users,
    dataTestId: NavDataIds.directoryBtn
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
    name: NavTitles.School,
    dataTestId: NavDataIds.schoolBtn
  }
];

export default routes;
