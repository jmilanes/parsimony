import { modelTypes } from "../../models";
import { Service } from "typedi";
import TokensService from "../../../database/token.service";
import { AppDataGateway } from "../../app.data.gateway";
import { SchoolService } from "../../../school/school.service";

@Service()
export class AuthResolvers {
  #adg: AppDataGateway;
  #ts: TokensService;
  #ss: SchoolService;

  constructor(adg: AppDataGateway, ts: TokensService, ss: SchoolService) {
    this.#adg = adg;
    this.#ts = ts;
    this.#ss = ss;
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
      payload: { email, password, schoolId }
    }: {
      payload: { email: string; password: string; schoolId: string };
    }
  ) => {
    // When you have no way of knowing the id you can accept a school name maybe we name it better
    const foundID = this.#ss
      .getSchools()
      .find((x) => x.name === schoolId || x._id === schoolId)
      ?._id.toString();

    if (!foundID) {
      throw new Error("School Not Found");
    }

    const db = this.#adg.dbBySchoolId(foundID);
    console.log(db);
    const user = await db.findEntry(modelTypes.user, {
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
      payload: { email, password, schoolId }
    }: { payload: { email: string; password: string; schoolId: string } }
  ) => {
    const foundID = this.#ss
      .getSchools()
      .find((x) => x.name === schoolId || x._id === schoolId)?._id;

    if (!foundID) {
      throw new Error("School Not Found");
    }

    const db = this.#adg.dbBySchoolId(foundID);
    const user = await db.findEntry(modelTypes.user, { email });

    if (!user) {
      throw Error("Invalid Email");
    }

    await db.updateEntry(user, { password: password });

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
