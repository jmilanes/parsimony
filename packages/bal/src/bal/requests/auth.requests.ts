import {
  MePayload,
  LoginPayload,
  LogoutPayload,
  User,
  LoginResponse,
  LogOutResponse,
  ResetPasswordPayload,
  ResetPasswordResponse,
  MeResponse,
  RequestPasswordResetPayload,
  RequestPasswordResetResponse
} from "@parsimony/types";
import { createRequest } from "../../utils";

import authOperationStrings from "./operationStrings/authOperationStrings";

export const me = createRequest<MePayload, MeResponse>(authOperationStrings.me);

export const login = createRequest<LoginPayload, LoginResponse>(
  authOperationStrings.login
);

export const logout = createRequest<LogoutPayload, LogOutResponse>(
  authOperationStrings.logout
);

export const requestPasswordReset = createRequest<
  RequestPasswordResetPayload,
  RequestPasswordResetResponse
>(authOperationStrings.requestReset);

export const resetPassword = createRequest<
  ResetPasswordPayload,
  ResetPasswordResponse
>(authOperationStrings.resetPassword);
