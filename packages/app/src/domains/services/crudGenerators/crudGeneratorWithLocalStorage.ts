import { Domains } from "@parsimony/types/dist";
import { ICrudGenerator, IId } from "@parsimony/types/dist";

const crudGeneratorWithLocalStorage = <Schema>(domainName: Domains) => {
  if (!localStorage[domainName]) {
    localStorage.setItem(domainName, "{}");
    localStorage.setItem(`${domainName}_count`, "0");
  }

  const getDomainFromLocalStorage = (name: string) => () =>
    JSON.parse(localStorage.getItem(name) || "{}");

  const setDomainInLocalStorage =
    (name: string) => (domain: Record<string, Schema>) =>
      localStorage.setItem(name, JSON.stringify(domain));

  const getDomain = getDomainFromLocalStorage(domainName);
  const setDomain = setDomainInLocalStorage(domainName);

  return class Service implements ICrudGenerator<Schema> {
    count: number;

    constructor() {
      this.count = 0;
    }

    create = (payload: Schema): string => {
      let count = parseInt(localStorage.getItem(`${domainName}_count`) || "0");
      const uuid: IId = `${domainName}_${count}`;
      const domain = getDomain();
      domain[uuid] = { ...payload, id: uuid };
      setDomain(domain);
      localStorage.setItem(`${domainName}_count`, (++count).toString());
      return uuid;
    };
    get = (id: string): Schema => {
      const domain = getDomain();
      return domain[id];
    };
    getAll = (): Schema[] => {
      const domain = getDomain();
      return Object.values(domain);
    };
    delete = (id: string) => {
      const domain = getDomain();
      delete domain[id];
      setDomain(domain);
    };
    update = (payload: Schema & { id: string }) => {
      const domain = getDomain();
      domain[payload.id] = payload;
      setDomain(domain);
    };
  };
};

export default crudGeneratorWithLocalStorage;
