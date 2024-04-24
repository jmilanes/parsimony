import React, { useMemo } from "react";

import {
  BookPageMetaTestIds,
  Collection,
  CollectionCategories,
  Domains
} from "@parsimony/types";

import { initialCollectionData } from "../../../fixtures";
import { Field } from "../../components";
import { AddForm } from "../shared/addForm.container";

import { Container } from "typedi";

import { removeMongoIds } from "../../../utils";
import UIApi from "../../../domains/accessApis/uiApi/uiApi.Service";

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

  const getCollectionInitialData = () => {
    const parent = API.system.getItem(Domains.Collection, parentId);
    return {
      ...initialCollectionData,
      ancestors: [...(parent?.ancestors || []), parent?.id],
      category: CollectionCategories.Sub,
      parentCollectionId: parentId
    };
  };

  const form = useMemo(
    () =>
      //Need to destroy on use effect / CLEAN UP here especailly
      API.system.Form.create<Collection>(
        book ? initialCollectionData : getCollectionInitialData()
      ),
    [parentId, book]
  );

  const submitAddForm = async () => {
    await API.system.Requests.collection.create(removeMongoIds(form.Data));
    setShowCb(false);
    form.reset();
  };

  return (
    <AddForm
      showForm={show}
      onCreate={submitAddForm}
      title={parentId ? "Add Collection" : "Add Book"}
      onCancel={() => setShowCb(false)}
    >
      <Field
        placeHolderText={parentId ? "Collection Title" : "Book Tile"}
        value={form.Data.title}
        onChange={(value) => form.updateData({ title: value })}
        metaTestId={BookPageMetaTestIds.nameField}
      />
    </AddForm>
  );
};
