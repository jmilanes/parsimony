import React, { useEffect } from "react";
import { Button, Header } from "../components";
import { generateKey, getRouterParams, navigateToRoute } from "../utils";
import { ObserveTarget } from "../containers";
import {
  Domains,
  ObservationMetaTestIds,
  Target,
  TargetOption,
  TargetStyle
} from "@parsimony/types";

import ObservationService from "../services/observation.service";
import { Container } from "typedi";

import { useAsync } from "react-use";
import { Spin } from "antd";
import UIApi from "../domains/uiApi/uiApi.Service";

const observation = new ObservationService();

const Observe = () => {
  const API = Container.get(UIApi);

  const { programId } = getRouterParams();
  const navigate = navigateToRoute();

  const { loading } = useAsync(async () => {
    await API.makeRequest({
      domain: Domains.Program,
      requestType: "get",
      payload: programId
    });
  });

  if (loading || !observation.isLoaded) return <Spin />;

  const program = API.getItem(Domains.Program, programId);
  const isDiscreteTrial = program.targetStyle === TargetStyle.DiscreteTrials;

  const onSubmit = async () => {
    await API.makeRequest({
      domain: Domains.Result,
      requestType: "create",
      payload: observation.getResultsForCreation()
    });
  };

  if (!program.targetOptions) return null;

  return (
    <>
      <Header text={program?.title || ""} size="page" />
      <Header
        text={`Completeness: ${observation.programCompleteness}%`}
        size="sm"
      />
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
