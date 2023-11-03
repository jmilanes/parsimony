import React, { useMemo } from "react";
import {
  AuthPageMetaTestIds,
  LoginPayload,
  ResetPasswordPayload
} from "@parsimony/types";

import { Button, Field } from "../../components";

import { Container } from "typedi";
import UIApi from "../../domains/accessApis/uiApi/uiApi.Service";

export const ResetPasswordForm = () => {
  const API = Container.get(UIApi);
  const authService = API.system.Auth;

  const form = useMemo(
    () =>
      API.system.Form.create<ResetPasswordPayload>({
        email: authService.getLoginState()?.requestedEmail,
        newPassword: "",
        tempPassword: authService.getLoginState().tempPassword,
        schoolId: authService.getSchoolName()
      }),
    []
  );

  const onResetPassword = async () => {
    await authService.resetPassword(form.Data);
  };

  //TODO: Add confirmation

  return (
    <div>
      <Field
        placeHolderText="password"
        type="password"
        value={form.Data.newPassword}
        updateState={(_, value) => form.updateData({ newPassword: value })}
        metaTestId={AuthPageMetaTestIds.passwordField}
      />
      <Button
        name="Update Password"
        action={onResetPassword}
        metaTestId={AuthPageMetaTestIds.resetPasswordBtn}
      />
    </div>
  );
};
