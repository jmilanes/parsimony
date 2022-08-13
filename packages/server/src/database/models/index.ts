import program from "./program.model";
import result from "./result.model";
import school from "./school.model";
import thread from "./thread.model";
import user from "./user.model";

export enum modelTypes {
  thread = "thread",
  user = "user",
  program = "program",
  result = "result",
  school = "school"
}

export default {
  [modelTypes.thread]: thread,
  [modelTypes.user]: user,
  [modelTypes.program]: program,
  [modelTypes.result]: result,
  [modelTypes.school]: school
};
// export { default as thread } from "./thread";
// export { default as user } from "./user";
// export { default as program } from "./program";
// export { default as result } from "./result";
// export { default as school } from "./school";
