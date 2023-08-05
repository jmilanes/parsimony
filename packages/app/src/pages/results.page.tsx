import React from "react";
import {
  BehaviorType,
  Domains,
  Program,
  Result,
  TargetStyle
} from "@parsimony/types";
import { Header } from "../components";
import { getFullDate, getRouterParams } from "../utils";

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
    await API.system.makeRequest({
      domain: Domains.Result,
      requestType: "getAllByRelationship",
      payload: {
        relationshipProperty: "programId",
        id: programId
      }
    });
    await API.system.makeRequest({
      domain: Domains.Program,
      requestType: "get",
      payload: { id: programId }
    });
  });

  if (loading) return <Spin />;

  const program = API.system.getItem(Domains.Program, programId);
  const results = API.system.getItemsFromStore(Domains.Result);

  const header = `${program?.title || "Untitled"}: Results`;

  return (
    <>
      <Header text={header} size="page" />
      <Line
        data-test-id={"chart"}
        data={API.actions.result.calculateResult(program, results)}
      />
    </>
  );
};

export default Results;
