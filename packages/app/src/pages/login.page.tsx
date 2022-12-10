import React, { KeyboardEvent, useEffect, useState } from "react";

import { Header } from "../components";
import { useServices } from "../context";
import { createShortCut } from "../utils";

const Login = ({ from }: { from: string }) => {
  const { authService } = useServices();
  const [resetPasswordMode, setResetPasswordMode] = useState(Boolean);
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const onLogin = () => authService.logIn(userName, password);
  // createShortCut("Enter", login);

  const onResetPassword = () => {
    authService.resetPassword(userName, password);
    setResetPasswordMode(false);
  };

  const toggleRestPassword = (val: boolean) => () => {
    setResetPasswordMode(val);
    setPassword("");
  };

  useEffect(() => {
    authService.setPreviousPage(from);
  }, []);

  return (
    <div>
      <Header text="Login" size="lg" />
      <div>
        <input
          type="text"
          onChange={(e) => setUserName(e.target.value)}
          placeholder="Email"
          value={userName}
          id=""
        />
        <input
          type="password"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          id=""
        />
        {resetPasswordMode ? (
          <button onClick={onResetPassword}>Reset</button>
        ) : (
          <button onClick={onLogin}>Login</button>
        )}
        {!resetPasswordMode && (
          <a onClick={toggleRestPassword(true)}>Reset Password</a>
        )}
        {resetPasswordMode && <a onClick={toggleRestPassword(false)}>Cancel</a>}
      </div>
    </div>
  );
};
export default Login;
