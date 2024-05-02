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
  CollectionPageMetaTestIds
} from "@parsimony/types";

import { getRouterParams } from "../../utils";

import { Container } from "typedi";
import { useAsync } from "react-use";
import { Spin } from "antd";
import UIApi from "../../domains/accessApis/uiApi/uiApi.Service";
import CollectionViewerContainer from "../containers/collection/collecitonViewer.container";

const CollectionPage = () => {
  const API = Container.get(UIApi);

  const { collectionId } = getRouterParams();

  const navigate = API.Navigate;

  const { loading } = useAsync(async () => {
    //TODO: Need to figure out how I want to access Domains stuff ()
    if (!collectionId) {
      return;
    }
    await API.system.Requests.collection.get(collectionId);
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
          collection?.category === CollectionCategories.Book
            ? "Book"
            : "Collection"
        }: ${collection?.title}`}
        size="page"
        extra={[
          <Button
            key="add-program"
            name="Add Program"
            onClick={() =>
              API.actions.toggle.setToggleActiveState("programForm", true)
            }
            hidden={API.actions.toggle.getToggleActiveState("programForm")}
            metaTestId={CollectionPageMetaTestIds.addProgramBtn}
          />,
          <Button
            key="add-behavior"
            name="Add Behavior"
            onClick={() =>
              API.actions.toggle.setToggleActiveState("behaviorForm", true)
            }
            hidden={API.actions.toggle.getToggleActiveState("behaviorForm")}
            metaTestId={CollectionPageMetaTestIds.addBehaviorBtn}
          />,
          <Button
            key="add-collection"
            name="Add Collection"
            onClick={() =>
              API.actions.toggle.setToggleActiveState("collectionForm", true)
            }
            hidden={API.actions.toggle.getToggleActiveState("collectionForm")}
            metaTestId={CollectionPageMetaTestIds.addCollectionBtn}
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
        show={API.actions.toggle.getToggleActiveState("collectionForm")}
        setShowCb={(b) =>
          API.actions.toggle.setToggleActiveState("collectionForm", b)
        }
        parentId={collectionId}
      ></CollectionAddForm>
      <ProgramAddForm
        show={API.actions.toggle.getToggleActiveState("programForm")}
        setShowCb={(b) =>
          API.actions.toggle.setToggleActiveState("programForm", b)
        }
        collectionId={collectionId || ""}
      />
      <BehaviorAddForm
        show={API.actions.toggle.getToggleActiveState("behaviorForm")}
        setShowCb={(b) =>
          API.actions.toggle.setToggleActiveState("behaviorForm", b)
        }
        collectionId={collectionId || ""}
      />
    </>
  );
};

export default CollectionPage;
