import React from "react";
import { Autocomplete } from "../../components";
import {
  Collection,
  CollectionMetaTestIds,
  Domains,
  Program
} from "@parsimony/types";
import { Container } from "typedi";
import UIApi from "../../../domains/accessApis/uiApi/uiApi.Service";

import { useAsync } from "react-use";

type CollectionSelectorContainerProps = {
  entity: Program | Collection;
};

export const CollectionSelectorContainer = ({
  entity
}: CollectionSelectorContainerProps) => {
  const API = Container.get(UIApi);

  const { loading } = useAsync(async () => {
    await API.actions.collectionRelocation.init(entity);
  });

  if (loading) return null;

  const collections = API.system.getItemsFromStore(Domains.Collection);

  const options = collections
    .filter(
      (collection) =>
        collection.clientId === entity.clientId &&
        entity.id !== collection.id &&
        !collection.ancestors?.includes(entity?.id)
    )
    .map((collection: Collection) => ({
      label: collection.title || "",
      value: collection.id
    }));

  return (
    <Autocomplete
      label="Select Collection"
      options={options}
      multiSelect={false}
      onChange={(opt) => {
        API.actions.collectionRelocation.setActiveCollection(opt?.label);
      }}
      metaTestId={CollectionMetaTestIds.selector}
    />
  );
};
