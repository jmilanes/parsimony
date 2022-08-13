import React, { useEffect, useState } from "react";
import { Header } from "../components";
import { authService } from "../services/dataAccess.service";
import { navigateToRoute } from "../utils";

const Login = ({ from }: { from: string }) => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const navigate = navigateToRoute();

  useEffect(() => {
    authService.setPreviousPage(from);
  }, []);

  const onClick = () => authService.logIn(userName, password);
  return (
    <>
      <Header text="Login" size="lg" />
      <input
        type="text"
        onChange={(e) => setUserName(e.target.value)}
        placeholder="user name"
        id=""
      />
      <input
        type="text"
        placeholder="password"
        onChange={(e) => setPassword(e.target.value)}
        id=""
      />
      <button onClick={onClick}>Login</button>
    </>
  );
};
export default Login;
