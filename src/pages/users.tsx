import React from "react";

import { StateManger, userData } from "../services/dataAccessServices";
import ComponentsService from "../services/componentsService";
import { navigateToRoute } from "../utils";
import { IUser } from "../types";
import { AddForm } from "../containers";
import {
  initialUserData,
  userRoleOptions,
  userRoleOptionsWithStringValues
} from "../fixtures";
import { IColumns, ITableAction } from "../components/table";
import { Pages } from "../enums";

const Users = () => {
  const navigate = navigateToRoute();
  const data = userData.getAll();
  const [showAddForm, setShowAddForm] = React.useState(false);
  const [localState, updateLocalState] = React.useState<IUser>(initialUserData);

  const updateState = StateManger.updateLocalState({
    localState,
    updateLocalState
  });

  const submitAddForm = () => {
    userData.create(localState);
    setShowAddForm(false);
    updateLocalState(initialUserData);
  };

  const columns: IColumns[] = [
    { propertyKey: "firstName" },
    { propertyKey: "lastName" }
  ];
  const actions: ITableAction[] = [
    {
      name: "View",
      method: (user: IUser) => navigate(`/directory/${user.id}`)
    },
    {
      name: "Delete",
      method: (user: Required<IUser>) => userData.delete(user.id)
    }
  ];

  return (
    <>
      <ComponentsService.Header text={Pages.Users} size="lg" />
      {ComponentsService.Button({
        name: "Add",
        action: () => setShowAddForm(true),
        hidden: showAddForm
      })}
      {ComponentsService.Button({
        name: "Cancel",
        action: () => setShowAddForm(false),
        hidden: !showAddForm
      })}
      {ComponentsService.Table<IUser>({ data, columns, actions })}
      <AddForm showForm={showAddForm} action={submitAddForm} title="Add Users">
        {ComponentsService.Field({
          placeHolderText: "First Name",
          pathToState: "contactInformation.firstName",
          value: localState.contactInformation?.firstName,
          updateState
        })}
        {ComponentsService.Field({
          placeHolderText: "Last Name",
          pathToState: "contactInformation.lastName",
          value: localState.contactInformation?.lastName,
          updateState
        })}
        {ComponentsService.Field({
          placeHolderText: "Phone Number",
          pathToState: "contactInformation.phone",
          value: localState.contactInformation?.phone,
          updateState
        })}
        {ComponentsService.Selector({
          title: "Type",
          options: userRoleOptionsWithStringValues,
          pathToState: "type",
          value: localState.type,
          updateState
        })}
        {ComponentsService.MultiSelect({
          title: "Type",
          options: userRoleOptions,
          pathToState: "roles",
          values: localState.roles,
          updateState
        })}
      </AddForm>
    </>
  );
};

export default Users;
