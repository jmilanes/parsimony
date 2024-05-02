import { Service } from "typedi";
import { RequestCreatorService } from "../requestCreator.service";
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
  #rcs: RequestCreatorService;

  constructor(rcs: RequestCreatorService) {
    this.#rcs = rcs;
  }

  async me(payload: MePayload) {
    const request = this.#rcs.createPostRequest<MePayload, MeResponse>(
      "auth/me"
    );

    return await request(payload);
  }

  async login(payload: LoginPayload) {
    const request = this.#rcs.createPostRequest<LoginPayload, LoginResponse>(
      "auth/login"
    );

    return await request(payload);
  }

  async logout(payload: LogoutPayload) {
    const request = this.#rcs.createPostRequest<LogoutPayload, LoginResponse>(
      "auth/logout"
    );

    return await request(payload);
  }

  async resetPassword(payload: ResetPasswordPayload) {
    const request = this.#rcs.createPostRequest<
      ResetPasswordPayload,
      ResetPasswordResponse
    >("auth/resetPassword");

    return await request(payload);
  }

  async requestPasswordReset(payload: RequestPasswordResetPayload) {
    const request = this.#rcs.createPostRequest<
      RequestPasswordResetPayload,
      RequestPasswordResetResponse
    >("auth/requestPasswordReset");

    return await request(payload);
  }
}
