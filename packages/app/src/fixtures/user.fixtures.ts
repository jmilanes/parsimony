import { ServiceProviders, User, UserRoles } from "@parsimony/types";
import { IOption } from "../view/components";

export const initialUserData: Partial<User> = {
  firstName: "",
  lastName: "",
  dateOfBirth: new Date(),
  phone: "",
  contacts: [],
  clients: [],
  programs: [],
  actionItems: [],
  roles: [UserRoles.Director],
  type: UserRoles.Director,
  email: "",
  serviceProvider: ""
};

export const serviceProviderOptions: IOption[] = [
  { name: ServiceProviders.BCBA, value: ServiceProviders.BCBA },
  {
    name: ServiceProviders.ABA_SPECIALIST,
    value: ServiceProviders.ABA_SPECIALIST
  },
  { name: ServiceProviders.OT, value: ServiceProviders.OT },
  { name: ServiceProviders.SLP, value: ServiceProviders.SLP },
  { name: ServiceProviders.COUNSELOR, value: ServiceProviders.COUNSELOR },
  { name: ServiceProviders.PSYCH, value: ServiceProviders.PSYCH },
  {
    name: ServiceProviders.SOCIAL_WORKER,
    value: ServiceProviders.SOCIAL_WORKER
  },
  { name: ServiceProviders.SPED, value: ServiceProviders.SPED },
  { name: ServiceProviders.Other, value: ServiceProviders.Other }
];
