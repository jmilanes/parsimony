import { AuthPageMetaTestIds } from "@parsimony/types";
import React, { useEffect, useState } from "react";

import { Header, Button, Field } from "../components";
import { useServices } from "../context";

const Login = ({ from }: { from: string }) => {
  const { authService } = useServices();
  const [resetPasswordMode, setResetPasswordMode] = useState(Boolean);
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const onLogin = () => {
    authService.logIn(userName, password);
  };
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
      <Header text="Parsimony | Login" size="lg" />
      <Field
        updateState={(_, value) => setUserName(value)}
        placeHolderText="Email"
        value={userName}
        metaTestId={AuthPageMetaTestIds.emailField}
      />
      <Field
        placeHolderText="password"
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
