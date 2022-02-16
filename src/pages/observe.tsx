import React from "react";
import { Pages } from "../enums";
import ComponentsService from "../services/componentsService";

const Observe = () => {
  return <ComponentsService.Header text={Pages.Observe} size="lg" />;
};

export default Observe;
