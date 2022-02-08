import { IUser } from "../types";
import { UserRoles } from "../enums";

export const mockUserData: IUser[] = [
  {
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
