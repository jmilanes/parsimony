import React, { useEffect } from "react";

import {
  BookPageMetaTestIds,
  Collection,
  CollectionCategories,
  Domains
} from "@parsimony/types";

import { initialCollectionData } from "../../fixtures";
import { Field } from "../../components";
import { AddForm } from "../addForm.container";

import { Container } from "typedi";

import { removeMongoIds } from "../../utils";
import UIApi from "../../domains/uiApi/uiApi.Service";

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
  const API = Container.get(UIApi);

  const stateManager = API.system.StateService;

  const [initialData, updateInitialData] = React.useState<Collection>(
    initialCollectionData
  );

  // TODO In general We need to rename localState to something else and make better. It really is just the form state
  const [localState, updateLocalState] = React.useState<Collection>(
    initialCollectionData
  );

  const getCollectionInitialData = () => {
    const parent = API.system.getItem(Domains.Collection, parentId);
    return {
      ...initialCollectionData,
      ancestors: [...(parent?.ancestors || []), parent?.id],
      category: CollectionCategories.Sub,
      parentCollectionId: parentId
    };
  };

  useEffect(() => {
    // Need to make this better but if book or parent ID changes we need to reset the the initial data
    if (book) {
      updateLocalState(initialCollectionData);
      updateInitialData(initialCollectionData);
      return;
    } else {
      const collectionInitialData = getCollectionInitialData();
      updateLocalState(collectionInitialData);
      updateInitialData(collectionInitialData);
    }
  }, [parentId, book]);

  const updateState = stateManager.updateLocalState({
    localState,
    updateLocalState
  });

  const submitAddForm = async () => {
    await API.system.makeRequest({
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
