import React, { useState } from "react";
import {
  Button,
  Checkbox,
  Header,
  IColumns,
  ITableAction
} from "../../components";
import { AncestorOnClickAction, CollectionTable, ProgramTable } from "../index";
import {
  Collection,
  Domains,
  Program,
  CollectionPageMetaTestIds,
  ProgramViewTypes
} from "@parsimony/types";

import { Container } from "typedi";
import { useAsync } from "react-use";

import { DATA_HANDLERS } from "../../../domains/orchestration/orchestrationHandlers/handlers.typemap";
import UIApi from "../../../domains/accessApis/uiApi/uiApi.Service";
import AncestorNavigationContainer from "./ancestorNavigation.container";
import parse from "html-react-parser";
import { isArray } from "chart.js/helpers";
import { isBehavior } from "../../../utils";

export const parseHTMLObj = (v: any) => {
  if (isArray(v) || !v) {
    return "";
  }
  return parse(v?.editor?.getHTML() || (v.length && v) || "");
};

const programColumns: IColumns[] = [
  { key: "title", title: "title" },
  {
    key: "description",
    title: "Description",
    displayFn: parseHTMLObj
  },
  {
    key: "chaining.type",
    title: "Chaining",
    displayFn: (v) => (v ? v : "N/A")
  }
];

const behaviorColumns: IColumns[] = [
  { key: "title", title: "title" },
  {
    key: "description",
    title: "Description",
    displayFn: parseHTMLObj
  },
  {
    key: "behavior.type",
    title: "Type",
    displayFn: (v) => (v ? v : "N/A")
  }
];
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

  const programs = allPrograms.filter((program) => !isBehavior(program));

  const behaviors = allPrograms.filter((program) => isBehavior(program));

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
      <CollectionTable
        collections={collections}
        actions={collectionActions}
        metaTestId={CollectionPageMetaTestIds.collectionTable}
      />
      <Header text="Programs" size="table" />
      <ProgramTable
        metaTestId={CollectionPageMetaTestIds.table}
        programs={programs}
        actions={programActions}
        columns={programColumns}
      />
      <Header text="Behaviors" size="table" />
      <ProgramTable
        metaTestId={CollectionPageMetaTestIds.behaviorTable}
        programs={behaviors}
        actions={programActions}
        columns={behaviorColumns}
      />
    </>
  );
};

export default CollectionViewerContainer;
