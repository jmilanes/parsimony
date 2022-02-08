import React from "react";

export const CreateState = (intalState: any) => {
  const [state, updateState] = React.useState(intalState);
  return { state, updateState };
};
