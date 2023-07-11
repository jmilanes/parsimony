import { UserRoles } from "@parsimony/types";

export const validateRole =
  (roles: UserRoles[]) =>
  (next: any) =>
  (root: any, args: any, context: any, info: any) => {
    // TODO if we want type or roles we might just be able to kill roles and favor a single type
    if (!roles.some((r) => r === context.currentUser.type)) {
      throw new Error(`Unauthorized User Type! Please contact your Director!`);
    }

    return next(root, args, context, info);
  };
