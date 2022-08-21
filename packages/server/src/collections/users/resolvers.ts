import { modelTypes } from "../../database/models";
import { CrudResolvers } from "../createCrudResolver";

export default new CrudResolvers(modelTypes.user);
