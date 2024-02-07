import RequestService from "../domains/requests/request.Service";

import { Service } from "typedi";
import { Domains } from "@parsimony/types/dist";
import { cloneDeep } from "lodash";

type CreateItems = { domain: Domains; id: string };
type PAYLOAD = any;

export const createTargetUuidKey = (domain: Domains, index: number) =>
  `__ID:${domain}:${index}`;

/**
 * Utility for clean testing and DB set up
 *
 *
 */
@Service()
export class MockDBService {
  #rs: RequestService;
  #uuidMap: Record<string, string> = {};
  #createItems: CreateItems[] = [];

  constructor(rs: RequestService) {
    this.#rs = rs;
  }

  public getUuidByKey(key: string) {
    return this.#uuidMap[key];
  }

  public async setUpData(data: Partial<Record<Domains, PAYLOAD[]>>) {
    const domainsToSetUp = Object.entries(cloneDeep(data));
    for (const [key, payloads] of domainsToSetUp) {
      for (const i in payloads) {
        const domain = key as unknown as Domains;
        const payload = this.#parseDomains(payloads[i]);
        const item = await this.#rs.requests[domain]?.create(payload);
        this.#createItems.push({ domain, id: item.id });
        this.#uuidMap[createTargetUuidKey(domain, parseInt(i))] = item.id;
      }
    }
  }

  /*
      Meant to be run after every test
   */
  public async cleanUp() {
    await Promise.all(
      this.#createItems.map((item) => {
        return this.#rs.requests[item.domain]?.delete({ id: item.id });
      })
    );

    this.#uuidMap = {};
    this.#createItems = [];
  }

  /*
    Only top level keys are allow to have reference to other mongo object (at the time of writing this)

    This mocks that and makes it easier to stub out data for the tests

    Values that reference the mongo ids are either a string or array of tring

    This is relying on mutations!

    `__ID:${domain}:${index}`

    This is based on the order of which the data is added to the db!
   */
  #parseDomains(payload: Record<string, unknown>) {
    // for evey check value if not in idMap move on else update. If object recurse.
    const keys = Object.keys(payload);
    for (const key of keys) {
      const value = payload[key];
      if (typeof value === "string") {
        const matchedId = this.#uuidMap[value];
        if (matchedId) {
          payload[key] = matchedId;
        }
      }

      if (Array.isArray(value)) {
        payload[key] = value.map((arrayValue) => {
          if (typeof arrayValue === "string") {
            const matchedId = this.#uuidMap[arrayValue];
            if (matchedId) {
              return matchedId;
            }
          }
          return arrayValue;
        });
      }
    }

    return payload;
  }
}
