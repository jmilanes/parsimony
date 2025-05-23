import React, { useMemo } from "react";
import {
  AuthPageMetaTestIds,
  RequestPasswordResetPayload
} from "@parsimony/types";

import { Button, Field } from "../../components";

import { Container } from "typedi";
import UIApi from "../../../domains/accessApis/uiApi/uiApi.Service";

export const RequestPasswordRequestForm = () => {
  const API = Container.get(UIApi);
  const authService = API.system.Auth;

  const form = useMemo(
    () =>
      API.system.Form.create<RequestPasswordResetPayload>({
        email: ""
      }),
    []
  );

  const request = async () => {
    await authService.requestPasswordReset(form.Data);
  };

  return (
    <>
      <Field
        onChange={(value) => form.updateData({ email: value })}
        placeHolderText="Email"
        type="email"
        value={form.Data.email}
        metaTestId={AuthPageMetaTestIds.emailField}
      />
      <Button
        name="Request Password Reset"
        onClick={request}
        metaTestId={AuthPageMetaTestIds.requestPasswordReset}
      />
    </>
  );
};
