import { StoreCollections } from "@parsimony/types";
import { ICrudGenerator, IId } from "@parsimony/types";

const crudGeneratorWithLocalStorage = <Schema>(
  collectionName: StoreCollections
) => {
  if (!localStorage[collectionName]) {
    localStorage.setItem(collectionName, "{}");
    localStorage.setItem(`${collectionName}_count`, "0");
  }

  const getCollectionFromLocalStorage = (name: string) => () =>
    JSON.parse(localStorage.getItem(name) || "{}");

  const setCollectionInLocalStorage =
    (name: string) => (collection: Record<string, Schema>) =>
      localStorage.setItem(name, JSON.stringify(collection));

  const getCollection = getCollectionFromLocalStorage(collectionName);
  const setCollection = setCollectionInLocalStorage(collectionName);

  return class Service implements ICrudGenerator<Schema> {
    count: number;

    constructor() {
      this.count = 0;
    }

    create = (payload: Schema): string => {
      let count = parseInt(
        localStorage.getItem(`${collectionName}_count`) || "0"
      );
      const uuid: IId = `${collectionName}_${count}`;
      const collection = getCollection();
      collection[uuid] = { ...payload, id: uuid };
      setCollection(collection);
      localStorage.setItem(`${collectionName}_count`, (++count).toString());
      return uuid;
    };
    get = (id: string): Schema => {
      const collection = getCollection();
      return collection[id];
    };
    getAll = (): Schema[] => {
      const collection = getCollection();
      return Object.values(collection);
    };
    delete = (id: string) => {
      const collection = getCollection();
      delete collection[id];
      setCollection(collection);
    };
    update = (payload: Schema & { id: string }) => {
      const collection = getCollection();
      collection[payload.id] = payload;
      setCollection(collection);
    };
  };
};

export default crudGeneratorWithLocalStorage;
