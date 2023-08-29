import React from "react";
import { Header, IColumns, ITableAction } from "../../components";
import {
  AncestorOnClickAction,
  CollectionTable,
  ProgramTable
} from "../../containers";
import { Domains, TargetStyle } from "@parsimony/types";

import { Container } from "typedi";
import { useAsync } from "react-use";
import { Spin } from "antd";

import { DATA_HANDLERS } from "../../domains/orchestration/orchestrationHandlers/handlers.typemap";
import UIApi from "../../domains/uiApi/uiApi.Service";
import AncestorNavigationContainer from "./ancestorNavigation.container";

const CollectionViewerContainer = ({
  collectionId,
  header,
  programActions,
  collectionActions,
  ancestorAction
}: {
  collectionId?: string;
  header?: boolean;
  programActions: ITableAction[];
  collectionActions: ITableAction[];
  ancestorAction: AncestorOnClickAction;
}) => {
  const API = Container.get(UIApi);

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
    .filter(
      (program) =>
        program.collectionId === collectionId &&
        program.targetStyle !== TargetStyle.Behavior
    );

  const behaviors = API.system
    .getItemsFromStore(Domains.Program)
    .filter(
      (program) =>
        program.collectionId === collectionId &&
        program.targetStyle === TargetStyle.Behavior
    );

  const programColumns: IColumns[] = [
    { key: "title", title: "title" },
    { key: "description", title: "Description" },
    {
      key: "chaining.type",
      title: "Chaining",
      displayFn: (v) => (v ? v : "N/A")
    }
  ];

  const behaviorColumns: IColumns[] = [
    { key: "title", title: "title" },
    { key: "description", title: "Description" },
    {
      key: "behavior.type",
      title: "Type",
      displayFn: (v) => (v ? v : "N/A")
    }
  ];

  return (
    <>
      {header && <Header text={collection.title || ""} size="table" />}
      <AncestorNavigationContainer
        collection={collection}
        onClick={ancestorAction}
      />
      <Header text="Collections" size="table" />
      <CollectionTable collections={collections} actions={collectionActions} />
      <Header text="Programs" size="table" />
      <ProgramTable
        programs={programs}
        actions={programActions}
        columns={programColumns}
      />
      <Header text="Behaviors" size="table" />
      <ProgramTable
        programs={behaviors}
        actions={programActions}
        columns={behaviorColumns}
      />
    </>
  );
};

export default CollectionViewerContainer;
