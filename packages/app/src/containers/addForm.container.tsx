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
      visible={showForm}
      width={800}
      footer={[
        <Button key="modal-cancel" name="Cancel" action={onCancel} />,
        <Button key="modal-create" name="Create" action={onCreate} />
      ]}
      onCancel={onCancel}
    >
      <>{children}</>
    </Modal>
  );
};
