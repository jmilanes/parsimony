import React from "react";
import { Pages } from "../enums";
import ComponentsService from "../services/componentsService";

const Results = () => {
  return <ComponentsService.Header text={Pages.Results} size="lg" />;
};

export default Results;
