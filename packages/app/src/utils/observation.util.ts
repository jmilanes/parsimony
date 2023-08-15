import React from "react";

import { IResultData, Target } from "@parsimony/types";

export type IObserverTargetProps = React.PropsWithChildren<{
  target: Target | Target[];
  onComplete: (result: IResultData) => void;
  patentActiveState?: boolean;
}>;
