import React, { useMemo } from "react";

import { Button, Header, RichText } from "../components";
import {
  Domains,
  IModes,
  Pages,
  ResultPageMetaTestIds,
  Result
} from "@parsimony/types";

import { Container } from "typedi";

import { useAsync } from "react-use";
import { Spin } from "antd";
import UIApi from "../../domains/accessApis/uiApi/uiApi.Service";
import {
  addTimeStamp,
  getRouterParams,
  isEditMode,
  isReadOnlyMode
} from "../../utils";
import { format } from "date-fns";
import { ResultFormFactory } from "../containers/result/resultForm.factory";

const ResultPage = () => {
  const API = Container.get(UIApi);
  const [mode, updateMode] = React.useState<IModes>("readOnly");
  const { resultId } = getRouterParams();

  const { loading } = useAsync(async () => {
    if (!resultId) {
      return;
    }
    await API.system.Requests.result.get(resultId);

    const result = API.system.getItem(Domains.Result, resultId);
    if (!result) {
      return;
    }
    await API.system.Requests.program.get(result.programId);
  });

  const result = API.system.getItem(Domains.Result, resultId);

  const form = useMemo(() => {
    if (!loading) {
      //Need to destroy on use effect
      return API.system.Form.create<Result>(result);
    }
  }, [loading]);

  if (!form) return <Spin />;

  const submitForm = async () => {
    await API.system.Requests.result.update(
      form.Data.id,
      addTimeStamp(form.Data)
    );

    updateMode("readOnly");
  };

  const program = API.system.getItem(Domains.Program, result.programId || "");

  console.log(result);
  return (
    <>
      <Header
        text={`${program.title} ${Pages.Result}: ${format(
          new Date(result.created_at || ""),
          "MM/dd/yyyy"
        )}`}
        size="page"
        extra={[
          <Button
            key="edit"
            name="Edit"
            onClick={() => updateMode("edit")}
            hidden={isEditMode(mode)}
            metaTestId={ResultPageMetaTestIds.edit}
          />,
          <Button
            key="cencal"
            name="Cancel"
            onClick={() => updateMode("readOnly")}
            hidden={isReadOnlyMode(mode)}
            metaTestId={ResultPageMetaTestIds.cancel}
          />,
          <Button
            key="save"
            name="Save"
            onClick={submitForm}
            hidden={isReadOnlyMode(mode)}
            metaTestId={ResultPageMetaTestIds.save}
          />
        ]}
      />
      <ResultFormFactory
        program={program}
        form={form}
        isReadonly={isReadOnlyMode(mode)}
      />
      <RichText
        placeHolderText="Notes"
        content={form.Data.notes}
        onChange={(value) => form.updateData({ notes: value })}
        metaTestId={ResultPageMetaTestIds.notes}
        readOnly={isReadOnlyMode(mode)}
      />
    </>
  );
};

export default ResultPage;

// Behavior input (single input)
// Trials
//  make sure completness is being calculated properly
