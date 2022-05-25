import { Routes, NavTitles, Pages } from "../enums";
import PageService from "../services/pageService";
import { IRoute } from "../types";

const routes: IRoute[] = [
  {
    path: Routes.Home,
    element: PageService[Pages.Home],
    name: NavTitles.Home
  },
  {
    path: Routes.Programs,
    element: PageService[Pages.Programs],
    name: NavTitles.Programs
  },
  {
    path: Routes.Program,
    element: PageService[Pages.Program]
  },
  {
    path: Routes.Users,
    element: PageService[Pages.Users],
    name: NavTitles.Users
  },
  {
    path: Routes.User,
    element: PageService[Pages.User]
  },
  {
    path: Routes.Results,
    element: PageService[Pages.Results]
  },
  {
    path: Routes.Observe,
    element: PageService[Pages.Observe]
  }
];

export default routes;
