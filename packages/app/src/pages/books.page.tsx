import React, { useEffect } from "react";

import { Button, Table, Field, Header } from "../components";
import {
  Domains,
  Collection,
  BookPageMetaTestIds,
  Program
} from "@parsimony/types";
import { AddForm, CollectionAddForm } from "../containers";

import { IColumns, ITableAction } from "../components/table.component";

import { Pages } from "@parsimony/types";

import { useServices } from "../context";
import { Container } from "typedi";
import { CommandService } from "../domains/commands/command.service";
import { initialCollectionData } from "../fixtures/book.fixtures";
import { navigateToRoute } from "../utils";

const Books = () => {
  const CS = Container.get(CommandService);
  const navigate = navigateToRoute();

  const data = CS.api.getItems<Collection[]>({
    domain: Domains.Collection
  });

  useEffect(() => {
    CS.api.makeRequest({
      domain: Domains.Collection,
      requestType: "getAll"
    });
  }, []);

  const [showAddForm, setShowAddForm] = React.useState(false);

  const columns: IColumns[] = [
    { key: "title", dataIndex: "title", title: "title" }
  ];

  const actions: ITableAction[] = [
    {
      name: "Open",
      method: (collection: Collection) => navigate(`/books/${collection.id}`)
    },
    {
      name: "Delete",
      method: (collection: Required<Collection>) => {
        CS.api.makeRequest({
          domain: Domains.Collection,
          requestType: "delete",
          payload: { id: collection.id }
        });
      }
    }
  ];

  // TODO: Move Program Table and Collection table, Collection Add Program Vs More Collections, Fix By Relationship

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

      <Table
        data={data}
        columns={columns}
        actions={actions}
        name="Collections"
        metaTestId={BookPageMetaTestIds.table}
      />
      <CollectionAddForm show={showAddForm} setShowCb={setShowAddForm} />
    </>
  );
};

export default Books;
