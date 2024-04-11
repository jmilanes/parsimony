import { Module } from "@nestjs/common";
import { UsersController } from "../controllers/users/users.controller";
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
import { ResultsController } from "../controllers/results/results.controller";
import { CollectionsController } from "../controllers/collections/collections.controller";
import { AuthController } from "../controllers/auth/auth.controller";
import { TemporaryPasswordService } from "../../authentication/temporaryPassword.service";
import { ProgramsControllers } from "../controllers/programs/programs.controllers";

// TODO These could get broken down in to modules
export const APP_STRUCTURES = {
  controllers: [
    UsersController,
    ResultsController,
    CollectionsController,
    ProgramsControllers,
    AuthController
  ],
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
    TemporaryPasswordService,
    EmailService,
    TempPasswordEmail,
    CreatedUserEmail
  ]
};

@Module(APP_STRUCTURES)
export class AppModule {}
