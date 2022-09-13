import React, { useEffect, useState } from "react";
import { Header, Button } from "../components";
import { generateKey, getRouterParams, navigateToRoute } from "../utils";
import { ObserveRule } from "../containers";
import { Program } from "@parsimony/types";
import { RuleStyle } from "@parsimony/types";
import { useServices } from "../context";
import ObservationService from "../services/observation.service";

const observation = new ObservationService();

const Observe = () => {
  const { dataAccess, stateManager } = useServices();

  const { programId } = getRouterParams();
  const navigate = navigateToRoute();

  const program = dataAccess.program.get(programId || "") as Program;

  useEffect(() => {
    if (program) {
      observation.init(program, stateManager.updateState);
    }
  }, [program]);

  if (!observation.isLoaded) return null;

  const isGroup = program.ruleStyle === RuleStyle.Group;

  const onSubmit = () =>
    dataAccess.result.create(observation.getResultsForCreation());

  return (
    <>
      <Header text={program?.title || ""} size="page" />
      <p>Completeness: {observation.programCompleteness}%</p>
      {isGroup ? (
        <ObserveRule
          rule={program.rules as []}
          updateResultData={observation.updatedResultsData}
        />
      ) : (
        program.rules?.map(
          (rule, i) =>
            rule && (
              <ObserveRule
                key={generateKey("observeRule", i)}
                rule={rule}
                updateResultData={observation.updatedResultsData}
              />
            )
        )
      )}
      <Button name="Submit Observation" action={onSubmit}></Button>
      <Button
        name="View Results"
        action={() => navigate(`/results/${program.id}`)}
      ></Button>
    </>
  );
};

export default Observe;
