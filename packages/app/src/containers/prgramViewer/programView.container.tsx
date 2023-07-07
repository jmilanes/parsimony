import React from "react";

import { Container } from "typedi";
import UIApi from "../../domains/uiApi/uiApi.Service";
import { Header } from "../../components";
import { ClientSelector } from "../clientSelector";
import { CollectionCategories, Domains } from "@parsimony/types";
import { Tree } from "../../components/tree.componet";
import { findTopLevelCollection } from "../../utils";
import { useAsync } from "react-use";
import { Spin } from "antd";

export const ProgramViewContainer = () => {
  const API = Container.get(UIApi);
  const navigate = API.Navigation;

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

  const { ret: topLevelCollections } = findTopLevelCollection(collections);

  const onClick = (id: string, isProgram: boolean = false) => {
    const route = isProgram ? "programs/" : "books/";
    navigate(`${route}${id}`);
  };

  const onChange = () => {};
  // If no client show only main bock/programs
  // If selected only take CLIENT and matching the clent id
  // Tree needs a way to click to the page

  return (
    <div>
      <Header text="Choose Client:" size="md" />
      <ClientSelector onChange={onChange} multiSelect={false} />
      <Header text="Programs:" size="sm" marginTop={20} />
      <Tree collections={topLevelCollections} actions={{ onClick }} />
    </div>
  );
};
