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
    {
      payload: { refreshToken, schoolId }
    }: { payload: { refreshToken: string; schoolId: string } }
  ) => {
    const foundID = this.#safeSchoolID(schoolId);
    return await this.#ts.verifyRefreshToken(refreshToken, foundID);
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
    const foundID = this.#safeSchoolID(schoolId);
    const db = this.#adg.dbBySchoolId(foundID);

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
    const refreshToken = this.#ts.generateRefreshToke(userObj, foundID);

    return {
      isLoggedIn: true,
      accessToken,
      refreshToken,
      schoolName: this.#ss.getSchoolById(foundID).name
    };
  };

  resetPassword = async (
    _: any,
    {
      payload: { email, password, schoolId }
    }: { payload: { email: string; password: string; schoolId: string } }
  ) => {
    const foundID = this.#safeSchoolID(schoolId);

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
    {
      payload: { refreshToken, schoolId }
    }: { payload: { refreshToken: string; schoolId: string } }
  ) => {
    const foundID = this.#safeSchoolID(schoolId);
    await this.#ts.deleteRefreshToken(refreshToken, foundID);
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

  #safeSchoolID(schoolId: string) {
    const foundID = this.#ss.getSchoolIdByNameOrId(schoolId);
    if (!foundID) {
      throw new Error("School Not Found");
    }
    return foundID;
  }
}
