import React from "react";
import { Header } from "../components";
import { Container as DI } from "typedi";
import UIApi from "../domains/uiApi/uiApi.Service";

const Home = () => {
  const API = DI.get(UIApi);
  const authService = API.Auth;
  return (
    <>
      <Header
        text={`Welcome Back, ${authService.currentUser?.firstName}!`}
        size="md"
      />
      <div className="demo-container">
        <div className="demo-content">
          <h2>Client Updates</h2>
        </div>
        <div className="demo-content">
          <h2>Clients</h2>
        </div>
      </div>
    </>
  );
};
export default Home;
