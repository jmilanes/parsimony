import {
  Home,
  Programs,
  Program,
  Users,
  User,
  Results,
  Observe,
  Login
} from "../pages";
import { Pages } from "@parsimony/types";
import { IComponent } from "@parsimony/types";
import { Chat } from "../containers";

export type IPageComponents = Record<Pages, IComponent<unknown>>;

const PageService: IPageComponents = {
  [Pages.Home]: Home,
  [Pages.Programs]: Programs,
  [Pages.Program]: Program,
  [Pages.Users]: Users,
  [Pages.User]: User,
  [Pages.Results]: Results,
  [Pages.Observe]: Observe,
  [Pages.Chat]: Chat,
  [Pages.Login]: Login
};

export default PageService;
