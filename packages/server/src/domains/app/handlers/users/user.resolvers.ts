import { modelTypes } from "../../../database";
import { AuthContext, BaseCrudResolvers } from "../baseCrudResolver";
import { AppDataGateway } from "../../app.data.gateway";
import { TemporaryPasswordService } from "../../../authentication/temporaryPassword.service";
import { EmailService } from "../../../communication/email.service";
import { EMAIL_TEMPLATES } from "../../../communication/emails/emails";
import { UserRoles } from "@parsimony/types";
import { Injectable } from "@nestjs/common";

@Injectable()
export class UserResolvers extends BaseCrudResolvers {
  #adg: AppDataGateway;
  #tpw: TemporaryPasswordService;
  #es: EmailService;

  constructor(
    adg: AppDataGateway,
    tpw: TemporaryPasswordService,
    es: EmailService
  ) {
    super(adg);
    this.#adg = adg;
    this.#tpw = tpw;
    this.#es = es;
    this.model = modelTypes.user;
  }

  create = async (
    _: any,
    { payload }: { payload: any },
    { currentUser }: AuthContext
  ) => {
    try {
      const entry = await this.#adg
        .dbBySchoolId(currentUser.schoolId)
        .createEntry(this.model, {
          ...payload
        });

      const isNotClient = entry.type !== UserRoles.Client;

      if (isNotClient) {
        const tpw = this.#tpw.create(entry.email);
        // This could be a welcome email
        this.#es.sendByTemplate(EMAIL_TEMPLATES.createUser, {
          tpw,
          email: entry.email
        });
      }

      return entry;
    } catch (error) {
      console.error("Create User error", error);
    }
  };
}
