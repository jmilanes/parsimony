import React from "react";

import { Container } from "typedi";
import UIApi from "../../../../domains/accessApis/uiApi/uiApi.Service";
import { Header, IOption } from "../../../components";
import { ClientSelector } from "../../shared/clientSelector";
import {
  Collection,
  CollectionCategories,
  CollectionTypes,
  Domains
} from "@parsimony/types";
import { CollectionTree } from "../../../components/tree.componet";
import { findTopLevelCollection } from "../../../../utils";
import { useAsync } from "react-use";
import { Spin } from "antd";

export const ProgramViewContainer = () => {
  const API = Container.get(UIApi);
  const navigate = API.Navigate;

  const selectedClientId = API.system.getAppState("programViewer").clientId;

  const { loading } = useAsync(async () => {
    if (selectedClientId) {
      await API.system.Requests.operation.getAllByRelationship({
        model: Domains.Collection,
        relationshipProperty: "clientId",
        id: selectedClientId
      });
    } else {
      await API.system.Requests.operation.getAllByRelationship({
        model: Domains.Collection,
        relationshipProperty: "category",
        id: CollectionCategories.Book
      });
    }
  }, [selectedClientId]);

  if (loading) return <Spin />;

  const collectionFilter = (c: Collection) => {
    if (selectedClientId) {
      return c.clientId === selectedClientId;
    }
    return (
      c.category === CollectionCategories.Book &&
      c.type === CollectionTypes.Main
    );
  };

  const collections = API.system
    .getItemsFromStore(Domains.Collection)
    .filter(collectionFilter);

  const { ret: topLevelCollections } = findTopLevelCollection(collections);

  const onClick = (id: string, isProgram: boolean = false) => {
    const route = isProgram ? "programs/" : "books/";
    navigate(`${route}${id}`);
  };

  const onChange = (option: IOption) => {
    const clientId = option ? (option.value as string) : undefined;
    API.system.updateAppState("programViewer", {
      clientId
    });
  };

  return (
    <div>
      <Header text="Choose Client:" size="md" />
      <ClientSelector onChange={onChange} multiSelect={false} />
      <Header text="Programs:" size="sm" marginTop={20} />
      <CollectionTree
        clientName={
          API.actions.programViewer.getSelectedClient()?.firstName || ""
        }
        collections={topLevelCollections}
        actions={{ onClick }}
      />
    </div>
  );
};
