import { TargetFormMetaTestIds, TargetOption } from "@parsimony/types";
import {
  checkReadOnlySelectorValue,
  clearAndTypeValueToTarget,
  clickTarget
} from "../../actions.spec";

export const checkTargetOptionsReadOnlyOptions = async (
  targetOptions?: Partial<TargetOption>[]
) => {
  if (!targetOptions) {
    return;
  }

  let index = 0;
  for (const targetOption of targetOptions) {
    targetOption.name &&
      (await checkReadOnlySelectorValue(
        `${TargetFormMetaTestIds.promptNameField}-target-option-${index++}`,
        targetOption.name
      ));
  }
};

export const updateTargetOptionsReadOnlyOptions = async (
  targetOptions?: Partial<TargetOption>[]
) => {
  if (!targetOptions) {
    return;
  }
  let index = 0;
  for (const targetOption of targetOptions) {
    await updateTargetOptions(targetOption, index++);
  }
};

export const addTargetOption = async () =>
  await clickTarget(TargetFormMetaTestIds.addPromptBtn);

export const updateTargetOptions = async (
  targetOption: Partial<TargetOption>,
  index: number
) => {
  targetOption.name &&
    (await clearAndTypeValueToTarget(
      `${TargetFormMetaTestIds.promptNameField}-target-option-${index}`,
      targetOption.name
    ));
};
