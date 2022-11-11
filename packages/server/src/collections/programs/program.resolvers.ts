import { ICreateResolverParams } from "..";
import { modelTypes } from "../../database/models";
import { CrudResolvers } from "../createCrudResolver";

//TODO Delete all Program results when a program is deleted
class ProgramCrudResolver extends CrudResolvers {
  delete = ({ db }: ICreateResolverParams) => {
    return async (_: any, { payload }: { payload: any }) => {
      console.log("FROM Program Delete Extension");
      await db.deleteEntry(this.model, payload.id);
      return payload.id;
    };
  };
}

export default new ProgramCrudResolver(modelTypes.program);
