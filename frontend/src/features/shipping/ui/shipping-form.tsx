import { Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

import useShippingForm from "@/features/shipping/model/use-shipping-form";

const ShippingForm = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, errors, isSubmitting, submit } =
    useShippingForm(() => navigate("/contacts"));

  return (
    <Form noValidate onSubmit={handleSubmit(submit)}>
      <Form.Group controlId="address" className="my-2">
        <Form.Label>Address</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter address"
          isInvalid={Boolean(errors.address)}
          {...register("address")}
        />
        <Form.Control.Feedback type="invalid">
          {errors.address?.message}
        </Form.Control.Feedback>

        <Form.Label className="mt-3">City</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter city"
          isInvalid={Boolean(errors.city)}
          {...register("city")}
        />
        <Form.Control.Feedback type="invalid">
          {errors.city?.message}
        </Form.Control.Feedback>

        <Form.Label className="mt-3">Postal Code</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter postal code"
          isInvalid={Boolean(errors.postalCode)}
          {...register("postalCode")}
        />
        <Form.Control.Feedback type="invalid">
          {errors.postalCode?.message}
        </Form.Control.Feedback>

        <Form.Label className="mt-3">Country</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter country"
          isInvalid={Boolean(errors.country)}
          {...register("country")}
        />
        <Form.Control.Feedback type="invalid">
          {errors.country?.message}
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

export default ShippingForm;
