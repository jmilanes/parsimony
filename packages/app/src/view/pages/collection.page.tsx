import React from "react";
import { Button, Header, ITableAction } from "../components";
import {
  BehaviorAddForm,
  CollectionAddForm,
  OpenBulkProgramButton,
  ProgramAddForm
} from "../containers";
import {
  Collection,
  CollectionCategories,
  Domains,
  Program,
  ProgramsPageMetaTestIds
} from "@parsimony/types/dist";

import { getRouterParams, navigateToRoute } from "../../utils";

import { Container } from "typedi";
import { useAsync } from "react-use";
import { Spin } from "antd";
import UIApi from "../../domains/accessApis/uiApi/uiApi.Service";
import CollectionViewerContainer from "../containers/collection/collecitonViewer.container";

const Collection = () => {
  const API = Container.get(UIApi);
  const { collectionId } = getRouterParams();
  const navigate = API.Navigation;
  const [showProgramAddForm, setShowProductionForm] = React.useState(false);
  const [showCollectionAddForm, setCollectionShowAddForm] =
    React.useState(false);
  const [showBehaviorAddForm, setBehaviorAShowAddForm] = React.useState(false);
  const { loading } = useAsync(async () => {
    await API.system.makeRequest({
      domain: Domains.Collection,
      requestType: "get",
      payload: { id: collectionId }
    });
  }, [collectionId]);
  if (loading) return <Spin />;

  const toCollection = (collection?: Collection) => {
    collection ? navigate(`/books/${collection.id}`) : navigate(`/books`);
  };

  const collection = API.system.getItem(Domains.Collection, collectionId);
  const collectionActions: ITableAction[] = [
    {
      name: "Open",
      method: toCollection
    }
  ];

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
      <CollectionViewerContainer
        ancestorRootText={"Books"}
        collectionId={collectionId}
        collectionActions={collectionActions}
        ancestorAction={toCollection}
      />
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
