import FormContainer from "@/shared/ui/form-container";
import { ShippingForm } from "@/features/shipping";
import CheckoutSteps from "@/shared/ui/checkout-steps";

const ShippingPage = () => {
  return (
    <FormContainer>
      <CheckoutSteps step1 />
      <h1>Shipping</h1>
      <ShippingForm />
    </FormContainer>
  );
};

export default ShippingPage;
