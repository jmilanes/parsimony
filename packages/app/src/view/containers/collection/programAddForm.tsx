import React, { useEffect, useMemo } from "react";

import {
  Domains,
  Program,
  ProgramCategories,
  ProgramsPageMetaTestIds,
  ProgramTypes,
  TargetStyle,
  TrialChainingDirections
} from "@parsimony/types";

import {
  chainingTypesOptions,
  initialProgramData,
  programCategories,
  programTypes,
  targetStyles,
  trialOptions
} from "../../../fixtures";
import { Field, RichText, Selector } from "../../components";
import { TargetOptionSelector } from "../observation/targetOptionsSelector.container";
import { TargetForm } from "../observation/targetForm.container";
import { AddForm } from "../shared/addForm.container";

import { Container } from "typedi";
import { removeMongoIds } from "../../../utils";
import UIApi from "../../../domains/accessApis/uiApi/uiApi.Service";

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
  const API = Container.get(UIApi);

  const form = useMemo(
    () =>
      //Need to destroy on use effect
      API.system.Form.create<Program>(initialProgramData),
    []
  );

  useEffect(() => {
    if (form.Data.targetStyle === TargetStyle.DiscreteTrials) {
      form.updateData({ chaining: undefined });
    } else {
      form.updateData({ chaining: initialProgramData.chaining });
    }
  }, [form.Data.targetStyle]);

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
        metaTestId={ProgramsPageMetaTestIds.titleField}
      />
      <RichText
        placeHolderText="Description"
        content={form.Data.description}
        onChange={(value) => form.updateData({ description: value })}
        metaTestId={ProgramsPageMetaTestIds.descriptionField}
      />
      <RichText
        placeHolderText="Materials"
        content={form.Data.materials}
        onChange={(value) => form.updateData({ materials: value })}
        metaTestId={ProgramsPageMetaTestIds.materialsField}
      />
      <Selector
        title="Type"
        value={form.Data.type}
        options={programTypes}
        onChange={(value) => form.updateData({ type: value as ProgramTypes })}
        metaTestId={ProgramsPageMetaTestIds.typeSelector}
      />
      <Field
        placeHolderText="Mastery Independence Target (%)"
        value={form.Data.masteryTarget?.toString()}
        onChange={(value) =>
          form.updateData({ masteryTarget: parseInt(value) })
        }
        metaTestId={ProgramsPageMetaTestIds.masteryTarget}
      />
      <Field
        placeHolderText="Mastery Consecutive Requriement"
        value={form.Data.masteryConsecutiveTargets?.toString()}
        onChange={(value) =>
          form.updateData({ masteryConsecutiveTargets: parseInt(value) })
        }
        metaTestId={ProgramsPageMetaTestIds.masteryConsecutive}
      />

      <Selector
        title="Trials"
        value={form.Data.trials}
        options={trialOptions}
        onChange={(value) => form.updateData({ trials: value as number })}
        isNumber={true}
        metaTestId={ProgramsPageMetaTestIds.stepsSelector}
      />

      <Selector
        title="Target Style"
        value={form.Data.targetStyle}
        options={targetStyles}
        onChange={(value) =>
          form.updateData({ targetStyle: value as TargetStyle })
        }
        metaTestId={ProgramsPageMetaTestIds.ruleStyleSelector}
      />
      {form.Data.targetStyle === TargetStyle.TaskAnalysis && (
        <Selector
          title="Chainging"
          value={form.Data.chaining?.type}
          options={chainingTypesOptions}
          onChange={(value) =>
            form.updateData(
              { chaining: { type: value as TrialChainingDirections } },
              true
            )
          }
          metaTestId={ProgramsPageMetaTestIds.chainingSelector}
        />
      )}
      <Selector
        title="Category"
        value={form.Data.category}
        options={programCategories}
        onChange={(value) =>
          form.updateData({ category: value as ProgramCategories })
        }
        metaTestId={ProgramsPageMetaTestIds.categorySelector}
      />
      <div className="add-form-spacer">
        <TargetOptionSelector
          targetOptions={form.Data.targetOptions}
          form={form}
        />
      </div>
      <div className="add-form-spacer">
        <TargetForm form={form} />
      </div>
    </AddForm>
  );
};
