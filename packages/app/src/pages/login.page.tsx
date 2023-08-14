import { AuthPageMetaTestIds } from "@parsimony/types";
import React, { useEffect, useState } from "react";

import { Button, Field, Header } from "../components";

import { Container } from "typedi";
import UIApi from "../domains/uiApi/uiApi.Service";

const Login = ({ from }: { from: string }) => {
  const API = Container.get(UIApi);
  const authService = API.system.Auth;
  const [resetPasswordMode, setResetPasswordMode] = useState(Boolean);
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  //comment

  const onLogin = async () => {
    await authService.logIn(userName.toLowerCase(), password);
  };
  // createShortCut("Enter", login);

  const onResetPassword = async () => {
    await authService.resetPassword(userName.toLowerCase(), password);
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
      <Header text="Login" size="md" />
      <Field
        updateState={(_, value) => setUserName(value)}
        placeHolderText="Email"
        value={userName}
        metaTestId={AuthPageMetaTestIds.emailField}
      />
      <Field
        placeHolderText="password"
        type="password"
        value={password}
        updateState={(_, value) => setPassword(value)}
        metaTestId={AuthPageMetaTestIds.passwordField}
      />
      {resetPasswordMode ? (
        <Button
          name="Reset"
          action={onResetPassword}
          metaTestId={AuthPageMetaTestIds.resetBtn}
        />
      ) : (
        <Button
          name="Login"
          action={onLogin}
          metaTestId={AuthPageMetaTestIds.loginBtn}
        />
      )}
      {!resetPasswordMode && (
        <Button
          name="Reset Password"
          action={toggleRestPassword(true)}
          metaTestId={AuthPageMetaTestIds.resetPasswordBtn}
        />
      )}
      {resetPasswordMode && (
        <Button
          name="Cancel"
          action={toggleRestPassword(false)}
          metaTestId={AuthPageMetaTestIds.cancelBtn}
        />
      )}
    </div>
  );
};
export default Login;
