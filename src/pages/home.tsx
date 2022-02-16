import React from "react";
import ComponentsService from "../services/componentsService";
import { navigateToRoute } from "../utils";

const Home = () => {
  return <ComponentsService.Header text="KMF: Keep Moving Forward" size="lg" />;
};
export default Home;
