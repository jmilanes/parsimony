import React from "react";
import { Pages, ProgramTypes } from "../enums";
import { Header } from "../components";
import { getRouterParams } from "../utils";
import { programData, resultsData } from "../services/dataAccessServices";
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
  const { programId } = getRouterParams();
  const program = programData.get(programId || "");
  if (program.type !== ProgramTypes.Client) return null;
  const results = resultsData.getAllBy("programId", programId);

  const programCompletenessData = results.map(
    (result) => result.programCompleteness
  );

  const programDateLabels = results.map((result) => {
    const date = new Date(result.dateCreated);
    return `${date.getMonth()}/${date.getDay()}/${date.getFullYear()}`;
  });

  // Todo would be really cool to have a place to add data sets here
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
