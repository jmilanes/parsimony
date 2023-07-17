import React from "react";
import { Domains } from "@parsimony/types";
import { Header } from "../components";
import { getRouterParams } from "../utils";

import {
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip
} from "chart.js";
import { Line } from "react-chartjs-2";

import { Container as DI } from "typedi";
import { useAsync } from "react-use";
import { Spin } from "antd";
import UIApi from "../domains/uiApi/uiApi.Service";

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
  const API = DI.get(UIApi);
  const { programId } = getRouterParams();

  const { loading } = useAsync(async () => {
    await API.makeRequest({
      domain: Domains.Result,
      requestType: "getAllByRelationship",
      payload: {
        relationshipProperty: "programId",
        id: programId
      }
    });
    await API.makeRequest({
      domain: Domains.Program,
      requestType: "get",
      payload: { id: programId }
    });
  });

  if (loading) return <Spin />;

  const program = API.getItem(Domains.Program, programId);
  const results = API.getItemsFromStore(Domains.Result);

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
        label: `Program ${program?.title} Completeness`,
        fill: false,
        lineTension: 0.5,
        backgroundColor: "#D473F5",
        borderColor: "#D473F5",
        borderWidth: 2,
        data: programCompletenessData
      }
    ]
  };
  const header = `${program?.title || "Untitled"}: Results`;

  return (
    <>
      <Header text={header} size="page" />
      <Line data-test-id={"chart"} data={state} />
    </>
  );
};

export default Results;
