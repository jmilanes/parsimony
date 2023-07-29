import React from "react";

import { Container } from "typedi";
import UIApi from "../../domains/uiApi/uiApi.Service";
import { Button, Header, Icon, IOption } from "../../components";
import { ClientSelector } from "../clientSelector";
import { useAsync } from "react-use";
import {
  BehaviorTracker,
  BehaviorType,
  Domains,
  Program,
  ProgramBehavior,
  TargetStyle
} from "@parsimony/types";
import { Spin } from "antd";
import { TallyBehaviorInput } from "./inputs/tally.behavior.input";
import { TimeBehaviorInput } from "./inputs/time.behavior.input";
import { IntervalBehaviorInput } from "./inputs/interval.behavior.input";

const behaviorInputFactory = (program: Program) => {
  if (!program.behavior?.type) {
    console.warn(`No behavior associated with ${program.title}`);
    return;
  }

  const behaviorInputMap: Record<BehaviorType, any> = {
    [BehaviorType.Tally]: TallyBehaviorInput,
    [BehaviorType.Time]: TimeBehaviorInput,
    [BehaviorType.Interval]: IntervalBehaviorInput
  };

  const Comp = behaviorInputMap[program.behavior?.type];
  return <Comp program={program} />;
};

export const BehaviorTrackerContainer = () => {
  const API = Container.get(UIApi);

  const selectedUserId = API.getAppState("behaviorTracker").clientId;

  const { loading } = useAsync(async () => {
    if (selectedUserId) {
      await API.makeRequest({
        domain: Domains.Program,
        requestType: "getAllByRelationship",
        payload: {
          relationshipProperty: "clientId",
          id: selectedUserId
        }
      });
    }
  }, [selectedUserId]);

  if (loading) return <Spin />;

  const programs = API.getItemsFromStore(Domains.Program);

  const behaviors = programs.filter((program) => {
    return (
      program.targetStyle === TargetStyle.Behavior &&
      program.behavior?.active &&
      program.clientId === selectedUserId
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
      <Header text="Behaviors" size="md" />
      <ClientSelector
        onChange={onChange}
        multiSelect={false}
        onCancel={reset}
        selected={selectedUserId}
      />
      {selectedUserId && behaviors.map(behaviorInputFactory)}
    </div>
  );
};
