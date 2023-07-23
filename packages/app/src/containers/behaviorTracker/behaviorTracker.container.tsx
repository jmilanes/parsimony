import React from "react";

import { Container } from "typedi";
import UIApi from "../../domains/uiApi/uiApi.Service";
import { Header, IOption } from "../../components";
import { ClientSelector } from "../clientSelector";
import { useAsync } from "react-use";
import { Domains, TargetStyle } from "@parsimony/types";
import { Spin } from "antd";

export const BehaviorTrackerContainer = () => {
  const API = Container.get(UIApi);

  const selectedUserId = API.getAppState("behaviorTracker").clientId;

  // const { loading } = useAsync(async () => {
  //   await API.makeRequest({
  //     domain: Domains.Program,
  //     requestType: "getAllByRelationship",
  //     payload: {
  //       relationshipProperty: "clientId",
  //       id: selectedUserId
  //     }
  //   });
  // });
  //
  // if (loading) return <Spin />;

  const programs = API.getItemsFromStore(Domains.Program);

  const behaviors = programs.filter((program) => {
    return (
      program.targetStyle === TargetStyle.Behavior && program.behavior?.active
    );
  });

  const reset = () =>
    API.updateAppState("behaviorTracker", {
      clientId: undefined
    });

  const onChange = (option: IOption) => {
    reset();
    API.updateAppState("behaviorTracker", {
      clientId: (option.value as string) || undefined
    });
  };

  console.log(behaviors);

  return (
    <div>
      <Header text="Client Behaviors" size="md" />
      <ClientSelector onChange={onChange} multiSelect={false} />
    </div>
  );
};
