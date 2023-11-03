import { Routes, NavTitles, NavMetaTestIds } from "@parsimony/types/dist";

import {
  Home,
  Program,
  User,
  Users,
  Observe,
  Login,
  Results,
  Books,
  Collection
} from "../pages";
import { IRoute } from "@parsimony/types/dist";

const routes: IRoute[] = [
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
    path: Routes.Observe,
    element: Observe
  },
  {
    path: Routes.Login,
    element: Login
  }
];

export default routes;
