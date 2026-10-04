import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import ContactsForm from "@/features/shipping/ui/contacts-form";
import CheckoutSteps from "@/shared/ui/checkout-steps";
import FormContainer from "@/shared/ui/form-container";

import { cartSlice } from "@/features/cart/model/cart.slice";
import { useAppSelector } from "@/app/store";

const ContactsPage = () => {
  const navigate = useNavigate();

  const shippingAddress = useAppSelector(
    cartSlice.selectors.selectShippingAddress,
  );

  useEffect(() => {
    if (!shippingAddress) {
      navigate("/shipping", { replace: true });
    }
  }, [shippingAddress, navigate]);

  return (
    <FormContainer>
      <CheckoutSteps step1 step2 />
      <h1>Contacts</h1>
      <ContactsForm />
    </FormContainer>
  );
};

export default ContactsPage;
