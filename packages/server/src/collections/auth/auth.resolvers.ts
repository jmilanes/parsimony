import { modelTypes } from "../../database/models";
import { Service } from "typedi";
import { DataBaseService } from "../../database";
import TokensService from "../../database/token.service";

@Service()
export class AuthResolvers {
  #db: DataBaseService;
  #ts: TokensService;

  constructor(db: DataBaseService, ts: TokensService) {
    this.#db = db;
    this.#ts = ts;
  }

  me = async (
    _: any,
    { payload: { refreshToken } }: { payload: { refreshToken: string } }
  ) => {
    return await this.#ts.verifyRefreshToken(refreshToken);
  };

  // logs in user registers new auth token and returns
  login = async (
    _: any,
    {
      payload: { email, password }
    }: { payload: { email: string; password: string } }
  ) => {
    console.log("ht");
    const user = await this.#db.findEntry(modelTypes.user, {
      email: email.toLowerCase()
    });

    if (!user) {
      throw Error("Invalid Email");
    }

    if (password !== user.password) {
      throw Error("Invalid Password");
    }

    const userObj = user.toObject();
    const accessToken = this.#ts.generateAccessToken(userObj);
    const refreshToken = this.#ts.generateRefreshToke(userObj);

    return {
      isLoggedIn: true,
      accessToken,
      refreshToken
    };
  };

  resetPassword = async (
    _: any,
    {
      payload: { email, password }
    }: { payload: { email: string; password: string } }
  ) => {
    const user = await this.#db.findEntry(modelTypes.user, { email });

    if (!user) {
      throw Error("Invalid Email");
    }

    await this.#db.updateEntry(user, { password: password });

    return {
      passwordReset: true
    };
  };

  logout = async (
    _: any,
    { payload: { refreshToken } }: { payload: { refreshToken: string } }
  ) => {
    await this.#ts.deleteRefreshToken(refreshToken);
    return {
      isLoggedIn: false
    };
  };

  getResolver = () => ({
    Mutation: {
      resetPassword: this.resetPassword
    },
    Query: {
      me: this.me,
      login: this.login,
      logout: this.logout
    }
  });
}
