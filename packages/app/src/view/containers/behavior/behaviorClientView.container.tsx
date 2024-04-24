import React from "react";

import { Container } from "typedi";
import UIApi from "../../../domains/accessApis/uiApi/uiApi.Service";

import { useAsync } from "react-use";
import {
  BehaviorMetaTestIds,
  Domains,
  Program,
  ProgramViewTypes
} from "@parsimony/types";
import { Spin } from "antd";
import { getFullName, isBehavior } from "../../../utils";
import { BehaviorClient } from "../../../domains/state/appState/appState.types";
import { behaviorInputFactory } from "./behaviorInput.factory";
import { Button } from "../../components";

export const BehaviorClientView = ({ client }: { client: BehaviorClient }) => {
  const API = Container.get(UIApi);

  const { loading } = useAsync(async () => {
    await API.system.Requests.operation.getAllByRelationship({
      model: Domains.Program,
      relationshipProperty: "clientId",
      id: client.id
    });
  }, []);

  if (loading) return <Spin />;

  const hide = () => {
    API.actions.behaviorTracker.setActiveClientFalse(client.id);
  };
  const show = () => {
    API.actions.behaviorTracker.setActiveClientTrue(client.id);
  };

  const remove = (programs: Program[]) => () => {
    API.actions.behaviorTracker.destroyBehaviorsForClient(programs);
    API.actions.behaviorTracker.deleteClient(client.id);
  };

  const active = API.actions.behaviorTracker.getActiveState(client.id);
  const user = API.system.getItem(Domains.User, client.id);

  const programs = API.system.getItemsFromStore(Domains.Program);

  const behaviors = programs.filter((program) => {
    return (
      isBehavior(program) && program.active && program.clientId === client.id
    );
  });

  const ToggleButton = ({ active }: { active: boolean }) =>
    active ? (
      <Button
        name="Hide"
        onClick={hide}
        metaTestId={BehaviorMetaTestIds.hideClient}
      />
    ) : (
      <Button
        name="Show"
        onClick={show}
        metaTestId={BehaviorMetaTestIds.showClient}
      />
    );
  return (
    <div className="behaviorClientView">
      <div className="clientHeader">
        <h4>{getFullName(user)}</h4>
        <div className="clientHeaderBtns">
          <ToggleButton active={active} />
          <Button
            name="Revmove"
            onClick={remove(behaviors)}
            metaTestId={BehaviorMetaTestIds.removeClient}
          />
        </div>
      </div>
      {active && behaviors.map(behaviorInputFactory)}
    </div>
  );
};
