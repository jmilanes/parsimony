import React from "react";

import {
  BehaviorType,
  IModes,
  Program,
  ProgramPageMetaTestIds
} from "@parsimony/types";
import { Checkbox, Field, RichText, Selector } from "../../../components";
import { isReadOnlyMode } from "../../../../utils";
import { behaviorTypes } from "../../../../fixtures";

import { InputForm } from "../../../../domains/forms/form";

export const ProgramPageBehaviorView = ({
  form,
  mode
}: {
  form: InputForm<Program>;
  mode: IModes;
}) => {
  const readOnly = isReadOnlyMode(mode);
  return (
    <>
      <div>
        <h4>Mastery Criteria:</h4>
        <p>
          Mastery criteria: student will engage in{" "}
          {form.Data.addProgramFormMasteryTarget} or less instances of behavior
          across {form.Data.masteryConsecutiveTargets} consecutive sessions.
        </p>
        <hr />
      </div>
      <div className="flex-row">
        <Checkbox
          title="Mastered"
          value={!!form.Data.mastered}
          onChange={(value) => form.updateData({ mastered: value })}
          readOnly={isReadOnlyMode(mode)}
          metaTestId={ProgramPageMetaTestIds.masteredCheckbox}
        />
        <Checkbox
          title="Active"
          value={!!form.Data.active}
          onChange={(value) => form.updateData({ active: value }, true)}
          readOnly={readOnly}
          metaTestId={ProgramPageMetaTestIds.behaviorActiveCheckBok}
        />
      </div>
      <Field
        placeHolderText="Title"
        value={form.Data.title}
        onChange={(value) => form.updateData({ title: value })}
        readOnly={readOnly}
        metaTestId={ProgramPageMetaTestIds.titleField}
      />
      <RichText
        placeHolderText="Description"
        content={form.Data.description}
        onChange={(value) => form.updateData({ description: value })}
        readOnly={readOnly}
        metaTestId={ProgramPageMetaTestIds.descriptionField}
      />
      <Selector
        title="Behavior Type"
        value={form.Data.behavior?.type}
        options={behaviorTypes}
        onChange={(value) =>
          form.updateData({ behavior: { type: value as BehaviorType } }, true)
        }
        readOnly={readOnly}
        metaTestId={ProgramPageMetaTestIds.behaviorTypeSelector}
      />
      <Field
        placeHolderText="Mastery Independence Target"
        value={form.Data.addProgramFormMasteryTarget?.toString()}
        onChange={(value) =>
          form.updateData({ masteryTarget: parseInt(value) })
        }
        readOnly={isReadOnlyMode(mode)}
        metaTestId={ProgramPageMetaTestIds.masterTargetField}
      />
      <Field
        placeHolderText="Mastery Consecutive Requriement"
        value={form.Data.masteryConsecutiveTargets?.toString()}
        onChange={(value) =>
          form.updateData({ masteryConsecutiveTargets: parseInt(value) })
        }
        readOnly={isReadOnlyMode(mode)}
        metaTestId={ProgramPageMetaTestIds.masteryConsecutiveTargetField}
      />

      <Field
        placeHolderText="Alert Duration"
        value={form.Data.behavior?.alertTime?.toString()}
        onChange={(value) =>
          form.updateData({ behavior: { alertTime: parseInt(value) } }, true)
        }
        readOnly={readOnly}
        metaTestId={ProgramPageMetaTestIds.alertDurration}
      />
      <RichText
        placeHolderText="Operational Definition"
        content={form.Data.behavior?.operationalDefinition}
        onChange={(value) =>
          form.updateData({ behavior: { operationalDefinition: value } }, true)
        }
        readOnly={readOnly}
        metaTestId={ProgramPageMetaTestIds.operationalDefinitionField}
      />
      <RichText
        placeHolderText="Precursor Behaviors"
        content={form.Data.behavior?.precursorBehaviors}
        onChange={(value) =>
          form.updateData({ behavior: { precursorBehaviors: value } }, true)
        }
        readOnly={readOnly}
        metaTestId={ProgramPageMetaTestIds.precursorBehaviorField}
      />
      <RichText
        placeHolderText="Proactive Strategies"
        content={form.Data.behavior?.proactiveStrategies}
        onChange={(value) =>
          form.updateData({ behavior: { proactiveStrategies: value } }, true)
        }
        readOnly={readOnly}
        metaTestId={ProgramPageMetaTestIds.proactiveStrategiesField}
      />
      <RichText
        placeHolderText="Reactive Strategies"
        content={form.Data.behavior?.reactiveStrategies}
        onChange={(value) =>
          form.updateData({ behavior: { reactiveStrategies: value } }, true)
        }
        readOnly={readOnly}
        metaTestId={ProgramPageMetaTestIds.reactiveStrategiesField}
      />
    </>
  );
};
