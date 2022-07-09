import { IUser } from "@parsimony/types";
import { UserRoles } from "@parsimony/types";

export const mockUserData: IUser[] = [
  {
    id: "",
    contactInformation: {
      firstName: "Molly",
      lastName: "Milanes",
      dateOfBirth: new Date(),
      phone: "1-111-111-1111",
      contacts: []
    },
    dateCreated: new Date(),
    dateEdited: new Date(),
    schoolId: "School_01",
    roles: [UserRoles.Director],
    type: UserRoles.Director
  },
  {
    id: "",
    contactInformation: {
      firstName: "Joey",
      lastName: "Milanes",
      dateOfBirth: new Date(),
      phone: "1-111-111-1111",
      contacts: []
    },
    dateCreated: new Date(),
    dateEdited: new Date(),
    schoolId: "School_01",
    roles: [UserRoles.Director],
    type: UserRoles.Director
  }
];
