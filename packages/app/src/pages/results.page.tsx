import React, { useEffect, useState } from "react";
import { Collections, Pages, ProgramTypes, Result } from "@parsimony/types";
import { Header } from "../components";
import { getRouterParams } from "../utils";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from "chart.js";
import { Line } from "react-chartjs-2";
import { useServices } from "../context";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const Results = () => {
  const { dataAccess, store } = useServices();
  const { programId } = getRouterParams();
  const program = store.getCollectionItem(Collections.Program, programId || "");

  const results = store.getCurrentList(Collections.Result);

  useEffect(() => {
    dataAccess.program.get(programId);
  }, []);

  useEffect(() => {
    if (program) dataAccess.result.getAllByRelationship("programId", programId);
  }, [program]);

  if (!program || !results.length) return null;

  const programCompletenessData = results?.map(
    (result) => result.programCompleteness
  );

  const programDateLabels = results.map((result) => {
    const date = new Date(result.created_at);
    return `${date.getMonth()}/${date.getDay()}/${date.getFullYear()}`;
  });

  // TODO: would be really cool to have a place to add multiple data sets here
  const state = {
    labels: programDateLabels,
    datasets: [
      {
        label: `${program.title} Completeness`,
        fill: false,
        lineTension: 0.5,
        backgroundColor: "rgba(75,192,192,1)",
        borderColor: "rgba(0,0,0,1)",
        borderWidth: 2,
        data: programCompletenessData
      }
    ]
  };

  return (
    <>
      <Header text={Pages.Results} size="page" />
      <Line data={state} />
    </>
  );
};

export default Results;
