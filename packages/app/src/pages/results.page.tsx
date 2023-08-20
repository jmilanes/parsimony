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
    await API.actions.result.init(programId || "");
  });

  if (loading) return <Spin />;

  const program = API.system.getItem(Domains.Program, programId);
  const results = API.system
    .getItemsFromStore(Domains.Result)
    .filter((r) => r.programId === programId);

  const header = `${program?.title || "Untitled"}: Results`;

  // @ts-ignore
  return (
    <>
      <Header text={header} size="page" />
      <Line
        data-test-id={"chart"}
        data={API.actions.result.calculateResult(program, results)}
        options={{
          scales: {
            y: {
              beginAtZero: true,
              max: API.actions.result.getYMax(program),
              ticks: {
                callback: API.actions.result.getYAxisCallback(program)
              },
              title: {
                display: true,
                text: API.actions.result.getYAxisLabel(program)
              }
            }
          }
        }}
      />
    </>
  );
};

export default Results;
