import { IOption } from "../components/selector";
import { UserRoles } from "@parsimony/types";
import { IUser } from "@parsimony/types";

const initialUserData: IUser = {
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

export default initialUserData;
