import { TempPasswordEmail } from "./emails/email.tempPassword";

require("dotenv").config();
import { Service } from "typedi";
import nodemailer, { Transporter, SendMailOptions } from "nodemailer";
import {
  Email,
  EMAIL_TEMPLATES,
  emailInstances,
  EmailOptions
} from "./emails/emails";
import { CreatedUserEmail } from "./emails/email.createUser";

/**
 * The `EmailService` class is a service that allows sending emails using the
 * Nodemailer library. It is responsible for creating a transporter
 * and sending emails with the specified options.
 */
@Service()
export class EmailService {
  #senderEmail: string = process.env.EMAIL_SERVICE_SENDER_EMAIL || "";
  #transporter: Transporter;
  #emails: Record<EMAIL_TEMPLATES, Email>;

  constructor(tempEmail: TempPasswordEmail, createUserEmail: CreatedUserEmail) {
    this.#transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: this.#senderEmail,
        pass: process.env.EMAIL_SERVICE_PASSWORD
      }
    });

    this.#emails = {
      [EMAIL_TEMPLATES.tempPassword]: tempEmail,
      [EMAIL_TEMPLATES.createUser]: createUserEmail
    };
  }

  public sendByTemplate(template: EMAIL_TEMPLATES, options: EmailOptions) {
    const payload = this.#emails[template].createPayload(options);
    this.#send(payload);
  }

  #send(options: SendMailOptions) {
    this.#transporter.sendMail(
      { from: this.#senderEmail, ...options },
      (error, _info) => {
        if (error) {
          console.error("Error sending email:", error);
        }
      }
    );
  }
}
