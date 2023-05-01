import React from "react";

import { Collection, Domains, BookPageMetaTestIds } from "@parsimony/types";

import { initialCollectionData } from "../../fixtures";
import { Field } from "../../components";
import { AddForm } from "../addForm.container";
import { useServices } from "../../context";
import { Container } from "typedi";
import { CommandService } from "../../domains/commands/command.service";
import { removeMongoIds } from "../../utils";

export type ICollectionAddFormProps = React.PropsWithChildren<{
  show: boolean;
  setShowCb: (payload: boolean) => void;
}>;

export const CollectionAddForm = ({
  show,
  setShowCb
}: ICollectionAddFormProps) => {
  const CS = Container.get(CommandService);
  const { stateManager } = useServices();
  const [localState, updateLocalState] = React.useState<Collection>(
    initialCollectionData
  );

  const updateState = stateManager.updateLocalState({
    localState,
    updateLocalState
  });

  const submitAddForm = () => {
    CS.api.makeRequest({
      domain: Domains.Collection,
      requestType: "create",
      payload: removeMongoIds(localState)
    });
    setShowCb(false);
    updateLocalState(initialCollectionData);
  };

  return (
    <AddForm
      showForm={show}
      onCreate={submitAddForm}
      title="Add Book"
      onCancel={() => setShowCb(false)}
    >
      <Field
        placeHolderText="Book Tile"
        pathToState="title"
        value={localState.title}
        updateState={updateState}
        metaTestId={BookPageMetaTestIds.nameField}
      />
    </AddForm>
  );
};
