import React from "react";

export const CreateState = (initialState: Record<string, unknown>) => {
  const [state, updateState] = React.useState(initialState);
  return { state, updateState };
};
