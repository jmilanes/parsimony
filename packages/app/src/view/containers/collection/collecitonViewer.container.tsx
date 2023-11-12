import React from "react";
import { Header, IColumns, ITableAction } from "../../components";
import { AncestorOnClickAction, CollectionTable, ProgramTable } from "../index";
import {
  Collection,
  Domains,
  Program,
  TargetStyle
} from "@parsimony/types/dist";

import { Container } from "typedi";
import { useAsync } from "react-use";
import { Spin } from "antd";

import { DATA_HANDLERS } from "../../../domains/orchestration/orchestrationHandlers/handlers.typemap";
import UIApi from "../../../domains/accessApis/uiApi/uiApi.Service";
import AncestorNavigationContainer from "./ancestorNavigation.container";

const CollectionViewerContainer = ({
  collectionId,
  header,
  programActions,
  collectionActions,
  ancestorAction,
  ancestorRootText,
  passedCollections,
  passedPrograms
}: {
  collectionId?: string;
  header?: boolean;
  programActions?: ITableAction[];
  collectionActions: ITableAction[];
  ancestorAction?: AncestorOnClickAction;
  ancestorRootText?: string;
  passedCollections?: Collection[];
  passedPrograms?: Program[];
}) => {
  const API = Container.get(UIApi);

  const { loading } = useAsync(async () => {
    if ((passedPrograms && passedCollections) || !collectionId) {
      return;
    }
    await API.system.setUpDataFor(DATA_HANDLERS.COLLECTION_PAGE, {
      collectionId
    });
  }, [collectionId]);

  if (loading) return null;

  const collections =
    passedCollections ||
    API.system
      .getItemsFromStore(Domains.Collection)
      .filter(
        (c) => c.id !== collectionId && c.parentCollectionId === collectionId
      );

  const allPrograms =
    passedPrograms ||
    API.system
      .getItemsFromStore(Domains.Program)
      .filter((program) => program.collectionId === collectionId);

  const programs = allPrograms.filter(
    (program) => program.targetStyle !== TargetStyle.Behavior
  );

  const behaviors = allPrograms.filter(
    (program) => program.targetStyle === TargetStyle.Behavior
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

  const renderCollectionHeader = (collectionId: string) => {
    const collection = API.system.getItem(Domains.Collection, collectionId);
    return (
      <>
        {header && <Header text={collection.title || ""} size="table" />}
        <AncestorNavigationContainer
          collection={collection}
          onClick={ancestorAction}
          rootText={ancestorRootText}
        />
      </>
    );
  };

  return (
    <>
      {collectionId && renderCollectionHeader(collectionId)}
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
