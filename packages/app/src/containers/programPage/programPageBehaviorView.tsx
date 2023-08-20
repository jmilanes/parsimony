import React from "react";

import {
  Domains,
  IModes,
  Program,
  ProgramPageMetaTestIds,
  ProgramsPageMetaTestIds,
  User
} from "@parsimony/types";
import { Checkbox, Field, Selector } from "../../components";
import { getFullName, isReadOnlyMode } from "../../utils";
import { behaviorTypes } from "../../fixtures";
import { Container as DI } from "typedi";
import UIApi from "../../domains/uiApi/uiApi.Service";

export const ProgramPageBehaviorView = ({
  localState,
  updateState,
  mode
}: {
  localState: Program;
  mode: IModes;
  updateState: any;
}) => {
  const API = DI.get(UIApi);
  const allClients = API.system.getItemsFromStore(Domains.User);
  //comment
  const options = allClients.map((user: User) => ({
    name: getFullName(user),
    value: user.id
  }));

  const readOnly = isReadOnlyMode(mode);
  return (
    <>
      <div>
        <h4>Mastery Criteria:</h4>
        <p>
          Mastery criteria: student will engage in {localState.masteryTarget} or
          less instances of behavior across{" "}
          {localState.masteryConsecutiveTargets} consecutive sessions.
        </p>
        <hr />
      </div>
      <div className="flex-row">
        <Checkbox
          title="Mastered"
          pathToState={"mastered"}
          value={!!localState.mastered}
          updateState={updateState}
          readOnly={isReadOnlyMode(mode)}
          metaTestId={ProgramPageMetaTestIds.masteredCheckbox}
        />
        <Checkbox
          title="Active"
          pathToState={"behavior.active"}
          value={!!localState.behavior?.active}
          updateState={updateState}
          readOnly={readOnly}
          metaTestId={ProgramPageMetaTestIds.behaviorActiveCheckBok}
        />
      </div>
      <Field
        placeHolderText="Title"
        pathToState="title"
        value={localState.title}
        updateState={updateState}
        readOnly={readOnly}
        metaTestId={ProgramPageMetaTestIds.titleField}
      />
      <Field
        placeHolderText="Description"
        pathToState="description"
        value={localState.description}
        updateState={updateState}
        readOnly={readOnly}
        metaTestId={ProgramPageMetaTestIds.descriptionField}
      />
      <Selector
        title="Behavior Type"
        pathToState="behavior.type"
        value={localState.behavior?.type}
        options={behaviorTypes}
        updateState={updateState}
        readOnly={readOnly}
        metaTestId={ProgramsPageMetaTestIds.typeSelector}
      />
      <Field
        placeHolderText="Mastery Independence Target"
        pathToState="masteryTarget"
        value={localState.masteryTarget?.toString()}
        updateState={updateState}
        readOnly={isReadOnlyMode(mode)}
        metaTestId={ProgramsPageMetaTestIds.masteryTarget}
      />
      <Field
        placeHolderText="Mastery Consecutive Requriement"
        pathToState="masteryConsecutiveTargets"
        value={localState.masteryConsecutiveTargets?.toString()}
        updateState={updateState}
        readOnly={isReadOnlyMode(mode)}
        metaTestId={ProgramsPageMetaTestIds.masteryConsecutive}
      />

      <Field
        placeHolderText="Alert Duration"
        pathToState="behavior.alertTime"
        //TODO Figure this out
        value={localState.behavior?.alertTime?.toString()}
        updateState={updateState}
        readOnly={readOnly}
        metaTestId={ProgramsPageMetaTestIds.descriptionField}
      />
      <Field
        placeHolderText="Operational Definition"
        pathToState="behavior.operationalDefinition"
        value={localState.behavior?.operationalDefinition}
        updateState={updateState}
        readOnly={readOnly}
        metaTestId={ProgramsPageMetaTestIds.titleField}
      />
      <Field
        placeHolderText="Precursor Behaviors"
        pathToState="behavior.precursorBehaviors"
        value={localState.behavior?.precursorBehaviors}
        updateState={updateState}
        readOnly={readOnly}
        metaTestId={ProgramsPageMetaTestIds.titleField}
      />
      <Field
        placeHolderText="Proactive Strategies"
        pathToState="behavior.proactiveStrategies"
        value={localState.behavior?.proactiveStrategies}
        updateState={updateState}
        readOnly={readOnly}
        metaTestId={ProgramsPageMetaTestIds.titleField}
      />
      <Field
        placeHolderText="Reactive Strategies"
        pathToState="behavior.reactiveStrategies"
        value={localState.behavior?.reactiveStrategies}
        updateState={updateState}
        readOnly={readOnly}
        metaTestId={ProgramsPageMetaTestIds.titleField}
      />
    </>
  );
};
