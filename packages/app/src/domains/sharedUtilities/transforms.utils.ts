import { Service } from "typedi";
import { get, set } from "lodash";

/**
 * API Between service and UI Layer
 *
 *
 */
@Service()
export default class TransformsUtils {
  constructor() {}

  public parseIntByPath = (obj: Record<string, any>, paths: string[]) => {
    for (const path of paths) {
      const val = get(obj, path);
      set(obj, path, parseInt(val) || undefined);
    }
    return obj;
  };
}
