import { User, UserRoles } from "@parsimony/types";

export const initialUserData: Partial<User> = {
  firstName: "",
  lastName: "",
  dateOfBirth: new Date(),
  phone: "",
  contacts: [],
  schoolId: "School_01",
  roles: [UserRoles.Director],
  type: UserRoles.Director,
  email: "joey@gmail.com",
  password: "123456789"
};
