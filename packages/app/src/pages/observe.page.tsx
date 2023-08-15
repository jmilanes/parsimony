import React from "react";
import { Button, Header } from "../components";
import { getRouterParams, navigateToRoute } from "../utils";

import { Domains, ObservationMetaTestIds } from "@parsimony/types";

import { Container } from "typedi";

import { useAsync } from "react-use";
import { Spin } from "antd";
import UIApi from "../domains/uiApi/uiApi.Service";
import { DiscreteTrial } from "../containers/observations/discreteTrial.container";
import { TaskAnalysis } from "../containers/observations/taskAnalysis.container";

const Observe = () => {
  const API = Container.get(UIApi);

  const { programId } = getRouterParams();
  const navigate = navigateToRoute();

  const { loading } = useAsync(async () => {
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

  return (
    <>
      <Header text={header} size="page" />
      <h4 className="completeness">{`Completeness: ${API.actions.observations.getProgramCompleteness()}%`}</h4>
      {API.actions.observations.isDiscreteTrial() ? (
        <DiscreteTrial program={program} />
      ) : (
        <TaskAnalysis program={program} />
      )}
      <Button
        name="Submit Observation"
        action={API.actions.observations.submit}
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
