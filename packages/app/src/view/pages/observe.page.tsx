import React from "react";
import { Button, Header, RichText } from "../components";
import { getRouterParams, navigateToRoute } from "../../utils";

import {
  DiscreteTrial,
  Domains,
  ObservationMetaTestIds,
  TaskAnalysis
} from "@parsimony/types";

import { Container } from "typedi";

import { useAsyncRetry } from "react-use";
import { message, Spin } from "antd";
import UIApi from "../../domains/accessApis/uiApi/uiApi.Service";
import { DiscreteTrialComp } from "../containers/observation/discreteTrial.container";
import { TaskAnalysisComp } from "../containers/observation/taskAnalysis.container";
import { DatePicker } from "@mui/x-date-pickers";

const Observe = () => {
  const API = Container.get(UIApi);

  const { programId } = getRouterParams();
  const navigate = navigateToRoute();

  const { loading, retry } = useAsyncRetry(async () => {
    if (!programId) {
      return;
    }
    await API.actions.observations.init(programId);
  });

  if (loading) {
    return <Spin />;
  }

  const program = API.system.getItem(Domains.Program, programId) as
    | DiscreteTrial
    | TaskAnalysis;

  if (!program.targetOptions) {
    return null;
  }

  const header = `${program.title || "Untitled"}: Observation`;

  const validResults = API.actions.observations.validProgramResults();

  return (
    <>
      <Header text={header} size="page" />
      <div className="flex-row spaceBetween space-1">
        <h4 className="completeness">{`Completeness: ${API.actions.observations.getProgramCompleteness()}%`}</h4>
        <DatePicker
          value={API.actions.observations.getDateStarted()}
          onChange={(value) => {
            if (!value) {
              message.error("Please Pick a valid Date");
              return;
            }
            API.actions.observations.updateDateStarted(value);
          }}
        />
      </div>
      {API.actions.observations.isDiscreteTrial() ? (
        <DiscreteTrialComp program={program} />
      ) : (
        <TaskAnalysisComp program={program} />
      )}
      <RichText
        placeHolderText="Notes"
        onChange={(n) => API.actions.observations.updateNote(n)}
        metaTestId={ObservationMetaTestIds.notes}
      />
      <Button
        name="Submit Observation"
        type={validResults ? "contained" : "outlined"}
        disabled={!validResults}
        onClick={() =>
          validResults &&
          API.actions.observations.submit().finally(() => {
            message.success("Program Results Submitted");
            retry();
          })
        }
        metaTestId={ObservationMetaTestIds.submitObservation}
      />
      <Button
        name="View Results"
        onClick={() => navigate(`/results/${program.id}`)}
        metaTestId={ObservationMetaTestIds.viewResultsBtn}
      />
    </>
  );
};

export default Observe;
