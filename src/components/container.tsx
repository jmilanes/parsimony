import React, { PropsWithChildren } from "react";
import { compileStyles } from "../utils";
import "./styles.css";

const Container = ({
  children,
  hidden
}: PropsWithChildren<{ hidden?: boolean }>) => {
  const containerStyles = compileStyles({ container: true, hidden: !!hidden });
  return <div className={containerStyles}>{children}</div>;
};

export default Container;
