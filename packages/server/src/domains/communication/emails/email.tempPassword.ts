import { temporaryPasswordEmailTemplate } from "../templates/temporaryPassword.email.template";

export const generateTempPasswordEmailOptions = ({
  email,
  tpw
}: {
  email: string;
  tpw: string;
}) => {
  return {
    to: email,
    subject: "Temporary Password From Parsimony",
    html: temporaryPasswordEmailTemplate(tpw)
  };
};
