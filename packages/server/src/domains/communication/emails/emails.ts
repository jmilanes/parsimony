import { generateTempPasswordEmailOptions } from "./email.tempPassword";
import { generateCreateUserOptions } from "./email.createUser";

export enum EMAIL_TEMPLATES {
  tempPassword = "tempPassword",
  createUser = "createUser"
}

export const emailGenerators = {
  [EMAIL_TEMPLATES.tempPassword]: generateTempPasswordEmailOptions,
  [EMAIL_TEMPLATES.createUser]: generateCreateUserOptions
};
