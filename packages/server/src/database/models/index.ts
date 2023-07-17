import program from "./program.model";
import result from "./result.model";
import school from "./school.model";
import thread from "./thread.model";
import user from "./user.model";
import actionItem from "./actionItem.model";
import refreshToken from "./refreshTokens.model";
import collection from "./collections.model";

export enum modelTypes {
  thread = "thread",
  user = "user",
  program = "program",
  result = "result",
  school = "school",
  actionItem = "actionItem",
  refreshToken = "refreshToken",
  collection = "collection"
}

export const models = {
  [modelTypes.thread]: thread,
  [modelTypes.user]: user,
  [modelTypes.program]: program,
  [modelTypes.result]: result,
  [modelTypes.school]: school,
  [modelTypes.actionItem]: actionItem,
  [modelTypes.refreshToken]: refreshToken,
  [modelTypes.collection]: collection
};
