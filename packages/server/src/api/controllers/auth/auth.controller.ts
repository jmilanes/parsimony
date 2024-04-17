import { Body, Controller, Get } from "@nestjs/common";
import { AppDataGateway } from "../../../services/database/app.data.gateway";
import TokenService from "../../../services/database/token.service";
import { SchoolService } from "../../../services/school/school.service";
import EncryptionService from "../../../services/database/encryption.service";
import { TemporaryPasswordService } from "../../../services/authentication/temporaryPassword.service";
import { EmailService } from "../../../services/communication/email.service";
import { modelTypes } from "../../../services/database/models";
import { EMAIL_TEMPLATES } from "../../../services/communication/emails/emails";

@Controller("auth")
export class AuthController {
  #adg: AppDataGateway;
  #ts: TokenService;
  #ss: SchoolService;
  #ens: EncryptionService;
  #tpw: TemporaryPasswordService;
  #es: EmailService;

  constructor(
    adg: AppDataGateway,
    ts: TokenService,
    ss: SchoolService,
    tpw: TemporaryPasswordService,
    es: EmailService,
    ens: EncryptionService
  ) {
    this.#adg = adg;
    this.#ts = ts;
    this.#ss = ss;
    this.#tpw = tpw;
    this.#es = es;
    this.#ens = ens;
  }

  @Get("/me")
  public async me(@Body() payload: { refreshToken: string; schoolId: string }) {
    // TODO: I Think this on should be the only one that is SchoolName (consider all)
    const foundID = this.#safeSchoolID(payload.schoolId);
    return await this.#ts.verifyRefreshToken(payload.refreshToken, foundID);
  }

  @Get("/login")
  public async login(
    @Body() payload: { email: string; password: string; schoolId: string }
  ) {
    // When you have no way of knowing the id you can accept a school name maybe we name it better
    const foundID = this.#safeSchoolID(payload.schoolId);
    const db = this.#adg.dbBySchoolId(foundID);

    const user = await db.findEntry(modelTypes.user, {
      email: payload.email.toLowerCase()
    });

    if (!user) {
      throw Error("Invalid Email");
    }

    const validTempPw = this.#tpw.validate(payload.email, payload.password);
    // Check real PW vrs the encrypted one we store
    if (this.#ens.encrypt(payload.password) !== user.password && !validTempPw) {
      throw Error("Invalid Password");
    }

    const userObj = user.toObject();
    const accessToken = this.#ts.generateAccessToken(userObj);
    const refreshToken = this.#ts.generateRefreshToke(userObj, foundID);
    return {
      isLoggedIn: true,
      resetPassword: validTempPw,
      tempPassword: validTempPw ? payload.password : undefined,
      accessToken,
      refreshToken,
      schoolName: this.#ss.getSchoolById(foundID).name,
      shouldPasswordReset: validTempPw
    };
  }

  @Get("/resetPassword")
  public async resetPassword(
    @Body()
    payload: {
      email: string;
      tempPassword: string;
      newPassword: string;
      schoolId: string;
    }
  ) {
    const foundID = this.#safeSchoolID(payload.schoolId);

    const validTempPw = this.#tpw.validate(payload.email, payload.tempPassword);

    if (!validTempPw) {
      throw Error(
        "The temporary password you have requested is expired. Please Request another one."
      );
    }

    const db = this.#adg.dbBySchoolId(foundID);
    const user = await db.findEntry(modelTypes.user, { email: payload.email });

    if (!user) {
      throw Error("Invalid Email");
    }

    await db.updateEntry(user, {
      password: this.#ens.encrypt(payload.newPassword)
    });
    this.#tpw.delete(payload.email);

    // Log user out
    return {
      success: true
    };
  }

  @Get("/logout")
  public async logout(
    @Body()
    payload: {
      refreshToken: string;
      schoolId: string;
    }
  ) {
    const foundID = this.#safeSchoolID(payload.schoolId);
    await this.#ts.deleteRefreshToken(payload.refreshToken, foundID);
    return {
      isLoggedIn: false
    };
  }

  @Get("requestPasswordReset")
  public async requestPasswordReset(
    @Body()
    payload: {
      email: string;
    }
  ) {
    try {
      // TODO Figure out a way to make sure the email is valid
      const tpw = this.#tpw.create(payload.email);
      this.#es.sendByTemplate(EMAIL_TEMPLATES.tempPassword, {
        tpw,
        email: payload.email
      });
    } catch (e) {
      throw new Error("Error Sending Temp Email!");
    }
    return {
      success: true
    };
  }

  #safeSchoolID(schoolId: string) {
    const foundID = this.#ss.getSchoolIdByNameOrId(schoolId);
    if (!foundID) {
      throw new Error(`School Not Found ${schoolId}`);
    }
    return foundID;
  }
}
