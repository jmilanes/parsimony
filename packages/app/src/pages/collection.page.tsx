import React from "react";
import { Button, Header } from "../components";
import {
  BehaviorAddForm,
  CollectionAddForm,
  CollectionTable,
  OpenBulkProgramButton,
  ProgramAddForm,
  ProgramTable
} from "../containers";
import {
  CollectionCategories,
  Domains,
  ProgramsPageMetaTestIds
} from "@parsimony/types";

import { getRouterParams } from "../utils";

import { Container } from "typedi";
import { useAsync } from "react-use";
import { Spin } from "antd";

import { DATA_HANDLERS } from "../domains/orchestration/orchestrationHandlers/handlers.typemap";
import UIApi from "../domains/uiApi/uiApi.Service";

const Collection = () => {
  const API = Container.get(UIApi);
  const { collectionId } = getRouterParams();
  const [showProgramAddForm, setShowProductionForm] = React.useState(false);
  const [showCollectionAddForm, setCollectionShowAddForm] =
    React.useState(false);
  const [showBehaviorAddForm, setBehaviorAShowAddForm] = React.useState(false);
  const { loading } = useAsync(async () => {
    await API.system.setUpDataFor(DATA_HANDLERS.COLLECTION_PAGE, {
      collectionId
    });
  }, [collectionId]);
  if (loading) return <Spin />;

  const collections = API.system
    .getItemsFromStore(Domains.Collection)
    .filter(
      (c) => c.id !== collectionId && c.parentCollectionId === collectionId
    );
  const collection = API.system.getItem(Domains.Collection, collectionId);
  const programs = API.system
    .getItemsFromStore(Domains.Program)
    .filter((program) => program.collectionId === collectionId);

  return (
    <>
      <Header
        text={`${
          collection.category === CollectionCategories.Book
            ? "Book"
            : "Collection"
        }: ${collection?.title}`}
        size="page"
        extra={[
          <Button
            key="add-program"
            name="Add Program"
            action={() => setShowProductionForm(true)}
            hidden={showProgramAddForm}
            metaTestId={ProgramsPageMetaTestIds.addBtn}
          />,
          <Button
            key="add-behavior"
            name="Add Behavior"
            action={() => setBehaviorAShowAddForm(true)}
            hidden={showProgramAddForm}
            metaTestId={ProgramsPageMetaTestIds.addBehaviror}
          />,
          <Button
            key="add-collection"
            name="Add Collection"
            action={() => setCollectionShowAddForm(true)}
            hidden={showProgramAddForm}
            metaTestId={ProgramsPageMetaTestIds.addCollection}
          />,
          <OpenBulkProgramButton />
        ]}
      />

      <Header text="Collections" size="md" />
      <CollectionTable collections={collections} />
      <Header text="Programs" size="md" />
      <ProgramTable programs={programs} />
      <CollectionAddForm
        show={showCollectionAddForm}
        setShowCb={setCollectionShowAddForm}
        parentId={collectionId}
      ></CollectionAddForm>
      <ProgramAddForm
        show={showProgramAddForm}
        setShowCb={setShowProductionForm}
        collectionId={collectionId || ""}
      />
      <BehaviorAddForm
        show={showBehaviorAddForm}
        setShowCb={setBehaviorAShowAddForm}
        collectionId={collectionId || ""}
      />
    </>
  );
};

export default Collection;
