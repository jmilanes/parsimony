import React from "react";

import { Collection, Domains } from "@parsimony/types";

import { Container } from "typedi";
import UIApi from "../../../domains/accessApis/uiApi/uiApi.Service";
import { useAsync } from "react-use";

export type AncestorOnClickAction = (c?: Collection) => void;
const AncestorNavigationContainer = ({
  collection,
  onClick,
  rootText
}: {
  collection: Collection;
  onClick?: AncestorOnClickAction;
  rootText?: string;
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
  });

  const ancestors =
    collection?.ancestors?.map((id) =>
      API.system.getItem(Domains.Collection, id || "")
    ) || [];

  return ancestors ? (
    <div className="flex-row ancestor-navigation parsimony-container">
      <div className="flex-row">
        <p>{`<`}</p>
        <a onClick={() => onClick && onClick()}>{rootText}</a>
      </div>
      {ancestors?.map((c, i) => (
        <div key={i} className="flex-row">
          <p>{`<`}</p>
          <a
            onClick={() => {
              onClick && onClick(c);
            }}
          >
            {c?.title}
          </a>
        </div>
      ))}
    </div>
  ) : null;
};

export default AncestorNavigationContainer;
