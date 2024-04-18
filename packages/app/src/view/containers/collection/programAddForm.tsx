import React, { useEffect, useMemo } from "react";

import {
  Domains,
  ProgramCategories,
  CollectionPageMetaTestIds,
  ProgramTypes,
  ProgramViewTypes,
  TrialChainingDirections,
  TaskAnalysis
} from "@parsimony/types";

import {
  chainingTypesOptions,
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
      API.system.Form.create<TaskAnalysis>(new TaskAnalysis()),
    []
  );

  useEffect(() => {
    if (form.Data.targetStyle === ProgramViewTypes.DiscreteTrials) {
      form.updateData({ chaining: undefined });
    } else {
      form.updateData({ chaining: new TaskAnalysis().chaining });
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
        metaTestId={CollectionPageMetaTestIds.addProgramFormTitleField}
      />
      <RichText
        placeHolderText="Description"
        content={form.Data.description}
        onChange={(value) => form.updateData({ description: value })}
        metaTestId={CollectionPageMetaTestIds.addProgramFormDescriptionField}
      />
      <RichText
        placeHolderText="Materials"
        content={form.Data.materials}
        onChange={(value) => form.updateData({ materials: value })}
        metaTestId={CollectionPageMetaTestIds.addProgramFormFormMaterialsField}
      />
      <Selector
        title="Type"
        value={form.Data.type}
        options={programTypes}
        onChange={(value) => form.updateData({ type: value as ProgramTypes })}
        metaTestId={CollectionPageMetaTestIds.addProgramFormTypeSelector}
      />
      <Field
        placeHolderText="Mastery Independence Target (%)"
        value={form.Data.masteryTarget?.toString()}
        onChange={(value) =>
          form.updateData({ masteryTarget: parseInt(value) })
        }
        metaTestId={CollectionPageMetaTestIds.addProgramFormMasteryTarget}
      />
      <Field
        placeHolderText="Mastery Consecutive Requriement"
        value={form.Data.masteryConsecutiveTargets?.toString()}
        onChange={(value) =>
          form.updateData({ masteryConsecutiveTargets: parseInt(value) })
        }
        metaTestId={CollectionPageMetaTestIds.addProgramFormMasteryConsecutive}
      />

      <Selector
        title="Trials"
        value={form.Data.trials}
        options={trialOptions}
        onChange={(value) => form.updateData({ trials: value as number })}
        isNumber={true}
        metaTestId={CollectionPageMetaTestIds.addProgramFormStepsSelector}
      />

      <Selector
        title="Target Style"
        value={form.Data.viewType}
        options={targetStyles}
        onChange={(value) =>
          form.updateData({ viewType: value as ProgramViewTypes })
        }
        metaTestId={CollectionPageMetaTestIds.addProgramFormTargetStyleSelector}
      />
      {form.Data.targetStyle === ProgramViewTypes.TaskAnalysis && (
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
          metaTestId={CollectionPageMetaTestIds.addProgramFormChainingSelector}
        />
      )}
      <Selector
        title="Category"
        value={form.Data.category}
        options={programCategories}
        onChange={(value) =>
          form.updateData({ category: value as ProgramCategories })
        }
        metaTestId={CollectionPageMetaTestIds.addProgramFormCategorySelector}
      />
      <div className="add-form-spacer">
        <TargetOptionSelector form={form} />
      </div>
      <div className="add-form-spacer">
        <TargetForm form={form} />
      </div>
    </AddForm>
  );
};
