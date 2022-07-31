import { modelTypes } from "../../database/models";
import createCrudResolver from "../createCrudResolver";

export default createCrudResolver(modelTypes.school);
