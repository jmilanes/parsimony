import { ICreateResolverParams } from "../../collections";
import { modelTypes } from "../../database/models";
import TokensService from "../../database/token.service";

// Retrieve user data based on auth token
export const me =
  ({ db, tokenService }: ICreateResolverParams) =>
  async (
    _: any,
    { payload: { refreshToken } }: { payload: { refreshToken: string } }
  ) => {
    const response = await tokenService.verifyRefreshToken(refreshToken);

    return response;
  };

// logs in user registers new auth token and returns
export const login =
  ({ db, tokenService }: ICreateResolverParams) =>
  async (
    _: any,
    {
      payload: { email, password }
    }: { payload: { email: string; password: string } }
  ) => {
    const user = await db.findEntry(modelTypes.user, { email });

    if (!user) {
      throw Error("Invalid Email");
    }

    if (password !== user.password) {
      throw Error("Invalid Password");
    }

    const userObj = user.toObject();
    const accessToken = tokenService.generateAccessToken(userObj);
    const refreshToken = tokenService.generateRefreshToke(userObj);

    return {
      isLoggedIn: true,
      accessToken,
      refreshToken
    };
  };

export const resetPassword =
  ({ db }: ICreateResolverParams) =>
  async (
    _: any,
    {
      payload: { email, password }
    }: { payload: { email: string; password: string } }
  ) => {
    const user = await db.findEntry(modelTypes.user, { email });

    if (!user) {
      throw Error("Invalid Email");
    }

    await db.updateEntry(user, { password: password });

    return {
      passwordReset: true
    };
  };

// unregister auth token logs out user
export const logout =
  ({ tokenService }: ICreateResolverParams) =>
  async (
    _: any,
    { payload: { refreshToken } }: { payload: { refreshToken: string } }
  ) => {
    await tokenService.deleteRefreshToken(refreshToken);
    return {
      isLoggedIn: false
    };
  };

export default (ICreateResolverParams: ICreateResolverParams) => ({
  Mutation: {
    resetPassword: resetPassword(ICreateResolverParams)
  },
  Query: {
    me: me(ICreateResolverParams),
    login: login(ICreateResolverParams),
    logout: logout(ICreateResolverParams)
  }
});
