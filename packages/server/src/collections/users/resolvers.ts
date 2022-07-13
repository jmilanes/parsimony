import { modelTypes } from "../../database/models";
import createCrudResolver from "../createCrudResolver";

const userResolver = createCrudResolver(modelTypes.user);

export default userResolver;
