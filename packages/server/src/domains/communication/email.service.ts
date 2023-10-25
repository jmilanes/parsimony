require("dotenv").config();
import { Service } from "typedi";
import nodemailer, { Transporter, SendMailOptions } from "nodemailer";
import { EMAIL_TEMPLATES, emailGenerators } from "./emails/emails";

/**
 * The `EmailService` class is a service that allows sending emails using the
 * Nodemailer library. It is responsible for creating a transporter
 * and sending emails with the specified options.
 */
@Service()
export class EmailService {
  #senderEmail: string = process.env.EMAIL_SERVICE_SENDER_EMAIL || "";
  #transporter: Transporter;

  constructor() {
    this.#transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: this.#senderEmail,
        pass: process.env.EMAIL_SERVICE_PASSWORD
      }
    });
  }

  public sendByTemplate<K = EMAIL_TEMPLATES>(
    template: K,
    // @ts-ignore
    ...options: Parameters<(typeof emailGenerators)[K]>
  ) {
    // @ts-ignore
    this.#send(emailGenerators[template](...options));
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
