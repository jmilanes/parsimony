import { Description, Optional } from "@tsed/schema";
import { TargetResult } from "./targetResult.type";

export class ResultData {
  @Description("")
  @Optional()
  targetCompleteness?: number;

  @Description("")
  @Optional()
  targetId?: string;

  @Description("")
  @Optional()
  targetResults?: TargetResult[];
}
