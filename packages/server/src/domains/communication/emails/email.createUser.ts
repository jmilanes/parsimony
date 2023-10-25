import { Email, EmailOptions } from "./emails";
import { Service } from "typedi";

@Service()
export class CreatedUserEmail implements Email {
  public createPayload({ email, tpw }: EmailOptions) {
    return {
      to: email,
      subject: "Welcome to Parsimony!",
      html: this.#createUserEmailTemplate(tpw)
    };
  }

  #createUserEmailTemplate = (tpw: string) => {
    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Parsimony Welcome Email</title>
</head>
<body>
  <table cellspacing="0" cellpadding="0" border="0" align="center" width="100%">
    <tr>
      <td align="center" style="background-color: #f4f4f4; padding: 40px 0;">
        <table cellspacing="0" cellpadding="0" border="0" width="600">
          <tr>
            <td align="center" style="background-color: #ffffff; padding: 40px 20px; border-radius: 5px; box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.1);">
              <h1>Welcome to Parsimony!</h1>
              
              <p>Your temporary password is: <strong>${tpw}</strong></p>
              <p>Please use this email and your temporary password to <a href="https://parsimony.app/">log in to your account.</a></p>
              <p>If you are having trouble signing on reach out to your Director.</p>
              
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
  };
}
