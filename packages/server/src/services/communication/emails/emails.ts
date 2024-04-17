import { TempPasswordEmail } from "./email.tempPassword";
import { CreatedUserEmail } from "./email.createUser";

export type EmailPayload = {
  to: string;
  subject: string;
  html: string;
};

export type EmailOptions = { email: string; tpw: string };

export class Email {
  createPayload: (options: EmailOptions) => EmailPayload;
}

export enum EMAIL_TEMPLATES {
  tempPassword = "tempPassword",
  createUser = "createUser"
}

export const emailInstances = {
  [EMAIL_TEMPLATES.tempPassword]: TempPasswordEmail,
  [EMAIL_TEMPLATES.createUser]: CreatedUserEmail
};
