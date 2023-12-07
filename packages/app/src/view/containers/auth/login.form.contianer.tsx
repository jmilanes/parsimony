import React, { useMemo } from "react";
import {
  AuthPageMetaTestIds,
  ChatMetaTestIds,
  LoginPayload
} from "@parsimony/types";

import { Autocomplete, Button, Field } from "../../components";

import { Container } from "typedi";
import UIApi from "../../../domains/accessApis/uiApi/uiApi.Service";
import { schoolOptions } from "../../../fixtures/schools.fixtures";

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
    form.reset();
  };

  return (
    <>
      {!authService.schoolCached && (
        <Autocomplete
          label="Select School"
          options={schoolOptions}
          multiSelect={false}
          onChange={(value) => {
            form.updateData({ schoolId: value?.label || "" });
            authService.setSchoolName(value?.label || "");
          }}
          metaTestId={AuthPageMetaTestIds.schoolField}
        />
      )}
      <Field
        // ONCE PATTERN IS DONE WE CAN REMOVE path to state stuff
        onChange={(value) => form.updateData({ email: value })}
        placeHolderText="Email"
        type="email"
        value={form.Data.email}
        metaTestId={AuthPageMetaTestIds.emailField}
      />
      <Field
        placeHolderText="password"
        type="password"
        value={form.Data.password}
        onChange={(value) => form.updateData({ password: value })}
        metaTestId={AuthPageMetaTestIds.passwordField}
      />
      <Button
        name="Login"
        onClick={onLogin}
        metaTestId={AuthPageMetaTestIds.loginBtn}
      />
      <div className="flex-col">
        <a onClick={authService.setRequestPasswordScreen}>Reset Password</a>
        <a onClick={authService.changeSchool}>Change School</a>
      </div>
    </>
  );
};
