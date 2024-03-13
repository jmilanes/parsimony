import { User } from "../users";

export class LogOutResponse {
  isLoggedIn?: boolean;
}

export class LoginResponse {
  accessToken?: string;
  isLoggedIn?: boolean;
  refreshToken?: string;
  resetPassword?: boolean;
  schoolName?: string;
  shouldResetPassword?: boolean;
  tempPassword?: string;
}

export class MeResponse {
  accessToken?: string;
  user?: User;
}

export class RequestPasswordResetResponse {
  success?: boolean;
}

export class ResetPasswordResponse {
  success?: string;
}
