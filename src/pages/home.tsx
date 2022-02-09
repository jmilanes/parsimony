import React from "react";
import { navigateToRoute } from "../utils";

const Home = () => {
  const navigate = navigateToRoute();
  return (
    <h1 onClick={() => navigate("/program/12345")}>KMF: Keep Moving Forward</h1>
  );
};
export default Home;
