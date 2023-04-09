import { StoreCollections } from "@parsimony/types";
import { capitalize } from "@parsimony/utilities";

const generateCrudOperationStrings = (
  collection: StoreCollections,
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

  const getAllByRelationship = `
  query GetAll${type}sByRelationship($payload: GetAll${type}sByRelationshipPayload) {
    getAll${type}sByRelationship(payload: $payload) {
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
    getAllByRelationship,
    create,
    deleteItem,
    edit
  };
};

export default generateCrudOperationStrings;
