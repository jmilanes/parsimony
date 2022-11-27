import {
  MePayload,
  LoginPayload,
  LogoutPayload,
  User,
  LoginResponse,
  LogOutResponse
} from "@parsimony/types";
import { createRequest } from "../../utils";

import authOperationStrings from "./operationStrings/authOperationStrings";

export const me = createRequest<MePayload, User>(authOperationStrings.me);

export const login = createRequest<LoginPayload, LoginResponse>(
  authOperationStrings.login
);

export const logout = createRequest<LogoutPayload, LogOutResponse>(
  authOperationStrings.logout
);
