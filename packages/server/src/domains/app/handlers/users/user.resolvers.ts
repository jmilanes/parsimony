import { BroadcastService, modelTypes } from "../../../database";
import { AuthContext, BaseCrudResolvers } from "../baseCrudResolver";
import { Service } from "typedi";
import { AppDataGateway } from "../../app.data.gateway";
import { TemporaryPasswordService } from "../../../authentication/temporaryPassword.service";
import { EmailService } from "../../../communication/email.service";
import { EMAIL_TEMPLATES } from "../../../communication/emails/emails";
import { UserRoles } from "@parsimony/types";

@Service()
export class UserResolvers extends BaseCrudResolvers {
  #adg: AppDataGateway;
  #tpw: TemporaryPasswordService;
  #es: EmailService;

  constructor(
    adg: AppDataGateway,
    bs: BroadcastService,
    tpw: TemporaryPasswordService,
    es: EmailService
  ) {
    super(adg, bs);
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
      console.log(entry.email);
      if (isNotClient) {
        const tpw = this.#tpw.create(entry.email);
        // This could be a welcome email
        this.#es.sendByTemplate(EMAIL_TEMPLATES.tempPassword, {
          tpw,
          email: entry.email
        });
      }

      this.broadcast("CREATE", {
        ...entry.toJSON(),
        id: entry._id
      });

      return entry;
    } catch (error) {
      console.log("Create User error", error);
    }
  };
}
