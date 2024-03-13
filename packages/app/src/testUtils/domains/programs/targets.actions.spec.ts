import { Target, TargetFormMetaTestIds } from "@parsimony/types";
import {
  checkReadOnlySelectorValue,
  clearAndTypeValueToTarget,
  clickTarget,
  typeRichTextEditior
} from "../../actions.spec";

export const checkTargetReadOnlyOptions = async (
  targets?: Partial<Target>[]
) => {
  if (!targets) {
    return;
  }
  let index = 0;
  for (const target of targets) {
    const i = index++;
    target.title &&
      (await checkReadOnlySelectorValue(
        `${TargetFormMetaTestIds.questionField}-${i}`,
        target.title
      ));

    target.description &&
      (await checkReadOnlySelectorValue(
        `${TargetFormMetaTestIds.descriptionField}-${i}`,
        target.description
      ));
  }
};

export const updateTargetReadOnlyOptions = async (
  targets?: Partial<Target>[]
) => {
  if (!targets) {
    return;
  }
  let index = 0;
  for (const target of targets) {
    await updateTarget(target, index++);
  }
};

export const addTarget = async () =>
  await clickTarget(TargetFormMetaTestIds.addRuleBtn);

export const deleteTarget = async (index: number) =>
  await clickTarget(`${TargetFormMetaTestIds.deleteRuleBtn}-${index}`);

export const updateTarget = async (target: Partial<Target>, index: number) => {
  target.title &&
    (await clearAndTypeValueToTarget(
      `${TargetFormMetaTestIds.questionField}-${index}`,
      target.title
    ));
  target.description &&
    (await typeRichTextEditior(
      `${TargetFormMetaTestIds.descriptionField}-${index}`,
      target.description
    ));
};
