import { screen, within } from "@testing-library/react";

import userEvent from "@testing-library/user-event";
import { getReadOnlySelector } from "./selectors";

export const selectOption = async ({
  target,
  selectedOption,
  currentValue
}: {
  target: string;
  selectedOption: string;
  currentValue: string;
}) => {
  const selectFieldWrapper = screen.getByTestId(`${target}-select-wrapper`);
  await userEvent.click(within(selectFieldWrapper).getByText(currentValue));
  await userEvent.click(
    screen.getByTestId(`${target}-option-${selectedOption}`)
  );
};

export const checkReadOnlySelectorValue = async (
  target: string,
  value: string
) => {
  await checkSelectorTextContent(getReadOnlySelector(target), value);
};

export const checkSelectorValue = async (target: string, value: string) => {
  const selector = screen.getByTestId(target);
  expect(selector).toHaveValue(value);
};

export const checkSelectorTextContent = async (
  target: string,
  value: string
) => {
  const selector = screen.getByTestId(target);
  expect(selector).toHaveTextContent(value);
};

export const clearAndTypeValueToTarget = async (
  target: string,
  value: string
) => {
  await clearTarget(target);
  await typeValueToTarget(target, value);
};

export const typeValueToTarget = async (target: string, value: string) => {
  const selector = screen.getByTestId(target);
  await userEvent.type(selector, value);
};

export const clearTarget = async (target: string) => {
  const selector = screen.getByTestId(target);
  await userEvent.clear(selector);
};

export const clickTarget = async (target: string) => {
  const selector = screen.getByTestId(target);
  await userEvent.click(selector);
};

export const checkVisibility = async (target: string) => {
  const selector = screen.getByTestId(target);
  expect(selector).toBeVisible();
};

export const checkNotInDocument = async (target: string) => {
  const selector = screen.queryByTestId(target);
  expect(selector).not.toBeInTheDocument();
};
