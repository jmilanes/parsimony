import React, { useEffect } from "react";

import { Container } from "typedi";
import UIApi from "../domains/uiApi/uiApi.Service";
import { LoginForm } from "../containers/auth/login.form.contianer";
import { RequestPasswordRequestForm } from "../containers/auth/request.form.contianer";
import { ResetPasswordForm } from "../containers/auth/resetPassword.form.contianer";

const LoginPage = ({ from }: { from: string }) => {
  const API = Container.get(UIApi);
  const authService = API.system.Auth;
  const { view } = authService.getLoginState();

  useEffect(() => {
    authService.setPreviousPage(from);
  }, []);

  return (
    <div>
      {view === "login" && <LoginForm />}
      {view === "requestReset" && <RequestPasswordRequestForm />}
      {view === "resetPassword" && <ResetPasswordForm />}
    </div>
  );
};
export default LoginPage;
