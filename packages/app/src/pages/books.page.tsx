import React, { useEffect } from "react";

import { Button, Header } from "../components";
import {
  BookPageMetaTestIds,
  Collection,
  CollectionCategories,
  Domains,
  Pages
} from "@parsimony/types";
import { CollectionAddForm, CollectionTable } from "../containers";

import { Container } from "typedi";
import { CommandService } from "../domains/commands/command.service";

const Books = () => {
  const CS = Container.get(CommandService);

  const collections = CS.api
    .getItems<Collection[]>({
      domain: Domains.Collection
    })
    .filter((x) => x.category === CollectionCategories.Book);

  useEffect(() => {
    CS.api.makeRequest({
      domain: Domains.Collection,
      requestType: "getAllByRelationship",
      payload: {
        relationshipProperty: "category",
        id: CollectionCategories.Book
      }
    });
  }, []);

  const [showAddForm, setShowAddForm] = React.useState(false);

  return (
    <>
      <Header
        text={Pages.Books}
        size="page"
        extra={[
          <Button
            key="add"
            name="Add"
            action={() => setShowAddForm(true)}
            hidden={showAddForm}
            metaTestId={BookPageMetaTestIds.addBtn}
          />
        ]}
      />

      <CollectionTable collections={collections} />
      <CollectionAddForm
        show={showAddForm}
        setShowCb={setShowAddForm}
        book={true}
      />
    </>
  );
};

export default Books;
