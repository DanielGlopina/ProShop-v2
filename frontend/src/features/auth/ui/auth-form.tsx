import { Link } from "react-router-dom";
import { Alert, Button, Card, Form } from "react-bootstrap";

import useAuthForm from "../model/use-auth-form";
import type { AuthMode } from "../model/auth-schemas";
import { LuLoaderCircle } from "react-icons/lu";

type AuthFormProps = {
  mode: AuthMode;
  onSuccess: () => void;
};

const AuthForm = ({ mode, onSuccess }: AuthFormProps) => {
  const {
    title,
    submitLabel,
    submitError,
    handleSubmit,
    isRegistration,
    register,
    errors,
    isSubmitting,
    isLoading,
    submit,
  } = useAuthForm(mode, onSuccess);

  return (
    <Card
      className="w-100 rounded-4 border-0 shadow-sm"
      style={{ maxWidth: "28rem" }}
    >
      <Card.Body className="p-4 p-md-5">
        <Card.Title as="h1" className="mb-2 text-center text-dark">
          {title}
        </Card.Title>
        <Card.Text className="mb-4 text-center text-secondary">
          {isRegistration
            ? "Join ProShop to start shopping."
            : "Sign in to continue to ProShop."}
        </Card.Text>

        {submitError && <Alert variant="danger">{submitError}</Alert>}

        <Form noValidate onSubmit={handleSubmit(submit)}>
          {isRegistration && (
            <Form.Group className="mb-3" controlId="auth-name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                autoComplete="name"
                isInvalid={Boolean(errors.name)}
                {...register("name")}
              />
              <Form.Control.Feedback type="invalid">
                {errors.name?.message}
              </Form.Control.Feedback>
            </Form.Group>
          )}

          <Form.Group className="mb-3" controlId="auth-email">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              autoComplete="email"
              isInvalid={Boolean(errors.email)}
              {...register("email")}
            />
            <Form.Control.Feedback type="invalid">
              {errors.email?.message}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-4" controlId="auth-password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              autoComplete={
                isRegistration ? "new-password" : "current-password"
              }
              isInvalid={Boolean(errors.password)}
              {...register("password")}
            />
            <Form.Control.Feedback type="invalid">
              {errors.password?.message}
            </Form.Control.Feedback>
          </Form.Group>

          <Button
            className="w-100"
            type="submit"
            disabled={isSubmitting || isLoading}
          >
            {isSubmitting || isLoading ? (
              <div className="flex gap-1 justify-center items-center">
                <span>Please wait</span>{" "}
                <LuLoaderCircle className="animate-spin" />
              </div>
            ) : (
              submitLabel
            )}
          </Button>
        </Form>

        <p className="mb-0 mt-4 text-center text-secondary">
          {isRegistration ? "Already have an account? " : "New to ProShop? "}
          <Link to={isRegistration ? "/auth/login" : "/auth/registration"}>
            {isRegistration ? "Sign in" : "Create an account"}
          </Link>
        </p>
      </Card.Body>
    </Card>
  );
};

export default AuthForm;
