import React, { useEffect, useState } from "react";

import {
  ProgramsPageMetaTestIds,
  ProgramTypes,
  TargetOption,
  Program,
  Domains,
  User
} from "@parsimony/types";

import {
  initialProgramData,
  programCategories,
  programTypes,
  targetStyles,
  trialOptions,
  userRoleOptions
} from "../../fixtures";
import { Field, MultiSelect, Selector } from "../../components";
import { TargetOptionSelector } from "../targetOptionsSelector.container";
import { TargetForm } from "../targetForm.container";
import { AddForm } from "../addForm.container";
import { useServices } from "../../context";
import { Container } from "typedi";
import { CommandService } from "../../domains/commands/command.service";
import { getFullName, removeMongoIds } from "../../utils";

export type IProgramAddFormProps = React.PropsWithChildren<{
  show: boolean;
  setShowCb: (payload: boolean) => void;
  collectionId: string;
}>;

export const ProgramAddForm = ({
  show,
  setShowCb,
  collectionId
}: IProgramAddFormProps) => {
  const CS = Container.get(CommandService);
  const { stateManager } = useServices();
  const [collectionIdState, updateCollectionIdState] = useState<string>(
    collectionId || ""
  );
  const [localState, updateLocalState] =
    React.useState<Program>(initialProgramData);

  useEffect(() => {
    //TODO: Things that remain consistent might just need to be fetch on re-loaded like Users since they are less frequent
    CS.api.makeRequest({
      domain: Domains.User,
      requestType: "getAll"
    });
  }, []);

  useEffect(() => {
    updateCollectionIdState(collectionId);
  }, [collectionId]);

  const clients = CS.api.getItems<User[]>({
    domain: Domains.User
  });

  const clientDataOptions = clients.map((client: User) => ({
    name: getFullName(client),
    value: client?.id
  }));

  const updateState = stateManager.updateLocalState({
    localState,
    updateLocalState
  });

  const submitAddForm = () => {
    CS.api.makeRequest({
      domain: Domains.Program,
      requestType: "create",
      payload: removeMongoIds({
        ...localState,
        collectionId: collectionIdState
      })
    });
    setShowCb(false);
    updateLocalState(initialProgramData);
  };

  return (
    <AddForm
      showForm={show}
      onCreate={submitAddForm}
      onCancel={() => {
        setShowCb(false);
        updateLocalState(initialProgramData);
      }}
      title="Add Program"
    >
      <Field
        placeHolderText="Title"
        pathToState="title"
        value={localState.title}
        updateState={updateState}
        metaTestId={ProgramsPageMetaTestIds.titleField}
      />
      <Field
        placeHolderText="Description"
        pathToState="description"
        value={localState.description}
        updateState={updateState}
        metaTestId={ProgramsPageMetaTestIds.descriptionField}
      />
      <Field
        placeHolderText="Materials"
        pathToState="materials"
        value={localState.materials}
        updateState={updateState}
        metaTestId={ProgramsPageMetaTestIds.materialsField}
      />
      <Selector
        title="Type"
        pathToState="type"
        value={localState.type}
        options={programTypes}
        updateState={updateState}
        metaTestId={ProgramsPageMetaTestIds.typeSelector}
      />
      {localState.type === ProgramTypes.Client && (
        <Selector
          title="Client"
          pathToState="clientId"
          value={localState.clientId}
          options={clientDataOptions}
          updateState={updateState}
          metaTestId={ProgramsPageMetaTestIds.clientSelector}
        />
      )}

      <Selector
        title="Trials"
        pathToState="trials"
        value={localState.trials}
        options={trialOptions}
        updateState={updateState}
        isNumber={true}
        metaTestId={ProgramsPageMetaTestIds.stepsSelector}
      />

      <Selector
        title="Target Style"
        pathToState="targetStyle"
        value={localState.targetStyle}
        options={targetStyles}
        updateState={updateState}
        metaTestId={ProgramsPageMetaTestIds.ruleStyleSelector}
      />
      <Selector
        title="Category"
        pathToState="category"
        value={localState.category}
        options={programCategories}
        updateState={updateState}
        metaTestId={ProgramsPageMetaTestIds.categorySelector}
      />
      <MultiSelect
        title="Read Access"
        pathToState="readAccess"
        options={userRoleOptions}
        values={localState.readAccess as string[]}
        updateState={updateState}
        metaTestId={ProgramsPageMetaTestIds.readAccessMultiSelector}
      />
      <MultiSelect
        title="Write Access"
        pathToState="writeAccess"
        options={userRoleOptions}
        values={localState.writeAccess as string[]}
        updateState={updateState}
        metaTestId={ProgramsPageMetaTestIds.writeAccessMultiSelector}
      />
      <TargetOptionSelector
        targetOptions={localState.targetOptions as TargetOption[]}
        updateState={updateState}
      />
      <TargetForm localState={localState} updateState={updateState} />
    </AddForm>
  );
};
