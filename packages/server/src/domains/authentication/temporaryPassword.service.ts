import { Service } from "typedi";
import otpGenerator from "otp-generator";

/**
 * The `TemporaryPasswordService` class is responsible for generating
 * temporary passwords and validating them.
 * It uses the `otp-generator` library to generate 6-digit passwords and
 * stores them in a private field called `#tempPasswords`.
 *
 * The passwords are associated with email addresses and are automatically
 * deleted after a specified duration.
 */
@Service()
export class TemporaryPasswordService {
  #tempPasswords: Record<string, string> = {};

  get TempPasswords() {
    return this.#tempPasswords;
  }

  public create(email: string, duration: number = 600000) {
    const tempPassword = otpGenerator.generate(6);
    this.#tempPasswords[email] = tempPassword;
    setInterval(() => {
      this.delete(email);
    }, duration);
    return tempPassword;
  }

  public validate(email: string, tpw: string) {
    return this.#tempPasswords[email] === tpw;
  }

  public delete(email: string) {
    delete this.#tempPasswords[email];
  }
}
