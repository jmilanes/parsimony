import { createUserEmailTemplate } from "../templates/createdUser.email.template";

export const generateCreateUserOptions = ({
  email,
  tpw
}: {
  email: string;
  tpw: string;
}) => {
  return {
    to: email,
    subject: "Temporary Password From Parsimony",
    html: createUserEmailTemplate(tpw)
  };
};
