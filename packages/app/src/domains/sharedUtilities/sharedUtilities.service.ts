import { Service } from "typedi";
import TransformsUtils from "./transforms.utils";

/**
 * API Between service and UI Layer
 *
 *
 */
@Service()
export default class SharedUtilitiesService {
  #transforms: TransformsUtils;

  constructor(transformUtils: TransformsUtils) {
    this.#transforms = transformUtils;
  }

  get transform() {
    return this.#transforms;
  }
}
