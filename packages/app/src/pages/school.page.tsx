import React, { useEffect } from "react";

import { Button, Table, Field, Header } from "../components";
import { Domains, School, SchoolPageMetaTestIds } from "@parsimony/types";
import { AddForm } from "../containers";
import { initialSchoolData } from "../fixtures";
import { IColumns, ITableAction } from "../components/table.component";

import { Pages } from "@parsimony/types";

import { useServices } from "../context";
import { Container } from "typedi";
import { CommandService } from "../domains/commands/command.service";

const Schools = () => {
  const CS = Container.get(CommandService);
  const { stateManager } = useServices();

  const data = CS.api.getItems<School[]>({
    domain: Domains.School
  });

  useEffect(() => {
    CS.api.makeRequest({
      domain: Domains.School,
      requestType: "getAll"
    });
  }, []);

  const [showAddForm, setShowAddForm] = React.useState(false);
  const [localState, updateLocalState] =
    React.useState<Partial<School>>(initialSchoolData);

  const updateState = stateManager.updateLocalState({
    localState,
    updateLocalState
  });

  const submitAddForm = () => {
    CS.api.makeRequest({
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
      method: (school: Required<School>) => {
        CS.api.makeRequest({
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
        data={data}
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
