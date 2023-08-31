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
    [BehaviorType.Frequency]: TallyBehaviorInput,
    [BehaviorType.Duration]: TimeBehaviorInput,
    [BehaviorType.Interval]: IntervalBehaviorInput
  };

  const Comp = behaviorInputMap[program.behavior?.type];
  return <Comp key={program.id} program={program} />;
};

export const BehaviorTrackerContainer = () => {
  const API = Container.get(UIApi);

  const selectedUserId = API.system.getAppState("behaviorTracker").clientId;

  const { loading } = useAsync(async () => {
    if (selectedUserId) {
      await API.system.makeRequest({
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

  const programs = API.system.getItemsFromStore(Domains.Program);

  const behaviors = programs.filter((program) => {
    return (
      program.targetStyle === TargetStyle.Behavior &&
      program.behavior?.active &&
      program.clientId === selectedUserId
    );
  });

  const reset = () => {
    API.system.updateAppState("behaviorTracker", {
      clientId: undefined
    });
    API.actions.timer.cancelAllTimers();
  };

  const onChange = (option: IOption) => {
    reset();
    API.system.updateAppState("behaviorTracker", {
      clientId: (option.value as string) || undefined
    });
  };

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
