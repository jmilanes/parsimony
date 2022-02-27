import React from "react";
import { Container, Header, Button } from "../components";

export type IAddFormProps = React.PropsWithChildren<{
  showForm: boolean;
  action: (payload: unknown) => void;
  title: string;
}>;

const AddForm = ({ showForm, action, children, title }: IAddFormProps) => {
  return (
    <Container hidden={!showForm}>
      <Header text={title} size="md" />
      {children}
      <Button name="Create" action={action} />
    </Container>
  );
};

export default AddForm;
