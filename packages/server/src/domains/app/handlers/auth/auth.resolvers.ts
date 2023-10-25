import { modelTypes } from "../../models";
import { Service } from "typedi";
import TokensService from "../../../database/token.service";
import { AppDataGateway } from "../../app.data.gateway";
import { SchoolService } from "../../../school/school.service";
import { TemporaryPasswordService } from "../../../authentication/temporaryPassword.service";

import { EmailService } from "../../../communication/email.service";
import { EMAIL_TEMPLATES } from "../../../communication/emails/emails";
import { encrypt } from "@parsimony/utilities";

@Service()
export class AuthResolvers {
  #adg: AppDataGateway;
  #ts: TokensService;
  #ss: SchoolService;
  #tpw: TemporaryPasswordService;
  #es: EmailService;

  constructor(
    adg: AppDataGateway,
    ts: TokensService,
    ss: SchoolService,
    tpw: TemporaryPasswordService,
    es: EmailService
  ) {
    this.#adg = adg;
    this.#ts = ts;
    this.#ss = ss;
    this.#tpw = tpw;
    this.#es = es;
  }

  me = async (
    _: any,
    {
      payload: { refreshToken, schoolId }
    }: { payload: { refreshToken: string; schoolId: string } }
  ) => {
    // TODO: I Think this on should be the only one that is SchoolName (consider all)
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

    const validTempPw = this.#tpw.validate(email, password);
    // Check real PW vrs the encrypted one we store
    if (encrypt(password) !== user.password && !validTempPw) {
      throw Error("Invalid Password");
    }

    const userObj = user.toObject();
    const accessToken = this.#ts.generateAccessToken(userObj);
    const refreshToken = this.#ts.generateRefreshToke(userObj, foundID);

    return {
      isLoggedIn: true,
      resetPassword: validTempPw,
      tempPassword: validTempPw ? password : undefined,
      accessToken,
      refreshToken,
      schoolName: this.#ss.getSchoolById(foundID).name,
      shouldPasswordReset: validTempPw
    };
  };

  resetPassword = async (
    _: any,
    {
      payload: { email, newPassword, schoolId, tempPassword }
    }: {
      payload: {
        email: string;
        tempPassword: string;
        newPassword: string;
        schoolId: string;
      };
    }
  ) => {
    const foundID = this.#safeSchoolID(schoolId);

    const validTempPw = this.#tpw.validate(email, tempPassword);

    if (!validTempPw) {
      throw Error(
        "The temporary password you have requested is expired. Please Request another one."
      );
    }

    const db = this.#adg.dbBySchoolId(foundID);
    const user = await db.findEntry(modelTypes.user, { email });

    if (!user) {
      throw Error("Invalid Email");
    }

    await db.updateEntry(user, { password: encrypt(newPassword) });
    this.#tpw.delete(email);

    // Log user out
    return {
      success: true
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

  requestPasswordReset = async (
    _: any,
    { payload: { email } }: { payload: { email: string } }
  ) => {
    try {
      // TODO Figure out a way to make sure the email is valid
      const tpw = this.#tpw.create(email);
      this.#es.sendByTemplate(EMAIL_TEMPLATES.tempPassword, {
        tpw,
        email
      });
    } catch (e) {
      throw new Error("Error Sending Temp Email!");
    }
    return {
      success: true
    };
  };

  getResolver = () => ({
    Mutation: {
      resetPassword: this.resetPassword
    },
    Query: {
      me: this.me,
      login: this.login,
      logout: this.logout,
      requestPasswordReset: this.requestPasswordReset
    }
  });

  #safeSchoolID(schoolId: string) {
    const foundID = this.#ss.getSchoolIdByNameOrId(schoolId);
    if (!foundID) {
      throw new Error("School Not Found");
    }
    return foundID;
  }

  #requestTempPassword(email: string) {
    const tpw = this.#tpw.create(email);
    this.#es.sendByTemplate(EMAIL_TEMPLATES.tempPassword, {
      email,
      tpw
    });
  }

  #validateTempPassword(email: string, tpw: string) {
    return this.#tpw.validate(email, tpw);
  }
}
