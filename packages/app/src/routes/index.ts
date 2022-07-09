import { Routes, NavTitles, Pages } from "@parsimony/types";
import PageService from "../services/pageService";
import { IRoute } from "@parsimony/types";

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
  },
  {
    path: Routes.Chat,
    element: PageService[Pages.Chat],
    name: NavTitles.Chat
  }
];

export default routes;
