import { Modal } from "antd";
import React from "react";
import { Button } from "../components";

export type IAddFormProps = React.PropsWithChildren<{
  showForm: boolean;
  onCreate: (payload: unknown) => void;
  onCancel: () => void;
  title: string;
}>;

const AddForm = ({
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
        <Button name="Cancel" action={onCancel} />,
        <Button type="primary" name="Create" action={onCreate} />
      ]}
      onCancel={onCancel}
    >
      {children}
    </Modal>
  );
};

export default AddForm;
