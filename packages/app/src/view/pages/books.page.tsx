import React from "react";

import { Button, Header, ITableAction } from "../components";
import {
  BookPageMetaTestIds,
  Collection,
  CollectionCategories,
  CollectionTypes,
  Domains,
  Pages,
  Program
} from "@parsimony/types/dist";
import {
  CollectionAddForm,
  CollectionTable,
  OpenBulkProgramButton
} from "../containers";

import { Container } from "typedi";

import { useAsync } from "react-use";
import { Spin } from "antd";
import UIApi from "../../domains/accessApis/uiApi/uiApi.Service";
import { navigateToRoute } from "../../utils";

const Books = () => {
  const API = Container.get(UIApi);
  const [showAddForm, setShowAddForm] = React.useState(false);
  const navigate = navigateToRoute();

  const { loading } = useAsync(async () => {
    await API.system.makeRequest({
      domain: Domains.Collection,
      requestType: "getAllByRelationship",
      payload: {
        relationshipProperty: "category",
        id: CollectionCategories.Book
      }
    });
  });
  if (loading) return <Spin />;

  const collections = API.system
    .getItemsFromStore(Domains.Collection)
    .filter(
      (x) =>
        x.category === CollectionCategories.Book &&
        x.type === CollectionTypes.Main
    );

  const collectionActions: ITableAction[] = [
    {
      name: "Open",
      method: (collection: Collection) => navigate(`/books/${collection.id}`)
    }
  ];

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
          />,
          <OpenBulkProgramButton />
        ]}
      />

      <CollectionTable collections={collections} actions={collectionActions} />
      <CollectionAddForm
        show={showAddForm}
        setShowCb={setShowAddForm}
        book={true}
      />
    </>
  );
};

export default Books;
