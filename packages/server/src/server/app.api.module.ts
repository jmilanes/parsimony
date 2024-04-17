import { Module } from "@nestjs/common";
import { UsersController } from "../api/controllers/users/users.controller";
import { BaseCrudService } from "../services/api/baseCrud.service";
import { AppDataGateway } from "../services/database/app.data.gateway";
import { DBConnectionService } from "../services/database/dbConnecitonService.service";
import { SchoolService } from "../services/school/school.service";
import { SchoolDB } from "../services/school/school.db";
import ServerService from "../services/server/server.service";
import TokenService from "../services/database/token.service";
import { EmailService } from "../services/communication/email.service";
import EncryptionService from "../services/database/encryption.service";
import { DataBaseService } from "../services/database";
import { TempPasswordEmail } from "../services/communication/emails/email.tempPassword";
import { CreatedUserEmail } from "../services/communication/emails/email.createUser";
import { ResultsController } from "../api/controllers/results/results.controller";
import { CollectionsController } from "../api/controllers/collections/collections.controller";
import { AuthController } from "../api/controllers/auth/auth.controller";
import { TemporaryPasswordService } from "../services/authentication/temporaryPassword.service";
import { ProgramsControllers } from "../api/controllers/programs/programs.controllers";
import { ProgramApiService } from "../services/api/prgrams/program.api.service";
import { OperationsController } from "../api/controllers/operations/operations.controller";

// TODO These could get broken down in to modules
export const APP_STRUCTURES = {
  controllers: [
    UsersController,
    ResultsController,
    CollectionsController,
    ProgramsControllers,
    OperationsController,
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
    CreatedUserEmail,
    ProgramApiService
  ]
};

@Module(APP_STRUCTURES)
export class AppModule {}
