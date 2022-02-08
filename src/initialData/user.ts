import { UserRoles } from "../enums";
import { IUser } from "../types";

const initalUserData: IUser = {
  id: "",
  contactInformation: {
    firstName: "",
    lastName: "",
    dateOfBirth: new Date(),
    phone: "",
    contacts: []
  },
  dateCreated: new Date(),
  dateEdited: new Date(),
  schoolId: "School_01",
  roles: [UserRoles.Director],
  type: UserRoles.Director
};

export default initalUserData;
