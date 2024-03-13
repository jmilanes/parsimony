import { Description, Optional } from "@tsed/schema";
import { TargetResultOption } from "./targetResultOption.type";

export class TargetResult {
  @Description("")
  @Optional()
  completed?: boolean;

  @Description("")
  @Optional()
  option?: TargetResultOption;

  @Description("")
  @Optional()
  targetOptionId?: string;
  @Description("")
  @Optional()
  trial?: number;
}
