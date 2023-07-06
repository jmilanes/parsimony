import React from "react";

import { Button, Table, Field, Header } from "../components";
import { Domains, School, SchoolPageMetaTestIds } from "@parsimony/types";
import { AddForm } from "../containers";
import { initialSchoolData } from "../fixtures";
import { IColumns, ITableAction } from "../components/table.component";

import { Pages } from "@parsimony/types";

import { Container } from "typedi";

import { useAsync } from "react-use";
import { Spin } from "antd";
import UIApi from "../domains/uiApi/uiApi.Service";

const Schools = () => {
  const API = Container.get(UIApi);
  const stateManager = API.StateService;
  const [showAddForm, setShowAddForm] = React.useState(false);
  const [localState, updateLocalState] =
    React.useState<Partial<School>>(initialSchoolData);

  const { loading } = useAsync(async () => {
    await API.makeRequest({
      domain: Domains.School,
      requestType: "getAll"
    });
  });

  if (loading) return <Spin />;

  const schools = API.getItemsFromStore(Domains.School);

  const updateState = stateManager.updateLocalState({
    localState,
    updateLocalState
  });

  const submitAddForm = async () => {
    await API.makeRequest({
      domain: Domains.School,
      requestType: "create",
      payload: localState
    });
    setShowAddForm(false);
    updateLocalState(initialSchoolData);
  };

  const columns: IColumns[] = [
    { key: "name", dataIndex: "name", title: "name" }
  ];

  const actions: ITableAction[] = [
    {
      name: "Delete",
      method: async (school: Required<School>) => {
        await API.makeRequest({
          domain: Domains.School,
          requestType: "delete",
          payload: { id: school.id }
        });
      }
    }
  ];

  return (
    <>
      <Header
        text={Pages.School}
        size="page"
        extra={[
          <Button
            key="add"
            name="Add"
            action={() => setShowAddForm(true)}
            hidden={showAddForm}
            metaTestId={SchoolPageMetaTestIds.addBtn}
          />
        ]}
      />
      <Table
        data={schools}
        columns={columns}
        actions={actions}
        name="Schools"
        metaTestId={SchoolPageMetaTestIds.table}
      />
      <AddForm
        showForm={showAddForm}
        onCreate={submitAddForm}
        title="Add User"
        onCancel={() => setShowAddForm(false)}
      >
        <Field
          placeHolderText="School Name"
          pathToState="name"
          value={localState.name}
          updateState={updateState}
          metaTestId={SchoolPageMetaTestIds.nameField}
        />
      </AddForm>
    </>
  );
};

export default Schools;
