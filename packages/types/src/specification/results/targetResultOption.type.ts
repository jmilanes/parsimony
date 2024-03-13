import { Description, Optional } from "@tsed/schema";

export class TargetResultOption {
  @Description("")
  @Optional()
  id?: string;

  @Description("")
  @Optional()
  name?: string;

  @Description("")
  @Optional()
  target?: boolean;
}
