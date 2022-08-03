import program from "./program";
import result from "./result";
import school from "./school";
import thread from "./thread";
import user from "./user";

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
