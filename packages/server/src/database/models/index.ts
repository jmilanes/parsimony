import thread from "./thread";
import user from "./user";

export { default as thread } from "./thread";
export { default as user } from "./user";

export enum modelTypes {
  thread = "thread",
  user = "user"
}

export default {
  [modelTypes.thread]: thread,
  [modelTypes.user]: user
};
