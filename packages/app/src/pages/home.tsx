import React from "react";
import { Header } from "../components";
import { Chat } from "../containers";

const Home = () => {
  return (
    <>
      <Header text="Parsimony | The Best in Behavior Tracking" size="lg" />
      <p>Things usually behave in the simplest way.</p>
      <Chat />
    </>
  );
};
export default Home;
