import React from "react";
import { Header } from "../components";
import { Container as DI } from "typedi";
import UIApi from "../domains/accessApis/uiApi/uiApi.Service";

const Home = () => {
  const API = DI.get(UIApi);
  const authService = API.system.Auth;
  return (
    <>
      <Header
        text={`Welcome Back, ${authService.getCurrentUser()?.firstName}!`}
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
