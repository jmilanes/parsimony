import { Email, EmailOptions } from "./emails";

import { Injectable } from "@nestjs/common";

@Injectable()
export class TempPasswordEmail implements Email {
  public createPayload({ email, tpw }: EmailOptions) {
    return {
      to: email,
      subject: "Temporary Password From Parsimony",
      html: this.#createTemplate(tpw)
    };
  }

  #createTemplate(tpw: string) {
    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Parsimony Temporary Password</title>
</head>
<body>
  <table cellspacing="0" cellpadding="0" border="0" align="center" width="100%">
    <tr>
      <td align="center" style="background-color: #f4f4f4; padding: 40px 0;">
        <table cellspacing="0" cellpadding="0" border="0" width="600">
          <tr>
            <td align="center" style="background-color: #ffffff; padding: 40px 20px; border-radius: 5px; box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.1);">
              <h1>Temporary Password</h1>
              <p>Your temporary password is: <strong>${tpw}</strong></p>
              <p>Please use this temporary password to <a href="https://parsimony.app/">log in to your account.</a></p>
              <p>If you didn't request this password change, please contact our support team immediately.</p>
              <p>Thank you for using our service!</p>
              <hr>
              <p style="font-size: 12px; color: #777;">This is an automated message. Please do not reply to this email.</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`;
  }
}
