import React, { useMemo } from "react";

import {
  BehaviorType,
  Domains,
  ProgramTypes,
  BehaviorAddFormMetaTestIds,
  ProgramViewTypes,
  IntervalBehaviorType
} from "@parsimony/types";

import { behaviorTypes, programTypes } from "../../../fixtures";
import { Field, RichText, Selector } from "../../components";
import { AddForm } from "../shared/addForm.container";

import { Container } from "typedi";
import { removeMongoIds } from "../../../utils";
import UIApi from "../../../domains/accessApis/uiApi/uiApi.Service";

export type IBehaviorAddFormProps = React.PropsWithChildren<{
  show: boolean;
  setShowCb: (payload: boolean) => void;
  collectionId: string;
}>;

export const BehaviorAddForm = ({
  show,
  setShowCb,
  collectionId
}: IBehaviorAddFormProps) => {
  const API = Container.get(UIApi);

  const form = useMemo(
    () =>
      //Need to destroy on use effect and update after types (can rethink whole pattern now)
      API.system.Form.create<IntervalBehaviorType>(new IntervalBehaviorType()),
    []
  );

  const submitAddForm = async () => {
    await API.system.makeRequest({
      domain: Domains.Program,
      requestType: "create",
      payload: removeMongoIds({
        ...form.Data,
        collectionId
      })
    });
    setShowCb(false);
    form.reset();
  };

  return (
    <AddForm
      showForm={show}
      onCreate={submitAddForm}
      onCancel={() => {
        setShowCb(false);
        form.reset();
      }}
      title="Add Program"
    >
      <Field
        placeHolderText="Title"
        value={form.Data.title}
        onChange={(value) => form.updateData({ title: value })}
        metaTestId={BehaviorAddFormMetaTestIds.titleField}
      />
      <RichText
        placeHolderText="Description"
        content={form.Data.description}
        onChange={(value) => form.updateData({ description: value })}
        metaTestId={BehaviorAddFormMetaTestIds.descriptionField}
      />
      <Selector
        title="Type"
        value={form.Data.type}
        options={programTypes}
        onChange={(value) => form.updateData({ type: value as ProgramTypes })}
        metaTestId={BehaviorAddFormMetaTestIds.typeSelector}
      />
      <Selector
        title="Behavior Type"
        value={form.Data?.viewType}
        options={behaviorTypes}
        onChange={(value) =>
          form.updateData(
            {
              viewType: value as ProgramViewTypes
            },
            true
          )
        }
        metaTestId={BehaviorAddFormMetaTestIds.behaviorTypeSelector}
      />

      {form.Data.behavior?.type === BehaviorType.Interval && (
        <Field
          placeHolderText="Alert Duration (Seconds)"
          //TODO Figure this out
          value={form.Data?.alertTime?.toString()}
          onChange={(value) =>
            form.updateData(
              {
                alertTime: parseInt(value)
              },
              true
            )
          }
          metaTestId={BehaviorAddFormMetaTestIds.alertDurationField}
        />
      )}

      <Field
        placeHolderText="Mastery Independence Target"
        value={form.Data.masteryTarget?.toString()}
        onChange={(value) => {
          form.updateData({
            masteryTarget: parseInt(value)
          });
        }}
        metaTestId={BehaviorAddFormMetaTestIds.masteryTargetField}
      />
      <Field
        placeHolderText="Mastery Consecutive Requriement"
        value={form.Data.masteryConsecutiveTargets?.toString()}
        onChange={(value) =>
          form.updateData({
            masteryConsecutiveTargets: parseInt(value)
          })
        }
        metaTestId={BehaviorAddFormMetaTestIds.masteryConsecutiveField}
      />

      <RichText
        placeHolderText="Operational Definition"
        content={form.Data.operationalDefinition}
        onChange={(value) =>
          form.updateData(
            {
              operationalDefinition: value
            },
            true
          )
        }
        metaTestId={BehaviorAddFormMetaTestIds.operationalDefinitionField}
      />
      <RichText
        placeHolderText="Precursor Behaviors"
        content={form.Data.precursorBehaviors}
        onChange={(value) =>
          form.updateData(
            {
              precursorBehaviors: value
            },
            true
          )
        }
        metaTestId={BehaviorAddFormMetaTestIds.precursorBehaviorField}
      />
      <RichText
        placeHolderText="Proactive Strategies"
        content={form.Data?.proactiveStrategies}
        onChange={(value) =>
          form.updateData(
            {
              proactiveStrategies: value
            },
            true
          )
        }
        metaTestId={BehaviorAddFormMetaTestIds.proactiveStrategiesField}
      />
      <RichText
        placeHolderText="Reactive Strategies"
        content={form.Data?.reactiveStrategies}
        onChange={(value) =>
          form.updateData(
            {
              reactiveStrategies: value
            },
            true
          )
        }
        metaTestId={BehaviorAddFormMetaTestIds.reactiveStrategiesField}
      />
    </AddForm>
  );
};
