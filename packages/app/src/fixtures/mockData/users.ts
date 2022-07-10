import { IUser } from "@parsimony/types";
import { UserRoles } from "@parsimony/types";

export const mockUserData: IUser[] = [
  {
    id: "",
    firstName: "Molly",
    lastName: "Milanes",
    dateOfBirth: new Date(),
    phone: "1-111-111-1111",
    contacts: [],
    dateCreated: new Date(),
    dateEdited: new Date(),
    schoolId: "School_01",
    roles: [UserRoles.Director],
    type: UserRoles.Director,
    password: "p345089",
    email: "molly@gmail.com"
  },
  {
    id: "",
    firstName: "Joey",
    lastName: "Milanes",
    dateOfBirth: new Date(),
    phone: "1-111-111-1111",
    contacts: [],
    dateCreated: new Date(),
    dateEdited: new Date(),
    schoolId: "School_01",
    roles: [UserRoles.Director],
    type: UserRoles.Director,
    password: "p345089",
    email: "joey@gmail.com"
  }
];
