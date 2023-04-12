import { modelTypes } from "../../database";
import { CrudResolvers } from "../createCrudResolver";

export default new CrudResolvers(modelTypes.user);
