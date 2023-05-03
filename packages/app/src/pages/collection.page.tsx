import React, { useEffect, useState } from "react";
import { Button, Header } from "../components";
import {
  CollectionAddForm,
  CollectionTable,
  ProgramAddForm,
  ProgramTable
} from "../containers";
import {
  Program,
  ProgramsPageMetaTestIds,
  Domains,
  Collection,
  CollectionCategories
} from "@parsimony/types";

import { getRouterParams } from "../utils";

import { Container } from "typedi";
import { CommandService } from "../domains/commands/command.service";

const Collection = () => {
  const CS = Container.get(CommandService);
  const { collectionId } = getRouterParams();

  const collection = CS.api.getItem<Collection>({
    domain: Domains.Collection,
    id: collectionId
  });

  useEffect(() => {
    if (!collection) {
      CS.api.makeRequest({
        domain: Domains.Collection,
        requestType: "get",
        payload: {
          id: collectionId
        }
      });
    } else {
      CS.api.makeRequest({
        domain: Domains.Program,
        requestType: "getAllByRelationship",
        payload: {
          relationshipProperty: "collectionId",
          id: collection.id
        }
      });

      CS.api.makeRequest({
        domain: Domains.Collection,
        requestType: "getAllByRelationship",
        payload: {
          relationshipProperty: "parentCollectionId",
          id: collection.id
        }
      });
    }
  }, [collection, collectionId]);

  const collections = CS.api.getItems<Collection[]>({
    domain: Domains.Collection
  });

  const programs = CS.api
    .getItems<Program[]>({
      domain: Domains.Program
    })
    .filter((p) => p.type === "MAIN" && p.collectionId === collectionId);

  console.log(programs);

  const [showProgramAddForm, setShowProductionForm] = React.useState(false);
  const [showCollectionAddForm, setCollectionShowAddForm] =
    React.useState(false);

  if (!collection || !collectionId) return null;
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
            key="add-collection"
            name="Add Collection"
            action={() => setCollectionShowAddForm(true)}
            hidden={showProgramAddForm}
            metaTestId={ProgramsPageMetaTestIds.addCollection}
          />
        ]}
      />

      <Header text="Collections" size="md" />
      <CollectionTable
        collections={collections.filter(
          (c) => c.id !== collectionId && c.parentCollectionId === collectionId
        )}
      />
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
        collectionId={collectionId}
      />
    </>
  );
};

export default Collection;
