import CryptoJS from "crypto-js";

export const encrypt = (str: string) =>
  CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(str));

export const decrypy = (data: string) =>
  CryptoJS.enc.Base64.parse(data).toString(CryptoJS.enc.Utf8);
