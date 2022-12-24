import { AddModalControls } from "@parsimony/types/src";
import { Modal } from "antd";
import React from "react";
import { Button } from "../components";

export type IAddFormProps = React.PropsWithChildren<{
  showForm: boolean;
  onCreate: (payload: unknown) => void;
  onCancel: () => void;
  title: string;
}>;

export const AddForm = ({
  showForm,
  onCreate,
  children,
  title,
  onCancel
}: IAddFormProps) => {
  return (
    <Modal
      title={title}
      open={showForm}
      width={800}
      footer={[
        <Button
          dataTestId={AddModalControls.cancelBtn}
          key="modal-cancel"
          name="Cancel"
          action={onCancel}
        />,
        <Button
          dataTestId={AddModalControls.createBtn}
          key="modal-create"
          name="Create"
          action={onCreate}
        />
      ]}
      onCancel={onCancel}
    >
      <>{children}</>
    </Modal>
  );
};
