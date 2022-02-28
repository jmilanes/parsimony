import { Collections } from "../enums";
import { IId } from "../types";

// ** This is a great example of where you would want to have an interface so if you provide something
// ** that abides by the contract then you will always have the same functionality throughout your app!
//TODO: Create an interface for the class (also attempt to make a functional version)
const crudGenerator = <Schema>(collectionName: Collections) => {
  return class Service {
    collection: Record<string, Schema>;
    count: number;
    constructor() {
      this.collection = {};
      this.count = 0;
    }

    create = (payload: Schema) => {
      const uuid: IId = `${collectionName}_${this.count}`;
      this.collection[uuid] = { ...payload, id: uuid };
      this.count = ++this.count;
    };
    get = (id: string): Schema => this.collection[id];
    getAll = (): Schema[] => Object.values(this.collection);
    delete = (id: string) => delete this.collection[id];
    update = (payload: Schema & { id: string }) =>
      (this.collection[payload.id] = payload);
  };
};

const crudGeneratorWithLocalStorage = <Schema>(collectionName: Collections) => {
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

  return class Service {
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
