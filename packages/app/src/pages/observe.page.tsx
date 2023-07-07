import React from "react";
import { Button, Header } from "../components";
import { generateKey, getRouterParams, navigateToRoute } from "../utils";
import { ObserveTarget } from "../containers";
import {
  Domains,
  ObservationMetaTestIds,
  TargetOption,
  TargetStyle
} from "@parsimony/types";

import { Container } from "typedi";

import { useAsync } from "react-use";
import { Spin } from "antd";
import UIApi from "../domains/uiApi/uiApi.Service";

const Observe = () => {
  const API = Container.get(UIApi);
  const observation = API.ObservationService;

  const { programId } = getRouterParams();
  const navigate = navigateToRoute();

  const { loading } = useAsync(async () => {
    await API.makeRequest({
      domain: Domains.Program,
      requestType: "get",
      payload: { id: programId }
    });
  });

  if (loading) return <Spin />;

  const program = API.getItem(Domains.Program, programId);

  observation.init(program);

  const isDiscreteTrial = program.targetStyle === TargetStyle.DiscreteTrials;

  const onSubmit = async () => {
    await API.makeRequest({
      domain: Domains.Result,
      requestType: "create",
      payload: observation.getResultsForCreation()
    });
  };

  if (!program.targetOptions) return null;

  const header = `${program.title || "Untitled"}: Observation`;

  return (
    <>
      <Header text={header} size="page" />
      <h4 className="completeness">{`Completeness: ${observation.programCompleteness}%`}</h4>
      {isDiscreteTrial ? (
        <ObserveTarget
          targetOptions={program.targetOptions as TargetOption[]}
          target={program.targets as []}
          updateResultData={observation.updatedResultsData}
          programTrials={program.trials || 1}
        />
      ) : (
        program.targets?.map((target, i) => {
          return target ? (
            <ObserveTarget
              targetOptions={program.targetOptions as TargetOption[]}
              key={generateKey("observeTarget", i)}
              target={target}
              updateResultData={observation.updatedResultsData}
              programTrials={program.trials || 1}
              metaQualifierIndex={i}
            />
          ) : null;
        })
      )}
      <Button
        name="Submit Observation"
        action={onSubmit}
        metaTestId={ObservationMetaTestIds.submitObservation}
      />
      <Button
        name="View Results"
        action={() => navigate(`/results/${program.id}`)}
        metaTestId={ObservationMetaTestIds.viewResultsBtn}
      />
    </>
  );
};

export default Observe;
