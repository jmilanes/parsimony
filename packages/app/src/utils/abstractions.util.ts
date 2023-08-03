import { v4 as uuidv4 } from "uuid";
import _ from "lodash";
import { Domains, IObject, Program } from "@parsimony/types";
import cn from "classnames";
import { initialResultData } from "../fixtures";
import { RequestsTypeMap } from "../domains/requests/request.Service";

export const uuid = () => uuidv4();

export const clone = <T>(obj: Record<string, T>) => _.clone(obj);

export const setDataWithPath = (obj: IObject, path: string, value: unknown) =>
  _.set(obj, path, value);

export const getDataWithPath = (obj: IObject, path: string): unknown =>
  _.get(obj, path);

export const compileStyles = (classes: Record<string, boolean>) => cn(classes);

export const buildCreateBehaviorRequest = ({
  program,
  result
}: {
  program: Program;
  result: number;
}) => {
  const date = new Date();
  return {
    domain: Domains.Result,
    requestType: "create" as keyof RequestsTypeMap[Domains.Result],
    payload: {
      ...initialResultData,
      id: undefined,
      clientId: program?.clientId,
      programId: program?.id,
      behaviorData: {
        type: program.behavior?.type,
        result
      },
      created_at: date,
      updated_at: date
    }
  };
};
