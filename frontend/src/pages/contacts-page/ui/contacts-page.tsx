import ContactsForm from "@/features/shipping/ui/contacts-form";
import CheckoutSteps from "@/shared/ui/checkout-steps";
import FormContainer from "@/shared/ui/form-container";

const ContactsPage = () => {
  return (
    <FormContainer>
      <CheckoutSteps step1 step2 />
      <h1>Contacts</h1>
      <ContactsForm />
    </FormContainer>
  );
};

export default ContactsPage;
