import React, { useState } from "react";
import { Header, Button } from "../components";
import { generateKey, getRouterParams } from "../utils";
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

  const updateProgramResult = (result: IResultData) =>
    setProgramResults({
      ...programResults,
      data: { ...programResults.data, ...result }
    }); //TODO: Need to delete

  const createResult = () => resultsData.create(programResults);
  return (
    <>
      <Header text={program?.title} size="lg" />
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
