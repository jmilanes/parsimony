import RequestService from "../domains/requests/request.Service";

import { Service } from "typedi";
import { Domains } from "@parsimony/types/dist";

type CreateItems = { domain: Domains; id: string };
type PAYLOAD = any;

/**
 * Utility for clean testing and DB set up
 *
 *
 */
@Service()
export default class MockDBService {
  #rs: RequestService;
  #createItems: CreateItems[] = [];

  constructor(rs: RequestService) {
    this.#rs = rs;
  }

  public async setUpData(data: Partial<Record<Domains, PAYLOAD[]>>) {
    const domainsToSetUp = Object.entries(data);
    for (const [key, payloads] of domainsToSetUp) {
      for (const payload of payloads) {
        const domain = key as unknown as Domains;
        const item = await this.#rs.requests[domain]?.create(payload);
        this.#createItems.push({ domain, id: item.id });
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

    this.#createItems = [];
  }
}
