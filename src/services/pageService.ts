import {
  Home,
  Programs,
  Program,
  Users,
  User,
  Results,
  Observe
} from "../pages";
import { Pages } from "../enums";
import { IComponent } from "../types";

export type IPageComponents = Record<Pages, IComponent<unknown>>;

const PageService: IPageComponents = {
  [Pages.Home]: Home,
  [Pages.Programs]: Programs,
  [Pages.Program]: Program,
  [Pages.Users]: Users,
  [Pages.User]: User,
  [Pages.Results]: Results,
  [Pages.Observe]: Observe
};

export default PageService;
