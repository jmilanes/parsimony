import React from "react";

import { Collection, Domains } from "@parsimony/types";

import { Container } from "typedi";
import UIApi from "../../domains/uiApi/uiApi.Service";
import { useAsync } from "react-use";

export type AncestorOnClickAction = (c?: Collection) => void;
const AncestorNavigationContainer = ({
  collection,
  onClick
}: {
  collection: Collection;
  onClick: AncestorOnClickAction;
}) => {
  const API = Container.get(UIApi);

  useAsync(async () => {
    await Promise.all(
      (collection.ancestors || []).map(
        async (id) =>
          await API.system.makeRequest({
            domain: Domains.Collection,
            requestType: "get",
            payload: { id }
          })
      )
    );
  }, [collection]);

  const ancestors =
    collection.ancestors?.map((id) =>
      API.system.getItem(Domains.Collection, id || "")
    ) || [];

  return (
    <div className="flex-row ancestor-navigation parsimony-container">
      <div className="flex-row">
        <a onClick={() => onClick()}>Books</a>
        <p>{`>`}</p>
      </div>
      {ancestors?.map((c) => (
        <div className="flex-row">
          <a onClick={() => onClick(c)}>{c?.title}</a>
          <p>{`>`}</p>
        </div>
      ))}
    </div>
  );
};

export default AncestorNavigationContainer;
