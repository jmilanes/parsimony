import React from "react";

import {
  BehaviorType,
  Domains,
  IModes,
  Program,
  ProgramPageMetaTestIds,
  ProgramsPageMetaTestIds,
  User
} from "@parsimony/types";
import { Checkbox, Field, RichText, Selector } from "../../../components";
import { getFullName, isReadOnlyMode } from "../../../../utils";
import { behaviorTypes } from "../../../../fixtures";
import { Container as DI } from "typedi";
import UIApi from "../../../../domains/accessApis/uiApi/uiApi.Service";
import { InputForm } from "../../../../domains/forms/form";

export const ProgramPageBehaviorView = ({
  form,
  mode
}: {
  form: InputForm<Program>;
  mode: IModes;
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
          Mastery criteria: student will engage in {form.Data.masteryTarget} or
          less instances of behavior across{" "}
          {form.Data.masteryConsecutiveTargets} consecutive sessions.
        </p>
        <hr />
      </div>
      <div className="flex-row">
        <Checkbox
          title="Mastered"
          value={!!form.Data.mastered}
          updateState={(_, value) => form.updateData({ mastered: value })}
          readOnly={isReadOnlyMode(mode)}
          metaTestId={ProgramPageMetaTestIds.masteredCheckbox}
        />
        <Checkbox
          title="Active"
          value={!!form.Data.behavior?.active}
          updateState={(_, value) =>
            form.updateData({ behavior: { active: value } }, true)
          }
          readOnly={readOnly}
          metaTestId={ProgramPageMetaTestIds.behaviorActiveCheckBok}
        />
      </div>
      <Field
        placeHolderText="Title"
        value={form.Data.title}
        updateState={(_, value) => form.updateData({ title: value })}
        readOnly={readOnly}
        metaTestId={ProgramPageMetaTestIds.titleField}
      />
      <RichText
        placeHolderText="Description"
        content={form.Data.description}
        updateState={(_, value) => form.updateData({ description: value })}
        readOnly={readOnly}
        metaTestId={ProgramPageMetaTestIds.descriptionField}
      />
      <Selector
        title="Behavior Type"
        value={form.Data.behavior?.type}
        options={behaviorTypes}
        updateState={(_, value) =>
          form.updateData({ behavior: { type: value as BehaviorType } }, true)
        }
        readOnly={readOnly}
        metaTestId={ProgramsPageMetaTestIds.typeSelector}
      />
      <Field
        placeHolderText="Mastery Independence Target"
        value={form.Data.masteryTarget?.toString()}
        updateState={(_, value) =>
          form.updateData({ masteryTarget: parseInt(value) })
        }
        readOnly={isReadOnlyMode(mode)}
        metaTestId={ProgramsPageMetaTestIds.masteryTarget}
      />
      <Field
        placeHolderText="Mastery Consecutive Requriement"
        value={form.Data.masteryConsecutiveTargets?.toString()}
        updateState={(_, value) =>
          form.updateData({ masteryConsecutiveTargets: parseInt(value) })
        }
        readOnly={isReadOnlyMode(mode)}
        metaTestId={ProgramsPageMetaTestIds.masteryConsecutive}
      />

      <Field
        placeHolderText="Alert Duration"
        value={form.Data.behavior?.alertTime?.toString()}
        updateState={(_, value) =>
          form.updateData({ behavior: { alertTime: parseInt(value) } }, true)
        }
        readOnly={readOnly}
        metaTestId={ProgramsPageMetaTestIds.descriptionField}
      />
      <RichText
        placeHolderText="Operational Definition"
        content={form.Data.behavior?.operationalDefinition}
        updateState={(_, value) =>
          form.updateData({ behavior: { operationalDefinition: value } }, true)
        }
        readOnly={readOnly}
        metaTestId={ProgramsPageMetaTestIds.titleField}
      />
      <RichText
        placeHolderText="Precursor Behaviors"
        content={form.Data.behavior?.precursorBehaviors}
        updateState={(_, value) =>
          form.updateData({ behavior: { precursorBehaviors: value } }, true)
        }
        readOnly={readOnly}
        metaTestId={ProgramsPageMetaTestIds.titleField}
      />
      <RichText
        placeHolderText="Proactive Strategies"
        content={form.Data.behavior?.proactiveStrategies}
        updateState={(_, value) =>
          form.updateData({ behavior: { proactiveStrategies: value } }, true)
        }
        readOnly={readOnly}
        metaTestId={ProgramsPageMetaTestIds.titleField}
      />
      <RichText
        placeHolderText="Reactive Strategies"
        content={form.Data.behavior?.reactiveStrategies}
        updateState={(_, value) =>
          form.updateData({ behavior: { reactiveStrategies: value } }, true)
        }
        readOnly={readOnly}
        metaTestId={ProgramsPageMetaTestIds.titleField}
      />
    </>
  );
};
