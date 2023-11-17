import React, { useMemo } from "react";

import {
  BehaviorType,
  Domains,
  Program,
  ProgramsPageMetaTestIds,
  ProgramTypes
} from "@parsimony/types";

import {
  behaviorTypes,
  initialBehaviorData,
  programTypes
} from "../../../fixtures";
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
      //Need to destroy on use effect
      API.system.Form.create<Program>(initialBehaviorData),
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
        updateState={(_, value) => form.updateData({ title: value })}
        metaTestId={ProgramsPageMetaTestIds.titleField}
      />
      <RichText
        placeHolderText="Description"
        content={form.Data.description}
        updateState={(_, value) => form.updateData({ description: value })}
        metaTestId={ProgramsPageMetaTestIds.descriptionField}
      />
      <Selector
        title="Type"
        value={form.Data.type}
        options={programTypes}
        updateState={(_, value) =>
          form.updateData({ type: value as ProgramTypes })
        }
        metaTestId={ProgramsPageMetaTestIds.typeSelector}
      />
      <Selector
        title="Behavior Type"
        value={form.Data.behavior?.type}
        options={behaviorTypes}
        updateState={(_, value) =>
          form.updateData(
            {
              behavior: {
                type: value as BehaviorType
              }
            },
            true
          )
        }
        metaTestId={ProgramsPageMetaTestIds.typeSelector}
      />

      {form.Data.behavior?.type === BehaviorType.Interval && (
        <Field
          placeHolderText="Alert Duration (Seconds)"
          //TODO Figure this out
          value={form.Data.behavior?.alertTime?.toString()}
          updateState={(_, value) =>
            form.updateData(
              {
                behavior: {
                  alertTime: parseInt(value)
                }
              },
              true
            )
          }
          metaTestId={ProgramsPageMetaTestIds.descriptionField}
        />
      )}

      <Field
        placeHolderText="Mastery Independence Target"
        value={form.Data.masteryTarget?.toString()}
        updateState={(_, value) =>
          form.updateData({
            masteryTarget: parseInt(value)
          })
        }
        metaTestId={ProgramsPageMetaTestIds.masteryTarget}
      />
      <Field
        placeHolderText="Mastery Consecutive Requriement"
        value={form.Data.masteryConsecutiveTargets?.toString()}
        updateState={(_, value) =>
          form.updateData({
            masteryConsecutiveTargets: parseInt(value)
          })
        }
        metaTestId={ProgramsPageMetaTestIds.masteryConsecutive}
      />

      <RichText
        placeHolderText="Operational Definition"
        content={form.Data.behavior?.operationalDefinition}
        updateState={(_, value) =>
          form.updateData(
            {
              behavior: {
                operationalDefinition: value
              }
            },
            true
          )
        }
        metaTestId={ProgramsPageMetaTestIds.titleField}
      />
      <RichText
        placeHolderText="Precursor Behaviors"
        content={form.Data.behavior?.precursorBehaviors}
        updateState={(_, value) =>
          form.updateData(
            {
              behavior: {
                precursorBehaviors: value
              }
            },
            true
          )
        }
        metaTestId={ProgramsPageMetaTestIds.titleField}
      />
      <RichText
        placeHolderText="Proactive Strategies"
        content={form.Data.behavior?.proactiveStrategies}
        updateState={(_, value) =>
          form.updateData(
            {
              behavior: {
                proactiveStrategies: value
              }
            },
            true
          )
        }
        metaTestId={ProgramsPageMetaTestIds.titleField}
      />
      <RichText
        placeHolderText="Reactive Strategies"
        content={form.Data.behavior?.reactiveStrategies}
        updateState={(_, value) =>
          form.updateData(
            {
              behavior: {
                reactiveStrategies: value
              }
            },
            true
          )
        }
        metaTestId={ProgramsPageMetaTestIds.titleField}
      />
    </AddForm>
  );
};
