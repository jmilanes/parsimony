import React, { useEffect, useState } from "react";
import { Header, Button } from "../components";
import { generateKey, getRouterParams, getSum, getMax } from "../utils";
import { programData, resultsData } from "../services/dataAccessServices";
import { ObserveRule } from "../containers";
import { IResult, IResultData } from "../types";
import { initialResultData } from "../fixtures";

const Observe = () => {
  const { programId } = getRouterParams();

  const program = programData.get(programId || "");

  const [programResults, setProgramResults] = useState<IResult>({
    ...initialResultData,
    clientId: program.clientId,
    programId: program.id
  });

  const updateCompleteness = (programResults: IResult) => {
    const totalCompleteness = Object.values(programResults.data).reduce(
      (a, c) => a + c.ruleCompleteness,
      0
    );
    const averageCompleteness =
      totalCompleteness / Object.keys(programResults.data).length;
    setProgramResults({
      ...programResults,
      programCompleteness: averageCompleteness
    });
  };

  useEffect(() => {
    console.log(programResults);
    updateCompleteness(programResults);
  }, [programResults.data]);

  const updateProgramResult = (result: IResultData) =>
    setProgramResults({
      ...programResults,
      data: { ...programResults.data, ...result }
    }); //TODO: Need to delete

  const createResult = () => resultsData.create(programResults);
  return (
    <>
      <Header text={program?.title} size="lg" />
      <p>Completeness: {programResults.programCompleteness}%</p>
      {program.rules.map((rule, i) => (
        <ObserveRule
          key={generateKey("observeRule", i)}
          rule={rule}
          onComplete={updateProgramResult}
        />
      ))}
      <Button name="Submit Observation" action={createResult}></Button>
    </>
  );
};

export default Observe;
