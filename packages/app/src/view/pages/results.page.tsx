import React, { useEffect } from "react";
import { Domains, Result, ResultsMetaTestIds } from "@parsimony/types";
import { Header, IColumns, ITableAction, Table } from "../components";
import { getFullDate, getFullName, getRouterParams } from "../../utils";

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
import { useAsyncRetry } from "react-use";
import { Spin } from "antd";
import UIApi from "../../domains/accessApis/uiApi/uiApi.Service";
import { parseHTMLObj } from "../containers";

const Results = () => {
  const API = DI.get(UIApi);
  const { programId } = getRouterParams();
  const navigate = API.Navigate;

  useEffect(() => {
    ChartJS.register(
      CategoryScale,
      LinearScale,
      PointElement,
      LineElement,
      Title,
      Tooltip,
      Legend
    );
  });

  const { loading, retry } = useAsyncRetry(async () => {
    await API.actions.result.init(programId || "");
  });

  if (loading) return <Spin />;

  const program = API.system.getItem(Domains.Program, programId);
  const results = API.system
    .getItemsFromStore(Domains.Result)
    .filter((r) => r.programId === programId)
    //@ts-ignore
    .sort((a, b) => new Date(b.created_at) + new Date(a.created_at));

  // TODO make sorting better
  const client = API.system.getItem(Domains.User, program?.clientId || "");
  const clientName = getFullName(client);

  const header = `${program?.title || "Untitled"}: Results for ${clientName}`;

  const columns: IColumns[] = [
    {
      key: "created_at",
      title: "Date Created",
      displayFn: (v: any) => getFullDate(new Date(v))
    },
    {
      key: API.actions.result.getKeyByProgram(program),
      title: API.actions.result.getYAxisLabel(program) || "Data",
      displayFn: API.actions.result.getDisplayValueForTable(program)
    },
    {
      key: "notes",
      title: "Notes",
      displayFn: parseHTMLObj
    },
    {
      key: "observerId",
      title: "Observed By:",
      displayFn: (v: any) => {
        return v ? getFullName(API.system.getItem(Domains.User, v)) : "N/A";
      }
    }
  ];

  const actions: ITableAction[] = [
    {
      name: "Delete",
      method: async (result: Required<Result>) => {
        await API.system
          .makeRequest({
            domain: Domains.Result,
            requestType: "delete",
            payload: { id: result.id }
          })
          .finally(() => {
            retry();
          });
      }
    },
    {
      name: "View",
      method: (result: Required<Result>) => {
        navigate(`/result/${result.id}`);
      }
    }
  ];

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
      <Header text="All Entires" size="table" />
      <Table<Result>
        data={results}
        columns={columns}
        actions={actions}
        metaTestId={ResultsMetaTestIds.table}
      />
    </>
  );
};

export default Results;
