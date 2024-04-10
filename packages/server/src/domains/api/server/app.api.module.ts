import { MiddlewareConsumer, Module } from "@nestjs/common";
import { UsersController } from "../controllers/users/users.api.controller";
import { BaseCrudService } from "../services/baseCrud.service";
import { AppDataGateway } from "../../app/app.data.gateway";
import { DBConnectionService } from "../../database/dbConnecitonService.service";
import { SchoolService } from "../../school/school.service";
import { SchoolDB } from "../../school/school.db";
import ServerService from "../../server/server.service";
import TokenService from "../../database/token.service";
import { EmailService } from "../../communication/email.service";
import EncryptionService from "../../database/encryption.service";
import { DataBaseService } from "../../database";
import { TempPasswordEmail } from "../../communication/emails/email.tempPassword";
import { CreatedUserEmail } from "../../communication/emails/email.createUser";

// TODO These could get broken down in to modules
export const APP_STRUCTURES = {
  controllers: [UsersController],
  providers: [
    TokenService,
    AppDataGateway,
    BaseCrudService,
    DBConnectionService,
    SchoolService,
    DataBaseService,
    SchoolDB,
    ServerService,
    EncryptionService,
    EmailService,
    TempPasswordEmail,
    CreatedUserEmail
  ]
};

@Module(APP_STRUCTURES)
export class AppModule {}
