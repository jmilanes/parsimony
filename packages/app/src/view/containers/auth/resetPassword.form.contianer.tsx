import React, { useMemo } from "react";
import { AuthPageMetaTestIds, ResetPasswordPayload } from "@parsimony/types";

import { Autocomplete, Button, Field } from "../../components";

import { Container } from "typedi";
import UIApi from "../../../domains/accessApis/uiApi/uiApi.Service";
import { schoolOptions } from "../../../fixtures/schools.fixtures";
import { message } from "antd";

export const ResetPasswordForm = () => {
  const API = Container.get(UIApi);
  const authService = API.system.Auth;

  const form = useMemo(
    () =>
      API.system.Form.create<
        ResetPasswordPayload & { confirmPassword: string }
      >({
        email: authService.getLoginState()?.requestedEmail,
        newPassword: "",
        tempPassword: authService.getLoginState().tempPassword,
        schoolId: authService.getSchoolName() || "",
        confirmPassword: ""
      }),
    []
  );

  const onResetPassword = async () => {
    const data = form.Data;
    if (data.confirmPassword !== data.newPassword) {
      message.error("Passwords Must Match!");
      return;
    }
    delete data.confirmPassword;
    await authService.resetPassword(form.Data);
    message.success("Passwords Reset!");
  };

  return (
    <>
      <Autocomplete
        label="Select School"
        options={schoolOptions}
        multiSelect={false}
        onChange={(value) => {
          form.updateData({ schoolId: value?.label || "" });
          authService.setSchoolName(value.label || "");
        }}
        metaTestId={AuthPageMetaTestIds.schoolField}
      />
      <Field
        placeHolderText="password"
        type="password"
        value={form.Data.newPassword}
        onChange={(value) => form.updateData({ newPassword: value })}
        metaTestId={AuthPageMetaTestIds.passwordField}
      />
      <Field
        placeHolderText="confirm password"
        type="password"
        value={form.Data.confirmPassword}
        onChange={(value) => form.updateData({ confirmPassword: value })}
        metaTestId={AuthPageMetaTestIds.passwordField}
      />
      <Button
        name="Update Password"
        onClick={onResetPassword}
        metaTestId={AuthPageMetaTestIds.resetPasswordBtn}
      />
    </>
  );
};
