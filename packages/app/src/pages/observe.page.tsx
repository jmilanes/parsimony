import React, { useEffect } from "react";
import { Button, Header } from "../components";
import { generateKey, getRouterParams, navigateToRoute } from "../utils";
import { ObserveTarget } from "../containers";
import {
  StoreCollections,
  ObservationMetaTestIds,
  Target,
  TargetStyle
} from "@parsimony/types";

import { useServices } from "../context";
import ObservationService from "../services/observation.service";

const observation = new ObservationService();

const Observe = () => {
  const { dataAccess, stateManager, store } = useServices();

  const { programId } = getRouterParams();
  const navigate = navigateToRoute();

  const program = store.getCollectionItem(
    StoreCollections.Program,
    programId || ""
  );

  useEffect(() => {
    if (!program) dataAccess.program.get(programId as string);
    if (program) {
      observation.init(program, stateManager.updateState);
    }
  }, [program]);

  if (!observation.isLoaded) return null;

  const isDiscreteTrial = program.targetStyle === TargetStyle.DiscreteTrials;

  const onSubmit = () =>
    dataAccess.result.create(observation.getResultsForCreation());

  return (
    <>
      <Header text={program?.title || ""} size="page" />
      <Header
        text={`Completeness: ${observation.programCompleteness}%`}
        size="sm"
      />
      {isDiscreteTrial ? (
        <ObserveTarget
          targetOptions={program.targetOptions}
          target={program.targets as []}
          updateResultData={observation.updatedResultsData}
          programTrials={program.trials || 1}
        />
      ) : (
        program.targets?.map((target: Target, i: any) =>
          target ? (
            <ObserveTarget
              targetOptions={program.targetOptions}
              key={generateKey("observeTarget", i)}
              target={target}
              updateResultData={observation.updatedResultsData}
              programTrials={program.trials || 1}
              metaQualifierIndex={i}
            />
          ) : null
        )
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
