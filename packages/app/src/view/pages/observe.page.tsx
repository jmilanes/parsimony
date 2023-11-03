import React from "react";
import { Button, Header } from "../components";
import { getRouterParams, navigateToRoute } from "../../utils";

import { Domains, ObservationMetaTestIds } from "@parsimony/types/dist";

import { Container } from "typedi";

import { useAsyncRetry } from "react-use";
import { message, Spin } from "antd";
import UIApi from "../../domains/accessApis/uiApi/uiApi.Service";
import { DiscreteTrial } from "../containers/observations/discreteTrial.container";
import { TaskAnalysis } from "../containers/observations/taskAnalysis.container";
import { DatePicker } from "@mui/x-date-pickers";

const Observe = () => {
  const API = Container.get(UIApi);

  const { programId } = getRouterParams();
  const navigate = navigateToRoute();

  const { loading, retry } = useAsyncRetry(async () => {
    await API.actions.observations.init(programId);
  });

  if (loading) {
    return <Spin />;
  }

  const program = API.system.getItem(Domains.Program, programId);

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
        <DiscreteTrial program={program} />
      ) : (
        <TaskAnalysis program={program} />
      )}
      <Button
        name="Submit Observation"
        type={validResults ? "contained" : "outlined"}
        disabled={!validResults}
        action={() =>
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
        action={() => navigate(`/results/${program.id}`)}
        metaTestId={ObservationMetaTestIds.viewResultsBtn}
      />
    </>
  );
};

export default Observe;
