import { Routes, NavTitles, NavMetaTestIds } from "@parsimony/types";

import {
  Home,
  Program,
  User,
  Users,
  Observe,
  Login,
  Results,
  Books,
  Collection,
  Result
} from "../pages";
import { IRoute } from "@parsimony/types";

export const routes: IRoute[] = [
  {
    path: Routes.Home,
    element: Home
  },
  {
    path: Routes.Program,
    element: Program
  },
  {
    path: Routes.Books,
    element: Books,
    name: NavTitles.Books,
    metaTestId: NavMetaTestIds.booksBtn
  },
  {
    path: Routes.Collection,
    element: Collection
  },
  {
    path: Routes.Users,
    element: Users,
    name: NavTitles.Users,
    metaTestId: NavMetaTestIds.directoryBtn
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
    path: Routes.Result,
    element: Result
  },
  {
    path: Routes.Observe,
    element: Observe
  },
  {
    path: Routes.Login,
    element: Login
  }
];
