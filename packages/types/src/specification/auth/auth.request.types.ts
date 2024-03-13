import { IId } from "../../types";

export class AuthPayload {
  accessToken: string;
  schoolId: string;
}

export class LoginPayload {
  email: string;
  password: string;
  schoolId: string;
}

export class LogoutPayload {
  refreshToken: string;
  schoolId: string;
}

export class MePayload {
  refreshToken: string;
  schoolId: string;
}

export class RequestPasswordResetPayload {
  email: string;
}

export class ResetPasswordPayload {
  email: string;
  newPassword: string;
  schoolId: string;
  tempPassword: string;
}

export type IUpdateIsTypingPayload = {
  threadId: IId;
  user: string;
  value: boolean;
};
