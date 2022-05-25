import React, { useEffect, useState } from "react";
import { Header, Button } from "../components";
import {
  calculateAverage,
  generateKey,
  getRouterParams,
  navigateToRoute
} from "../utils";
import { programData, resultsData } from "../services/dataAccessServices";
import { ObserveRule } from "../containers";
import { IResult, IResultData } from "../types";
import { initialResultData } from "../fixtures";
import { RuleStyle } from "../enums";

const Observe = () => {
  const { programId } = getRouterParams();
  const navigate = navigateToRoute();

  const program = programData.get(programId || "");

  const [programResults, setProgramResults] = useState<IResult>({
    ...initialResultData,
    clientId: program.clientId,
    programId: program.id
  });

  const updateCompleteness = (programResults: IResult) => {
    const averageCompleteness = calculateAverage(
      programResults.data,
      "ruleCompleteness"
    );
    !!averageCompleteness &&
      setProgramResults({
        ...programResults,
        programCompleteness: averageCompleteness
      });
  };

  useEffect(() => {
    updateCompleteness(programResults);
  }, [programResults.data]);

  const updateProgramResult = (result: IResultData) => {
    setProgramResults({
      ...programResults,
      data: { ...programResults.data, ...result }
    });
  };

  const createResult = () => resultsData.create(programResults);

  const isGroup = program.ruleStyle === RuleStyle.Group;

  return (
    <>
      <Header text={program?.title} size="page" />
      <p>Completeness: {programResults.programCompleteness}%</p>
      {isGroup ? (
        <ObserveRule rule={program.rules} onComplete={updateProgramResult} />
      ) : (
        program.rules.map((rule, i) => (
          <ObserveRule
            key={generateKey("observeRule", i)}
            rule={rule}
            onComplete={updateProgramResult}
          />
        ))
      )}
      <Button name="Submit Observation" action={createResult}></Button>
      <Button
        name="View Results"
        action={() => navigate(`/results/${program.id}`)}
      ></Button>
    </>
  );
};

export default Observe;
