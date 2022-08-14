import React, { useEffect, useState } from "react";
import { Header, Button } from "../components";
import {
  calculateAverage,
  generateKey,
  getRouterParams,
  navigateToRoute,
  omitMongoKeys
} from "../utils";
import { ObserveRule } from "../containers";
import { IResultData, Program, Result } from "@parsimony/types";
import { initialResultData } from "../fixtures";
import { RuleStyle } from "@parsimony/types";
import { useServices } from "../context";

const Observe = () => {
  const { dataAccess } = useServices();
  const { programId } = getRouterParams();
  const navigate = navigateToRoute();

  const program = dataAccess.program.get(programId || "") as Program;

  const [programResults, setProgramResults] = useState<Result>({
    ...initialResultData,
    clientId: program?.clientId,
    programId: program?.id
  });

  const updateCompleteness = (programResults: Result) => {
    const averageCompleteness = calculateAverage(
      programResults.data as [],
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
    if (program) {
      if (!programResults.clientId || !programResults.programId) {
        setProgramResults({
          ...programResults,
          clientId: program.clientId,
          programId: program.id
        });
      }
    }
  }, [programResults.data, program]);

  if (!program || !programResults) return null;

  //TODO: This seems wrong need to re evaluate if objects are the right move.
  const updateProgramResult = (result: IResultData) => {
    setProgramResults({
      ...programResults,
      data: programResults.data
        ? [...programResults.data, ...Object.values(result)]
        : [...Object.values(result)]
    });
  };

  const createResult = () => {
    //TODO Find better way to do this
    delete programResults.id;
    return dataAccess.result.create(omitMongoKeys(programResults));
  };

  const isGroup = program.ruleStyle === RuleStyle.Group;

  return (
    <>
      <Header text={program?.title || ""} size="page" />
      <p>Completeness: {programResults.programCompleteness}%</p>
      {isGroup ? (
        <ObserveRule
          rule={program.rules as []}
          onComplete={updateProgramResult}
        />
      ) : (
        program.rules?.map(
          (rule, i) =>
            rule && (
              <ObserveRule
                key={generateKey("observeRule", i)}
                rule={rule}
                onComplete={updateProgramResult}
              />
            )
        )
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
