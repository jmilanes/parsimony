import React from "react";
import ComponentsService from "../services/componentsService";

export type IAddFormProps = React.PropsWithChildren<{
  showForm: boolean;
  action: (payload: unknown) => void;
  title: string;
}>;

const AddForm = ({ showForm, action, children, title }: IAddFormProps) => {
  return (
    <ComponentsService.Container hidden={!showForm}>
      <h3>{title}</h3>
      {children}
      {ComponentsService.Button({ name: "Create", action })}
    </ComponentsService.Container>
  );
};

export default AddForm;
