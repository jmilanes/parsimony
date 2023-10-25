import React, { useMemo } from "react";
import { AuthPageMetaTestIds, LoginPayload } from "@parsimony/types";

import { Button, Field } from "../../components";

import { Container } from "typedi";
import UIApi from "../../domains/uiApi/uiApi.Service";

export const LoginForm = () => {
  const API = Container.get(UIApi);
  const authService = API.system.Auth;

  const form = useMemo(
    () =>
      //Need to destroy on use effect
      API.system.Form.create<LoginPayload>({
        email: "",
        password: "",
        schoolId: authService.getSchoolName()
      }),
    []
  );

  const onLogin = async () => {
    await authService.logIn(form.Data);
  };

  return (
    <div>
      {!authService.schoolCached && (
        <Field
          updateState={(_, value) => form.updateData({ schoolId: value })}
          placeHolderText="School"
          value={form.Data.schoolId}
          metaTestId={AuthPageMetaTestIds.schoolField}
        />
      )}
      <Field
        updateState={(_, value) => form.updateData({ email: value })}
        placeHolderText="Email"
        value={form.Data.email}
        metaTestId={AuthPageMetaTestIds.emailField}
      />
      <Field
        placeHolderText="password"
        type="password"
        value={form.Data.password}
        updateState={(_, value) => form.updateData({ password: value })}
        metaTestId={AuthPageMetaTestIds.passwordField}
      />
      <Button
        name="Login"
        action={onLogin}
        metaTestId={AuthPageMetaTestIds.loginBtn}
      />
      <a onClick={authService.setRequestPasswordScreen}>Reset Password</a>
    </div>
  );
};
