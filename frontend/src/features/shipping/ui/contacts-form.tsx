import { Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

import useContactsForm from "@/features/shipping/model/use-contacts-form";

const ContactsForm = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, errors, isSubmitting, submit } =
    useContactsForm(() => navigate("/payment"));

  return (
    <Form noValidate onSubmit={handleSubmit(submit)}>
      <Form.Group controlId="name" className="my-2">
        <Form.Label>Name</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter name"
          isInvalid={Boolean(errors.name)}
          {...register("name")}
        />
        <Form.Control.Feedback type="invalid">
          {errors.name?.message}
        </Form.Control.Feedback>

        <Form.Label className="mt-3">Email</Form.Label>
        <Form.Control
          type="email"
          placeholder="Enter email"
          isInvalid={Boolean(errors.email)}
          {...register("email")}
        />
        <Form.Control.Feedback type="invalid">
          {errors.email?.message}
        </Form.Control.Feedback>

        <Form.Label className="mt-3">Phone Number</Form.Label>
        <Form.Control
          type="tel"
          autoComplete="tel"
          placeholder="Enter phone number"
          isInvalid={Boolean(errors.phoneNumber)}
          {...register("phoneNumber")}
        />
        <Form.Control.Feedback type="invalid">
          {errors.phoneNumber?.message}
        </Form.Control.Feedback>
      </Form.Group>

      <Button
        type="submit"
        variant="primary"
        className="my-2"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Saving..." : "Continue"}
      </Button>
    </Form>
  );
};

export default ContactsForm;
