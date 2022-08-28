import program from "./program.model";
import result from "./result.model";
import school from "./school.model";
import thread from "./thread.model";
import user from "./user.model";
import actionItem from "./actionitems.model";

export enum modelTypes {
  thread = "thread",
  user = "user",
  program = "program",
  result = "result",
  school = "school",
  actionItem = "actionItem"
}

export default {
  [modelTypes.thread]: thread,
  [modelTypes.user]: user,
  [modelTypes.program]: program,
  [modelTypes.result]: result,
  [modelTypes.school]: school,
  [modelTypes.actionItem]: actionItem
};
