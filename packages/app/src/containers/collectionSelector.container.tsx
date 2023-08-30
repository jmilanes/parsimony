import React, { useEffect } from "react";
import { Autocomplete, Button, Header } from "../components";
import {
  Collection,
  CollectionSelector,
  Domains,
  Program
} from "@parsimony/types";
import { Container } from "typedi";
import UIApi from "../domains/uiApi/uiApi.Service";

import { getFullName } from "../utils";

type CollectionSelectorContainerProps = {
  program: Program;
};

export const CollectionSelectorContainer = ({
  program
}: CollectionSelectorContainerProps) => {
  const API = Container.get(UIApi);

  useEffect(() => {
    API.actions.programManipulation.init(program);
  });

  const collections = API.system.getItemsFromStore(Domains.Collection);

  const selected = API.actions.programManipulation.getSelectedId();
  const selectedCollection = selected
    ? API.system.getItem(Domains.Collection, selected)
    : undefined;

  const selectedUser = program.clientId
    ? API.system.getItem(Domains.User, program.clientId)
    : undefined;

  const selectedName = program.clientId ? getFullName(selectedUser) : undefined;

  const options = collections
    .filter((collection) => collection.clientId === program.collectionId)
    .map((collection: Collection) => ({
      label: collection.title || "",
      value: collection.id
    }));

  const SelectedView = () => {
    return (
      <div className="client-selector-selected-view">
        <Header text={`${selectedName || ""} ${program?.title}`} size="sm" />
        <Button
          name="Confirm"
          action={() => API.actions.programManipulation.updateProgram()}
          metaTestId={CollectionSelector.confirm}
        />
        <Button
          name="Cancel"
          action={() => API.actions.programManipulation.cancel()}
          metaTestId={CollectionSelector.cancel}
        />
      </div>
    );
  };

  return selected ? (
    <SelectedView />
  ) : (
    <Autocomplete
      label="Select user User"
      options={options}
      multiSelect={false}
      updateState={(v) =>
        API.actions.programManipulation.setActiveCollection(v)
      }
      metaTestId={CollectionSelector.selector}
    />
  );
};
