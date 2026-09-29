import { Navigate, useNavigate, useParams } from "react-router-dom";

import AuthForm from "@/features/auth/ui/auth-form";

import { authSlice } from "@/features/auth/model/auth.slice";
import { useAppSelector } from "@/app/store";
import type { AuthMode } from "@/features/auth/model/auth-schemas";

const AuthPage = () => {
  const { mode } = useParams<{ mode: string }>();
  const navigate = useNavigate();
  const isAuth = useAppSelector(authSlice.selectors.selectIsAuth);

  if (isAuth) {
    return <Navigate to="/" replace />;
  }

  if (mode !== "login" && mode !== "registration") {
    return <Navigate to="/auth/login" replace />;
  }

  return (
    <main className="min-vh-100 d-flex align-items-center justify-content-center bg-light px-3 py-5">
      <AuthForm mode={mode as AuthMode} onSuccess={() => navigate("/")} />
    </main>
  );
};

export default AuthPage;
