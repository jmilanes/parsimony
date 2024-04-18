import { Service } from "typedi";
import { createRestRequest } from "../request.utils";
import {
  LoginPayload,
  LoginResponse,
  LogoutPayload,
  MePayload,
  MeResponse,
  RequestPasswordResetPayload,
  RequestPasswordResetResponse,
  ResetPasswordPayload,
  ResetPasswordResponse
} from "@parsimony/types";

@Service()
export class AuthRequestHandler {
  async me(payload: MePayload) {
    const request = createRestRequest<MePayload, MeResponse>("POST", "auth/me");

    return await request(payload);
  }

  async login(payload: LoginPayload) {
    const request = createRestRequest<LoginPayload, LoginResponse>(
      "POST",
      "auth/login"
    );

    return await request(payload);
  }

  async logout(payload: LogoutPayload) {
    const request = createRestRequest<LogoutPayload, LoginResponse>(
      "POST",
      "auth/logout"
    );

    return await request(payload);
  }

  async resetPassword(payload: ResetPasswordPayload) {
    const request = createRestRequest<
      ResetPasswordPayload,
      ResetPasswordResponse
    >("POST", "auth/resetPassword");

    return await request(payload);
  }

  async requestPasswordReset(payload: RequestPasswordResetPayload) {
    const request = createRestRequest<
      RequestPasswordResetPayload,
      RequestPasswordResetResponse
    >("POST", "auth/requestPasswordReset");

    return await request(payload);
  }
}
