import { ICreateResolverParams } from "../../collections";
import { modelTypes } from "../../database/models";

class TokenService {
  activeTokens: Record<string, string>;
  constructor() {
    this.activeTokens = {};
  }

  public addToken(userId: string) {
    const token = this.generateToken();
    this.activeTokens[token] = userId;
    return token;
  }

  public deleteToken(token: string) {
    delete this.activeTokens[token];
  }

  public getUserIdByToken(token: string) {
    const user = this.activeTokens[token];
    if (!user) {
      throw Error("Invalid Access Token");
    }
    return user;
  }

  private generateToken() {
    let rand = () => Math.random().toString(36);
    return rand() + rand();
  }
}

const tokenService = new TokenService();

export default (ICreateResolverParams: ICreateResolverParams) => ({
  Mutation: {},
  Query: {
    me: me(ICreateResolverParams),
    login: login(ICreateResolverParams),
    logout: login(ICreateResolverParams)
  }
});

// Retrieve user data based on auth token
export const me =
  ({ db, broadcast }: ICreateResolverParams) =>
  async (
    _: any,
    { payload: { authToken } }: { payload: { authToken: string } }
  ) => {
    const userId = tokenService.getUserIdByToken(authToken);
    if (!userId) {
      throw Error("Invalid AuthToken");
    }

    const user = await db.findEntry(modelTypes.user, { _id: userId });
    return user;
  };

// logs in user registers new auth token and returns
export const login =
  ({ db, broadcast }: ICreateResolverParams) =>
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

    const authToken = tokenService.addToken(user.id);

    return {
      isLoggedIn: true,
      authToken
    };
  };

// unregister auth token logs out user
export const logout =
  ({ db, broadcast }: ICreateResolverParams) =>
  async (_: any, { payload: { token } }: { payload: { token: string } }) => {
    tokenService.deleteToken(token);
    return {
      isLoggedIn: false
    };
  };
