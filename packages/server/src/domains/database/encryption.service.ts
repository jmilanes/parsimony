import { Injectable } from "@nestjs/common";

@Injectable()
export default class EncryptionService {
  #encryptMethod: (pw: string) => string;

  public encrypt(password: string) {
    return this.#encryptMethod(password);
  }

  public setEncryptMethod(encryptionMethod: (pw: string) => string) {
    this.#encryptMethod = encryptionMethod;
  }
}
