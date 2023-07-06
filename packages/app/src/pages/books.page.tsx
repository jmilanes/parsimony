import React, { useEffect } from "react";

import { Button, Header } from "../components";
import {
  BookPageMetaTestIds,
  Collection,
  CollectionCategories,
  Domains,
  Pages
} from "@parsimony/types";
import {
  CollectionAddForm,
  CollectionTable,
  OpenBulkProgramButton
} from "../containers";

import { Container } from "typedi";

import { useAsync } from "react-use";
import { Spin } from "antd";
import UIApi from "../domains/uiApi/uiApi.Service";

const Books = () => {
  const API = Container.get(UIApi);
  const [showAddForm, setShowAddForm] = React.useState(false);

  const { loading } = useAsync(async () => {
    await API.makeRequest({
      domain: Domains.Collection,
      requestType: "getAllByRelationship",
      payload: {
        relationshipProperty: "category",
        id: CollectionCategories.Book
      }
    });
  });
  if (loading) return <Spin />;

  const collections = API.getItemsFromStore(Domains.Collection).filter(
    (x) => x.category === CollectionCategories.Book
  );

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
