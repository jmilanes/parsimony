import { Collections } from "@parsimony/types/src";
import { capitalize } from "../../../utils";

const generateCrudOperationStrings = (
  collection: Collections,
  fullSchema: string
) => {
  const type = capitalize(collection);

  const getAll = `
  query GetAll${type}s {
    getAll${type}s {
      ${fullSchema}
    }
  }
`;

  const get = `
  query Get${type}($payload: Get${type}Payload) {
    get${type}(payload: $payload) {
      ${fullSchema}
    }
  }
`;

  const create = `
    mutation Create${type}($payload: Create${type}Payload) {
      create${type}(payload: $payload) {
        ${fullSchema}
      }
    }
  `;

  const deleteItem = `
  mutation Delete${type}($payload: Delete${type}Payload) {
    delete${type}(payload: $payload)
  }
  `;

  const edit = `
  mutation Update${type}($payload: Update${type}Payload) {
    update${type}(payload: $payload) {
      ${fullSchema}
    } 
  }
  `;

  return {
    getAll,
    get,
    create,
    deleteItem,
    edit
  };
};

export default generateCrudOperationStrings;
