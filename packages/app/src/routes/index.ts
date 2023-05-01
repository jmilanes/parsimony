import { Routes, NavTitles, NavMetaTestIds } from "@parsimony/types";

import {
  Home,
  Programs,
  Program,
  User,
  Users,
  Observe,
  Login,
  Results,
  School,
  Books,
  Collection
} from "../pages";
import { IRoute } from "@parsimony/types";

const routes: IRoute[] = [
  {
    path: Routes.Home,
    element: Home,
    name: NavTitles.Home,
    metaTestId: NavMetaTestIds.homeBtn
  },
  {
    path: Routes.Programs,
    element: Programs,
    name: NavTitles.Programs,
    metaTestId: NavMetaTestIds.programBtn
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
  },
  {
    path: Routes.School,
    element: School,
    name: NavTitles.School,
    metaTestId: NavMetaTestIds.schoolBtn
  }
];

export default routes;
