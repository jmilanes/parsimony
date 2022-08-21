import React, { useEffect, useState } from "react";
import { Header, Button } from "../components";
import {
  calculateAverage,
  generateKey,
  getRouterParams,
  navigateToRoute,
  omitMongoKeys,
  removeMongoIds
} from "../utils";
import { ObserveRule } from "../containers";
import { IResultData, Program, Result, RuleResult } from "@parsimony/types";
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

  const updateProgramResult = (result: IResultData) => {
    // In the case of a Separate program these wll be single arrays
    // In the case of groups these will have multiple arrays
    const latestsResults = Object.values(result);
    let data = programResults.data || [];

    latestsResults.forEach((latestResult) => {
      const current = data.find((d) => d?.ruleId === latestResult.ruleId);
      if (!!current) {
        // If there is current result data replace with latest
        data = data.map((d) => {
          return d?.ruleId === latestResult.ruleId ? latestResult : d;
        });
      } else {
        // If there is no current result append the latest to any current data items
        data = [...data, latestResult];
      }
    });

    setProgramResults({
      ...programResults,
      data
    });
  };

  const createResult = () => {
    return dataAccess.result.create(
      removeMongoIds(omitMongoKeys(programResults))
    );
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
