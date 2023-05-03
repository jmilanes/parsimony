import React, { useEffect, useState } from "react";

import {
  BookPageMetaTestIds,
  Collection,
  CollectionCategories,
  Domains
} from "@parsimony/types";

import { initialCollectionData } from "../../fixtures";
import { Field } from "../../components";
import { AddForm } from "../addForm.container";
import { useServices } from "../../context";
import { Container } from "typedi";
import { CommandService } from "../../domains/commands/command.service";
import { removeMongoIds } from "../../utils";

export type ICollectionAddFormProps = React.PropsWithChildren<{
  show: boolean;
  setShowCb: (payload: boolean) => void;
  parentId?: string;
  book?: boolean;
}>;

export const CollectionAddForm = ({
  show,
  setShowCb,
  parentId,
  book
}: ICollectionAddFormProps) => {
  const CS = Container.get(CommandService);
  const { stateManager } = useServices();

  const [initialData, updateInitialData] = React.useState<Collection>(
    initialCollectionData
  );
  const [localState, updateLocalState] = React.useState<Collection>(
    initialCollectionData
  );

  useEffect(() => {
    if (book) {
      updateLocalState(initialCollectionData);
      updateInitialData(initialCollectionData);
    } else {
      const parent = CS.api.getItem<Collection>({
        domain: Domains.Collection,
        id: parentId
      });

      const collectionInitialData = {
        ...initialCollectionData,
        ancestors: book
          ? []
          : [...(parent?.ancestors || []), parent?.id as string],
        category: book ? CollectionCategories.Book : CollectionCategories.Sub,
        parentCollectionId: parent?.id
      };

      updateLocalState(collectionInitialData);
      updateInitialData(collectionInitialData);
    }
  }, [parentId]);

  const updateState = stateManager.updateLocalState({
    localState,
    updateLocalState
  });

  const submitAddForm = () => {
    CS.api.makeRequest({
      domain: Domains.Collection,
      requestType: "create",
      payload: removeMongoIds(localState)
    });
    setShowCb(false);
    updateLocalState(initialData);
  };

  return (
    <AddForm
      showForm={show}
      onCreate={submitAddForm}
      title="Add Book"
      onCancel={() => setShowCb(false)}
    >
      <Field
        placeHolderText="Book Tile"
        pathToState="title"
        value={localState.title}
        updateState={updateState}
        metaTestId={BookPageMetaTestIds.nameField}
      />
    </AddForm>
  );
};
